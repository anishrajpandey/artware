export default async function handler(req, res) {
  if (req.body.method !== "POST") return;

  const parsedObject = JSON.parse(req.body);
  const { name, phone, address, password } = parsedObject;

  console.log(name, phone, address, password);

  res.json({ message: req.body });
}
