import passportCb from "../../middlewares/passportCb.mid.js";
import CustomRouter from "../CustomRouter.js";
import { login, register, session, online, destroySession } from "../../controllers/sessions.controller.js";

class SessionRouter extends CustomRouter {
  init() {
    this.read("/",["PUBLIC"], session);
    this.create("/login", ["PUBLIC"], passportCb("login"), login);
    this.read("/online", ["USER", "ADMIN"], passportCb("jwt"), online);
    this.create("/logout", ["PUBLIC"],destroySession);
    this.create("/register", ["PUBLIC"],passportCb("register"), register);
  }
  
}


const sessionRouter = new SessionRouter();

export default sessionRouter.getRouter()  ;
