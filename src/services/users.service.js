import Service from "./service.js";
import usersRepository from "../repositories/user.repository.js";

const UserService = new Service(usersRepository);


export const {
  createService,
  readService,
  readOneService,
  updateService,
  destroyService,
} = UserService;
