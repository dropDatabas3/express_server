import userManager from "../data/mongo/manager/UserManager.mongo.js";
import Service from "./service.js";

const UserService = new Service(userManager);

const {
  createService,
  readService,
  readOneService,
  updateService,
  destroyService,
} = UserService;
export {
  createService,
  readService,
  readOneService,
  updateService,
  destroyService,
};
