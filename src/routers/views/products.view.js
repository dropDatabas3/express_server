import { Router } from "express";
//import productsManager from "../../data/fs/ProductManager.fs.js";
import productsManager from "../../data/mongo/manager/ProductManager.mongo.js";


const productsRouter = Router();

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await productsManager.read();
    console.log(products)
    return res.render("products", { title: "Productos", products });
  } catch (error) {
    return next(error);
  }
});


productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    console.log({pid})
    const product = await productsManager.readOne(pid);
    console.log("Producto: ", product)
    return res.render("product", { title: product.title, product }); // <-- chequear vista
  } catch (error) {
    return next(error);
  }
});


/************
    REAL
************/
productsRouter.get("/real", async (req, res, next) => {
  try {
    return res.render("real", { title: "Productos" });

  } catch (error) {
    return next(error);
  }
});

export default productsRouter;
