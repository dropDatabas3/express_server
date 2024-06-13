import cartManager from "../data/mongo/manager/CartManager.mongo.js";
import Service from "./service.js";

const cartService = new Service(cartManager);
export const {
  createService,
  readService,
  paginateService,
  readOneService,
  updateService,
  destroyService,
} = cartService;

