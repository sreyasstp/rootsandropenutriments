const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    picture: String,
    provider: {
      type: String,
      enum: ["google"],
      default: "google",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
