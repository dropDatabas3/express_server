import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'


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
schema.plugin(mongoosePaginate);
const Product = model(collection, schema);
export default Product;