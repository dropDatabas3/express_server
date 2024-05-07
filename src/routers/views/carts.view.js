import { Router } from "express";
import cartManager from "../../data/mongo/manager/CartManager.mongo.js";

const cartsRouter = Router();


cartsRouter.get("/paginate", paginate);
cartsRouter.get("/uid", read) //<-- Si se quiere ver el carrito

async function paginate(req, res, next) {
    try {
      const opts = {};
      const filter = {};
      if (req.query.state) {
        filter.state = req.query.state;
      }
      if (req.query.user_id) {
        filter.user_id = req.query.user_id;
      }
      const all = await cartManager.paginate({ filter, opts });
      const carts = all.docs.map(doc => doc.toObject({ virtuals: true }));
      console.log(carts)
      return res.render("cart", { title: "Carrito", carts });
    } catch (error) {
      next(error);
    }
  }

async function read(req, res, next) {
    try {
        const { uid } = req.params;
        return res.render("cart", { title: "Cart", uid });
    } catch (error) {
        return next(error);
    }
}




export default cartsRouter;
