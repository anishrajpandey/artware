import Link from "next/link";

const page = () => {
  return (
    <div>
      page
      <Link href={"/tshirt"}>Go to tshirt design page</Link>
      <Link href={"/phonecover"}>Go to phone cover design page</Link>
    </div>
  );
};

export default page;
