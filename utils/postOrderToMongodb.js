import users from "@/models/userModel";
import mongoose from "mongoose";
import connectMongo from "./connectMongo";
export default async function postOrderToMongodb(options) {
  switch (options.type) {
    case "custom":
      //custom order logic here
      const { category, user, price, imgurls, description } = options;
      const body = JSON.stringify(options);
      let res = await fetch("/api/order", {
        method: "POST",
        body,
      });
    case "readymade":
    //readymade order logic here
  }
}
