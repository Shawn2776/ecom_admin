import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  price: {
    type: Number,
    required: true,
  },
});

export const Product = model("Product", ProductSchema);
