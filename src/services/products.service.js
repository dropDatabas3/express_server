import ProductManager from "../data/mongo/manager/ProductManager.mongo.js";
import Service from "./service.js";



const ProductService = new Service(ProductManager);
console.log(ProductService.manager, "ProductService")
const {
  createService,
  paginateService,
  readService,
  readOneService,
  updateService,
  destroyService,
} = ProductService;
export {
  createService,
  paginateService,
  readService,
  readOneService,
  updateService,
  destroyService,
};
