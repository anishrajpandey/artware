import { model, Schema, models } from "mongoose";
const imgUrlSchema = new Schema({
  images: [{ type: String }],
  productSnapShot: String,
  printAreaImage: String,
});
const orderSchema = new Schema(
  {
    type: String,
    category: String,
    user: String,
    price: Number,
    imgurls: imgUrlSchema,
    description: String,
  },
  { timestamps: true }
);

const orders = models.orders || model("orders", orderSchema);
export default orders;
