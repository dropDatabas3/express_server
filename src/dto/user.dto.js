import argsUtils from "../utils/args.utils.js";
import crypto from "crypto";
import { createHash } from "../utils/hash.utils.js";

const persistence = argsUtils.persistence;

class UserDTO {
  constructor(data) {
    persistence !== "mongo" &&
      (this._id = crypto.randomBytes(12).toString("hex"));
    this.email = data.email;
    this.password = data.password;
    this.name = data.name;
    this.role = data.role || 0;
    this.photo = data.photo || "https://i.postimg.cc/wTgNFWhR/profile.png";
    this.age = data.age || 18;
    this.verify = false;
    this.verifyCode = crypto.randomBytes(4).toString("hex");
    persistence !== "mongo" && (this.createAt = new Date());
    persistence !== "mongo" && (this.updateAt = new Date());
  }
}
 
export default UserDTO;
