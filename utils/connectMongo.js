import mongoose from "mongoose";
export default connectMongo = () => mongoose.connect(process.env.MONGODB_URI);
