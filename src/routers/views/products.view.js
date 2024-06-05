import CustomRouter from "../CustomRouter.js";
//import productsManager from "../../data/fs/ProductManager.fs.js";

import productsManager from "../../data/mongo/manager/ProductManager.mongo.js";

class ProductsRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], products);
    this.read("/real", ["PUBLIC"], real);
    this.read("/:pid", ["PUBLIC"], readOne);
  }
}




async function products(req, res, next){
  console.log("entro a products")
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
    const products = all.docs.map(doc => doc.toObject({ virtuals: true }));
    console.log(all)
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
    const product = await productsManager.readOne(pid);
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
