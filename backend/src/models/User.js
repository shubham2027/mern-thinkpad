import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      default: null  // Changed: Make optional for Google auth
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Allow multiple nulls
      default: null
    },
    name: {
      type: String,
      default: null
    },
    picture: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;