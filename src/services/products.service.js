import ProductManager from "../data/mongo/manager/ProductManager.mongo.js";
import Service from "./service.js";
const ProductService = new Service(ProductManager);
export const {
  createService,
  paginateService,
  readService,
  readOneService,
  updateService,
  destroyService,
} = ProductService;
