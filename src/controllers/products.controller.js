import {
  createService,
  paginateService,
  readService,
  readOneService,
  updateService,
  destroyService,
} from "../services/products.service.js";
class productController {
  async create(req, res, next) {
    try {
      const data = req.body;
      const one = await createService(data);
      return res.message201("CREATED WITH ID " + one.id);
    } catch (error) {
      return next(error);
    }
  }

  async paginate(req, res, next) {
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

      const all = await paginateService({ filter, opts });
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

  async read(req, res, next) {
    try {
      const all = await readService(req.query);
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

  async readOne(req, res, next) {
    try {
      const { pid } = req.params;
      const one = await readOneService(pid);
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
      const { pid } = req.params;
      const data = req.body;
      const one = await updateService(pid, data);
      return res.response200(one);
    } catch (error) {
      return next(error);
    }
  }

  async destroy(req, res, next) {
    try {
      const { pid } = req.params;
      const one = await destroyService(pid);
      return res.message200("Carrito borrado con éxito");
    } catch (error) {
      return next(error);
    }
  }
}

const productsController = new productController();
const { create, paginate, read, readOne, update, destroy } = productsController;

export { create, paginate, read, readOne, update, destroy };
