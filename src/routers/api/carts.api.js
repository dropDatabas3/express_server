import CustomRouter from "../CustomRouter.js";
import { create, read, paginate, readOne, update, destroy } from "../../controllers/carts.controller.js";

class CartRouter extends CustomRouter {
    init() {
      this.create("/", ["USER", "ADMIN"], create);
      this.read("/", ["USER", "ADMIN"], read);
      this.read("/paginate", ["USER", "ADMIN"], paginate);
      this.read("/:cid", ["USER", "ADMIN"], readOne);
      this.update("/:cid", ["USER", "ADMIN"], update);
      this.destroy("/:cid", ["USER", "ADMIN"], destroy);
    }
}


const cartRouter = new CartRouter();



export default cartRouter.getRouter();