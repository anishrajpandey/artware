// import users from "@/models/userModel";
// import mongoose from "mongoose";
// import connectMongo from "./connectMongo";
export default async function postOrderToMongodb(options) {
  switch (options.type) {
    case "custom":
      //custom order logic here
      const { category, user, price, imgurls, description, type } = options;
      console.log("call from postOrderToMongodb", options);
      const body = JSON.stringify(options);
      let res = await fetch("/api/order", {
        method: "POST",
        body,
      });
      let resjson = await res.json();
      console.log(resjson);

    case "readymade":
    //readymade order logic here
  }
}
