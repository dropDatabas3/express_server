//import ProductManager from "../data/mongo/manager/ProductManager.mongo.js";
import Service from "./service.js";
import dao from "../data/dao.factory.js";

const { products } = dao;

const ProductService = new Service(products);


export const {
  createService,
  paginateService,
  readService,
  readOneService,
  updateService,
  destroyService,
} = ProductService;
