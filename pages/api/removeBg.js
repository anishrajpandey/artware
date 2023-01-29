import { removeBackgroundFromImageBase64 } from "remove.bg";

export default async function handler(req, res) {
  let { base64img } = req.body;

  // const base64img = fs.readFileSync(localFile, { encoding: "base64" });
  const outputFile = `$/img-removed-from-file.png`;

  let result = await removeBackgroundFromImageBase64({
    base64img,
    apiKey: "wC7XAPm89hATCynLQeg9ovdi",
    size: "regular",
    type: "product",
    outputFile,
  });
  console.log(result);
  res.json({ result });
  // .then((result) => {
  //   console.log(`File saved to ${outputFile}`);
  //   const base64img = result.base64img;
  //   res.json({ result });
  // })
  // .catch((errors) => {
  //   console.log(JSON.stringify(errors));
  // });
  //   res.json({ message: "this is success" });
}
