import { Schema, model } from "mongoose";

const collection = "carts";
const schema = new Schema(
  {
    user_id : { type: String, required: true, unique: true },
    product_id : { type: String, require: true},
    quantity: { type: Number, require: true },
    state: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const Cart = model(collection, schema);
export default Cart;


