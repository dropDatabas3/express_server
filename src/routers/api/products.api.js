import { Router } from "express";

import productsManager from "../../data/mongo/manager/ProductManager.mongo.js";
import checkProductsInputs from "../../middlewares/formChecker.js";
import isValidAdmin from "../../middlewares/isValidAdmin.mid.js";

const productsRouter = Router();

productsRouter.post("/", isValidAdmin, checkProductsInputs, create);
productsRouter.get("/", read);
productsRouter.get("/paginate", paginate);
productsRouter.get("/:pid", readOne);
productsRouter.put("/:pid", update);
productsRouter.delete("/:pid", destroy);

async function create(req, res, next) {
  try {
    const data = req.body;
    const one = await productsManager.create(data);
    return res.json({
      statusCode: 201,
      message: "CREATED WITH ID " + one.id,
    });
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

    const all = await productsManager.paginate({filter, opts});
    console.log(all)
    return res.json({
      statusCode: 200,
      response: all.docs,
      info: {
        limit: all.limit,
        page: opts.page,
        _id: filter._id,
        totalPages: all.totalPages
      },
    });
  } catch (error) {
    next(error);
  }
};


async function read(req, res, next) {
  try {
    const all = await productsManager.read(req.query);
    if (all.length > 0) {
      return res.json({
        statusCode: 200,
        response: all,
      });
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
      return res.json({
        statusCode: 200,
        response: one,
      });
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
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
}
async function destroy(req, res, next) {
  try {
    const { pid } = req.params;
    const one = await productsManager.destroy(pid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
}


export default productsRouter