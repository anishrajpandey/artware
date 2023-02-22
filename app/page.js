import React from "react";
import Link from "next/link";
import ContextProvider from "@/context/useContext";
import Loading from "./Loading";
const Index = () => {
  return (
    <div>
      <h1>ARTWARE.COM.NP</h1>
      <Link href={"/design/tshirt"}>Go to tshirt design page</Link>
      <Link href={"/design/phonecover"}>Go to phone cover design page</Link>
      <Link href={"/design/hoodie"}>Go to hoodie design page</Link>
      <Link href={"/design/mug"}>Go to mug design page</Link>
      <Link href={"/design/cake"}>Go to cakes design page</Link>
      {/* <Loading /> */}
    </div>
  );
};

export default Index;
