import Link from "next/link";

const page = () => {
  return (
    <div>
      page
      <Link href={"/design/tshirt"}>Go to tshirt design page</Link>
      <Link href={"/design/phonecover"}>Go to phone cover design page</Link>
      <Link href={"/design/mug"}>Go to mug design page</Link>
    </div>
  );
};

export default page;
