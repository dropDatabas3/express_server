import { Schema, model } from "mongoose";

const collection = "products";
const schema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    category: { type: String, require: true},
    price: { type: Number, require: true },
    stock: { type: Number, require: true },
    photo: {
      type: String,
      default: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png",
    },
  },
  {
    timestamps: true,
  }
);

const Product = model(collection, schema);
export default Product;