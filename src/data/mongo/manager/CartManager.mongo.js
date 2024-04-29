import Cart from "../models/cart.model.js";
import Manager from "../Manager.mongo.js";

const cartManager = new Manager(Cart);

export default cartManager;