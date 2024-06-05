import CustomRouter from "../CustomRouter.js";
import cartManager from "../../data/mongo/manager/CartManager.mongo.js";
import { verifyToken } from "../../utils/jwt.utils.js";

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


async function create(req, res, next) {
    try {
      console.log("create api carrito")
      const user = verifyToken(req.cookies.token);
      const { product_id } = req.body;
      const data = { product_id: product_id , user_id: user._id};
      console.log("data de create carrito: ", data)
      const one = await cartManager.create(data);
      return res.message201("CREATED WITH ID " + one.id);
    } catch (error) {
      return next(error);
    }
  }
  
  async function read(req, res, next) {
    try {
      console.log("read api carrito")

      const { uid } = req.body;
      const all = await cartManager.read(uid);
      if (all.length > 0) {
        return res.response200(all);
      } else {
        const error = new Error("Not found!");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      return next(error);
    }
  }
  
  async function paginate(req, res, next) {
    try {
      console.log("paginate api carrito")
      const opts = {};
      const filter = {};
      if (req.query.state) {
        filter.state = req.query.state;
      }
      console.log(filter)
      if (req.query.product_id) {
        filter.product_id = req.query.product_id;
      }
      const user = verifyToken(req.cookies.token);
      filter.user_id = user._id;
      console.log(
        "Vamos a buscar con user_id: ",
        filter.user_id,
        " y pid: ",
        filter.product_id
      );
      const all = await cartManager.paginate({ filter, opts });
      console.log("all de paginate carrito: ", all.docs);
      return res.paginate(all.docs, {
          limit: all.limit,
          page: all.page,
          totalPages: all.totalPages,
        });
    } catch (error) {
      return next(error);
    }
  }
  
  async function readOne(req, res, next) {
    try {
      console.log("readOne api carrito")
      const { cid } = req.params;
      const one = await cartManager.readOne(cid);
      if (one) {
        return res.response200(one);
      } else {
        const error = new Error("Not found!");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      return next(error);
    }
  }
  
  async function update(req, res, next) {
    try {
      console.log("update api carrito")

      const { cid } = req.params;
      const one = await cartManager.update(cid, req.body);
      return res.response200(one);
    } catch (error) {
      return next(error);
    }
  }
  
  async function destroy(req, res, next) {
    try {
      console.log("destroy api carrito")

      const { cid } = req.params;
      const one = await cartManager.destroy(cid);
      return res.message200("Carrito borrado con éxito");
    } catch (error) {
      return next(error);
    }
  }

export default cartRouter.getRouter();