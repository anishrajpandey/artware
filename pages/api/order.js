import orders from "@/models/orderModel";
import mongoose from "mongoose";
export default async function handler(req, res) {
  // if (req.body.method !== "POST") return;
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.MONGODB_URI);
  }
  console.log(typeof req.body);
  const options = JSON.parse(req.body);
  let order = new orders(options);

  await order.save();
  console.log(order);
  res.json({ message: order });
  // console.log(name, phone, address, password);
}
