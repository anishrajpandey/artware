import users from "../../models/userModel";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
export default async function handler(req, res) {
  // if (req.body.method !== "POST") return;
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.MONGODB_URI);
  }

  const parsedObject = JSON.parse(req.body);
  let stringpassword = parsedObject.password;
  let salt = bcrypt.genSaltSync(10);
  let hashedPassword = bcrypt.hashSync(stringpassword, salt);
  // console.log(hashedPassword);
  const { name, phone, address, password } = parsedObject;
  parsedObject.password = hashedPassword;
  let userdata = new users(parsedObject);
  console.log(userdata);
  if (userdata) {
    res.json({
      successMessage:
        "Hi, " +
        userdata.userName +
        " Your account has been successfully created. You can now login with the credentials.🙂",
    });
  }
  userdata.save((err, user) => {
    if (err) {
      res.json({ errorMessage: err });
    }
  });

  // console.log(name, phone, address, password);
}
