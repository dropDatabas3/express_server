import { Schema, model } from "mongoose";

const collection = "users";
const schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: Number, default: 0 },
    age: { type: Number, default: 12 },
    name: { type: String, required: true },
    photo: {
      type: String,
      default: "https://i.postimg.cc/wTgNFWhR/profile.png",
    },
    verify: { type: Boolean, default: false},
    verifyCode: { type: String, required: true}
  },
  {
    timestamps: true,
  }
);

const User = model(collection, schema);
export default User;  