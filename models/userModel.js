import { model, Schema, models } from "mongoose";
const userSchema = new Schema(
  {
    userName: String,
    phone: { type: Number, unique: true },
    password: String,
    address: String,
    profilePicture: String,
    orders: [String],
  },
  { timestamps: true }
);
const users = models.users || model("users", userSchema);
export default users;
