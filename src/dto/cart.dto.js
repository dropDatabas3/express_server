import argsUtils from "../utils/args.utils.js";
import crypto from "crypto";

const persistence = argsUtils.persistence;

class CartDTO {
  constructor(data) {
    persistence !== "mongo" && (this._id = crypto.randomBytes(12).toString("hex"));
    this.user_id = data.user_id;
    this.product_id = data.product_id;
    this.quantity = data.quantity;
    this.state = data.state;

    persistence !== "mongo" && (this.createAt = new Date());
    persistence !== "mongo" && (this.updateAt = new Date());
  }
}
 
export default CartDTO;

