import users from "../../models/userModel";
import bcrypt, { hash } from "bcryptjs";
import mongoose from "mongoose";
export default async function handler(req, res) {
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.MONGODB_URI);
  }

  const parsedObject = JSON.parse(req.body);

  let data = users.find({ phone: parsedObject.phone });
  if (data) {
    
  let hashedpassword = users.password;
  let stringpassword = parsedObject.password;
  let isAuthorized = bcrypt.compareSync(stringpassword, hashedpassword);

  if (isAuthorized) {
    res.json({ authorized: true, data, message: "Successfully logged in " });
  } else {
    res.json({
      authorized: false,
      data: null,
      message: "Unable to authorize you",
    });
  }

  } else {
    console.log("NO SUCH USER   ")
  }
}
