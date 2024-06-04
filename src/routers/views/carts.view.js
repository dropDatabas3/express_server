import CustomRouter from "../CustomRouter.js";
import cartManager from "../../data/mongo/manager/CartManager.mongo.js";

class CartsRouter extends CustomRouter {
  init() {
    this.read("/paginate",["USER", "ADMIN"], paginate);
    this.read("/uid",["USER", "ADMIN"], read);//<-- Si se quiere ver el carrito
  }
}
const cartsRouter = new CartsRouter();


async function paginate(req, res, next) {
    try {
      const opts = {};
      const filter = {};
      if (req.query.state) {
        filter.state = req.query.state;
      }
      filter.user_id = req.session.user_id
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




export default cartsRouter.getRouter() ;
