import CustomRouter from "../CustomRouter.js";
import productsManager from "../../data/mongo/manager/ProductManager.mongo.js";
import checkProductsInputs from "../../middlewares/formChecker.js";
import isValidAdmin from "../../middlewares/isValidAdmin.mid.js";

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

async function create(req, res, next) {
  try {
    const data = req.body;
    const one = await productsManager.create(data);
    return res.message201("CREATED WITH ID " + one.id);
  } catch (error) {
    return next(error);
  }
}

async function paginate(req, res, next) {
  try {
    const filter = {};
    const opts = {};
    if (req.query.limit) {
      opts.limit = req.query.limit;
    }
    if (req.query.page) {
      opts.page = req.query.page;
    }
    if (req.query._id) {
      filter._id = req.query._id;
    }
    if (req.query.category) {
      filter.category = req.query.category;
    }

    const all = await productsManager.paginate({ filter, opts });
    const info = {
      limit: all.limit,
      page: opts.page,
      _id: filter._id,
      totalPages: all.totalPages,
    };
    return res.paginate(all.docs, info);
  } catch (error) {
    return next(error);
  }
}

async function read(req, res, next) {
  try {
    const all = await productsManager.read(req.query);
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

async function readOne(req, res, next) {
  try {
    const { pid } = req.params;
    const one = await productsManager.readOne(pid);
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
    const { pid } = req.params;
    const data = req.body;
    const one = await productsManager.update(pid, data);
    return res.response200(one);
  } catch (error) {
    return next(error);
  }
}

async function destroy(req, res, next) {
  try {
    const { pid } = req.params;
    const one = await productsManager.destroy(pid);
    return res.message200("Carrito borrado con éxito");
  } catch (error) {
    return next(error);
  }
}

export default productsRouter.getRouter();