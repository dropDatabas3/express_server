import { verifyToken } from "../utils/jwt.utils.js";
import {
  createService,
  readService,
  paginateService,
  readOneService,
  updateService,
  destroyService,
} from "../services/carts.service.js";
class CartController {
  async create(req, res, next) {
    try {
      const user = verifyToken(req.cookies.token);
      const { product_id } = req.body;
      const data = { product_id: product_id, user_id: user._id };
      const one = await createService(data);
      return res.response200({ message: "CREATED WITH ID " + one._id , one});
    } catch (error) {
      return next(error);
    }
  }

  async read(req, res, next) {
    try {
      const { uid } = req.body;
      const all = await readService(uid);
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

  async paginate(req, res, next) {
    try {
      const opts = {};
      const filter = {};
      if (req.query.state) {
        filter.state = req.query.state;
      }
      if (req.query.product_id) {
        filter.product_id = req.query.product_id;
      }
      const user = verifyToken(req.cookies.token);
      filter.user_id = user._id;
      const all = await paginateService({ filter, opts });
      return res.paginate(all.docs, {
        limit: all.limit,
        page: all.page,
        totalPages: all.totalPages,
      });
    } catch (error) {
      return next(error);
    }
  }

  async readOne(req, res, next) {
    try {
      const { cid } = req.params;
      const one = await readOneService(cid);
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

  async update(req, res, next) {
    try {
      const { cid } = req.params;
      const one = await updateService(cid, req.body);
      return res.response200(one);
    } catch (error) {
      return next(error);
    }
  }

  async destroy(req, res, next) {
    try {
      const { cid } = req.params;
      if (cid === "all") {
        const opts = {};
        const filter = {};
        const user = verifyToken(req.cookies.token);
        filter.user_id = user._id;
        let all = await paginateService({ filter, opts });
        all = all.docs;
        all.forEach(async (all) => {
          await destroyService(all._id);
        });
        return res.message200("Carritos borrados con éxito");
      }
      const one = await destroyService(cid);
      return res.message200("Carrito borrado con éxito");
    } catch (error) {
      return next(error);
    }
  }
}

const cartController = new CartController();
const { create, read, paginate, readOne, update, destroy } = cartController;

export { create, read, paginate, readOne, update, destroy };
