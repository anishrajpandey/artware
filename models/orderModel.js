import { model, Schema, models } from "mongoose";
const orderSchema = new Schema(
  {
    category: String,
    user: String,
    price: Number,
    imgurls: imgUrlSchema,
    description,
  },
  { timestamps: true }
);
const imgUrlSchema = new Schema({
  images: [String],
  productSnapShot: String,
  printAreaImage: String,
});
const orders = models.orders || model("orders", orderSchema);
export default orders;
