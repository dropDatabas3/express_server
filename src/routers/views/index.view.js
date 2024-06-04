import CustomRouter from "../CustomRouter.js";
import productsRouter from "./products.view.js";
import userRouter from "./users.view.js";
import cartRouter from "./carts.view.js";
import productsManager from "../../data/mongo/manager/ProductManager.mongo.js";

class ViewsRouter extends CustomRouter {
  init() {
    this.use("/products", productsRouter)
    this.use("/users", userRouter);
    this.use("/carts", cartRouter);
    this.use("/", home);
  }
}

const viewsRouter = new ViewsRouter();

async function home(req, res, next){
  try {
    const products = await productsManager.read();
    const title = "Home";
    return res.render("index", { title , products});
  } catch (error) {
    return next(error);
  }
};

export default viewsRouter.getRouter();