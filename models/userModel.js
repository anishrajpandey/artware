import { model, Schema, models } from "mongoose";
const userSchema = new Schema({
  userName: String,
  phone: Number,
  password: String,
  address: String,
});
const users = models.users || model("users", userSchema);
export default users;
