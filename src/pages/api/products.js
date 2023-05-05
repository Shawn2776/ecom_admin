// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Product } from "../../../models/product";
import { monogooseConnect } from "../../../lib/mongoose";

export default async function handler(req, res) {
  const { method } = req;

  await monogooseConnect();

  if (method === "POST") {
    const { name, description, price } = req.body;

    const productDoc = await Product.create({
      name,
      description,
      price,
    });
    res.json(productDoc);
  }
}
