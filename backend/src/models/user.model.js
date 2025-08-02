import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      requried: true,
      unique: true,
    },
    fullName: {
      type: String,
      requried: true,
    },
    password: {
      type: String,
      requried: true,
      minLength: 6,
    },
    role: {
      type: String,
      default: "admin", // or "agent" etc.
      enum: ["admin", "agent"], // optional
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
