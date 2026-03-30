import Feedback from "../models/Feedback.js";
import User from "../models/User.js";

export const submitFeedback = async (req, res) => {
  try {
    const { subject, message } = req.body;

    if (!subject?.trim() || !message?.trim()) {
      return res.status(400).json({ message: "Subject and message are required" });
    }

    const user = await User.findById(req.user.id).select("email name");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const feedback = await Feedback.create({
      userId: req.user.id,
      email: user.email,
      subject: subject.trim(),
      message: message.trim(),
    });

    return res.status(201).json({
      id: feedback._id.toString(),
      message: "Feedback sent successfully",
    });
  } catch (error) {
    console.error("Error in submitFeedback:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};