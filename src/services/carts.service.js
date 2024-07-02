import Service from "./service.js";
import cartsRepository from "../repositories/carts.repository.js";

const cartService = new Service(cartsRepository);

export const {
  createService,
  readService,
  paginateService,
  readOneService,
  updateService,
  destroyService,
} = cartService;

