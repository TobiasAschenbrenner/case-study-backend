import mongoose, { Schema } from "mongoose";

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 20,
    },
    username: {
      type: String,
      required: true,
      min: 2,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      required: false,
      default: "https://picsum.photos/200",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },

    roles: {
      type: [Schema.Types.ObjectId],
      required: true,
      ref: "Role",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
