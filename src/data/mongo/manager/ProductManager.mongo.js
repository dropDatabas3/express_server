import Product from "../models/product.model.js";
import Manager from "../Manager.mongo.js";

const ProductManager = new Manager(Product);

export default ProductManager;