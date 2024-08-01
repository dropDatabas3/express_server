import CustomRouter from "../CustomRouter.js";
//import productsManager from "../../data/fs/ProductManager.fs.js";

import productsManager from "../../data/mongo/manager/ProductManager.mongo.js";

import {   
  createService,
  paginateService,
  readService,
  readOneService,
  updateService,
  destroyService } from "../../services/products.service.js";


class ProductsRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], products);
    this.read("/real", ["PUBLIC"], real);
    this.read("/:pid", ["PUBLIC"], readOne);
  }
}

async function products(req, res, next){
  try {
    const filter = {};
    const opts = {};
    opts.limit = req.query.limit || 12;
    if (req.query.page) {
      opts.page = req.query.page;
    }
    if (req.query._id) {
      filter._id = req.query._id;
    }
    if (req.query.category) {
      filter.category = req.query.category;
    }

    console.log("limit: ", opts.limit)
   const all = await paginateService({filter, opts});
    //const all = await readService();
    console.log(all)
    const products = all.docs.map(doc => {
      return typeof doc.toObject === 'function' ? doc.toObject({ virtuals: true }) : doc;
    });
    const pagInfo = {
      limit: all.limit,
      page: all.page,
      _id: filter._id,
      hasNextPage : all.hasNextPage,
      hasPrevPage : all.hasPrevPage,
      NextPage: all.nextPage,
      PrevPage: all.prevPage,
    }
    return res.render("products", { title: "Productos", products ,  pagInfo});
  } catch (error) {
    return next(error);
  }
};

 async function readOne(req, res, next){
   try {
    console.log("entro")
    const { pid } = req.params;
    console.log({pid})
    const product = await readOneService(pid);
    console.log("Producto: ", product)
    return res.render("product", { title: product.title, product}); // <-- chequear vista
  } catch (error) {
    return next(error);
  }
};

/************
    REAL
************/
async function real(req, res, next){
  try {
    return res.render("real", { title: "Productos" });
  } catch (error) {
    return next(error);
  }
};


const productsRouter = new ProductsRouter();

export default productsRouter.getRouter();
