
//import ProductManager from "../data/mongo/manager/ProductManager.mongo.js";
import Service from "./service.js";
import productsRepository from "../repositories/products.repository.js";

const ProductService = new Service(productsRepository);


export const {
  createService,
  paginateService,
  readService,
  readOneService,
  updateService,
  destroyService,
} = ProductService;
