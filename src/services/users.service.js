//import userManager from "../data/mongo/manager/UserManager.mongo.js";
import Service from "./service.js";
import dao from "../data/dao.factory.js";

const { users } = dao;

const UserService = new Service(users);

export const {
  createService,
  readService,
  readOneService,
  updateService,
  destroyService,
} = UserService;
