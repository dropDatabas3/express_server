import CustomRouter from "../CustomRouter.js";
import checkProductsInputs from "../../middlewares/formChecker.js";
import isValidAdmin from "../../middlewares/isValidAdmin.mid.js";
import { create, read, paginate, readOne, update, destroy } from "../../controllers/products.controller.js";
class ProductsRouter extends CustomRouter {
  init() {
    this.create("/", ["ADMIN"], isValidAdmin, checkProductsInputs, create);
    this.read("/", ["PUBLIC"], read);
    this.read("/paginate", ["PUBLIC"], paginate);
    this.read("/:pid", ["PUBLIC"], readOne);
    this.update("/:pid", ["ADMIN"], update);
    this.destroy("/:pid", ["ADMIN"], destroy);
  }
  
}

const productsRouter = new ProductsRouter();


export default productsRouter.getRouter();