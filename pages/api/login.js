import users from "../../models/userModel";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
export default async function handler(req, res) {
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.MONGODB_URI);
  }
  // res.json({ hello: "wprld" });
  const parsedObject = JSON.parse(req.body);
  // res.json({ parsedObject });

  let data = await users.findOne({ phone: parsedObject.phone });
  console.log(data);
  if (data) {
    let hashedpassword = data.password;
    let stringpassword = parsedObject.password;
    let isAuthorized = bcrypt.compareSync(stringpassword, hashedpassword);

    if (isAuthorized) {
      res.json({ authorized: true, data, message: "Successfully logged in " });
    } else {
      res.json({
        authorized: false,
        data: null,
        message: "Phone number or password incorrect",
      });
    }
  } else {
    res.json({
      authorized: false,
      data: null,
      message: "UNABLE TO FIND USER",
    });
  }
}
