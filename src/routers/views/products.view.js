import { Router } from "express";
import productsManager from "../../data/fs/ProductManager.fs.js";

const productsRouter = Router();

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await productsManager.read();
    return res.render("products", { title: "Productos", products });
  } catch (error) {
    return next(error);
  }
});


/************
    REAL
************/
productsRouter.get("/real", async (req, res, next) => {
  try {
    return res.render("real", { title: "Productos"});
  } catch (error) {
    return next(error);
  }
});

export default productsRouter;
