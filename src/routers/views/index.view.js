import { Router } from "express";
import productsRouter from "./products.view.js";
import userRouter from "./users.view.js";
import cartRouter from "./carts.view.js";
import productsManager from "../../data/mongo/manager/ProductManager.mongo.js";


const viewsRouter = Router();

viewsRouter.use("/products", productsRouter)
viewsRouter.use("/users", userRouter)
viewsRouter.use("/carts", cartRouter)


viewsRouter.get("/", async (req, res, next) => {
  try {
    const products = await productsManager.read();
    const title = "Home";
    return res.render("index", { title , products});
  } catch (error) {
    return next(error);
  }
});

export default viewsRouter