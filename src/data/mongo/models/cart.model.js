import { populate } from "dotenv";
import { Schema, model, Types } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'


const collection = "carts";
const schema = new Schema(
  {
    user_id : { 
      type: Types.ObjectId, 
      required: true, 
      ref: "users"
    },
    product_id : { 
      type: Types.ObjectId, 
      require: true,
      ref: "products"
    },
    quantity: { 
      type: Number, 
      require: true, 
      default: 1 
    },
    state: { 
      type: String, 
      default: "reserved",
      enum:["reserved", "paid", "delivered"]
    },
  },
  {
    timestamps: true,
  }
);

schema.pre("find", function(){
  this.populate("user_id");
  //Agregar selectores
})
schema.pre("find", function(){
  this.populate("product_id");
  //Agregar selectores
})
schema.plugin(mongoosePaginate);
const Cart = model(collection, schema);
export default Cart;


