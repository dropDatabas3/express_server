import cartManager from "../data/mongo/manager/CartManager.mongo.js";
import Service from "./service.js";


console.log(cartManager, "cartManager")
console.log(typeof(cartManager))
const cartService = new Service(new cartManager);
const {
  createService,
  readService,
  paginateService,
  readOneService,
  updateService,
  destroyService,
} = cartService;
export {
  createService,
  readService,
  paginateService,
  readOneService,
  updateService,
  destroyService,
};
