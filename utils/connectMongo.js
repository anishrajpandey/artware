import mongoose from "mongoose";
const connectMongo = () => {
  mongoose.connect(process.env.MONGODB_URI);
};
export default connectMongo;
