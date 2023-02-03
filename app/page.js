import React from "react";
import Link from "next/link";
const Index = () => {
  return (
    <div>
      <h1>ARTWARE.COM.NP</h1>
      <Link href={"/design/tshirt"}>Go to tshirt design page</Link>
      <Link href={"/design/phonecover"}>Go to phone cover design page</Link>
    </div>
  );
};

export default Index;
