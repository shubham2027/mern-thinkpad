import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const signToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const googleAuth = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken?.trim()) {
      return res.status(400).json({ message: "Google token is required" });
    }

    // Verify the token from frontend
    const token = idToken;

    if (!token || typeof token !== "string" || !token.trim()) {
      console.error("Invalid idToken received:", { token, type: typeof token });
      return res.status(400).json({ message: "Invalid or missing Google token" });
    }

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload?.email || !payload?.sub) {
      return res.status(401).json({ message: "Invalid Google token payload" });
    }

    const email = payload.email.toLowerCase().trim();
    const googleId = payload.sub;
    const name = payload.name || null;
    const picture = payload.picture || null;

    // Find or create user
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        googleId,
        name,
        picture,
        passwordHash: null, // No password for Google auth
      });
    } else if (!user.googleId) {
      // Link Google ID to existing email
      user.googleId = googleId;
      if (!user.name) user.name = name;
      if (!user.picture) user.picture = picture;
      await user.save();
    }

    const jwtToken = signToken(user._id);

    res.status(200).json({
      token: jwtToken,
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        picture: user.picture,
      },
    });
  } catch (error) {
    console.error("Google auth error:", error);
    res.status(401).json({ message: "Google authentication failed" });
  }
};