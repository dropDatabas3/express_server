import argsUtils from "../utils/args.utils.js";
import crypto from "crypto";

const persistence = argsUtils.persistence;

class ProductDTO {
    constructor(data) {
      persistence !== "mongo" && (this._id = crypto.randomBytes(12).toString("hex"));
      this.title = data.title,
      this.photo = data.photo || "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png";
      this.category = data.category;
      this.price = data.price;
      this.stock = data.stock;
      persistence !== "mongo" && (this.createAt = new Date());
      persistence !== "mongo" && (this.updateAt = new Date());
    }
  }
   
  export default ProductDTO;
