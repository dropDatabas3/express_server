
//import cartManager from "../data/mongo/manager/CartManager.mongo.js";
import Service from "./service.js";
import dao from "../data/dao.factory.js";
const { carts } = dao;

const cartService = new Service(carts);

export const {
  createService,
  readService,
  paginateService,
  readOneService,
  updateService,
  destroyService,
} = cartService;

