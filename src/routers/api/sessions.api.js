import passportCb from "../../middlewares/passportCb.mid.js";
import CustomRouter from "../CustomRouter.js";
import { login, register, session, online, destroySession , verifyEmail } from "../../controllers/sessions.controller.js";

class SessionRouter extends CustomRouter {
  init() {
    this.read("/",["PUBLIC"], session);
    this.create("/login", ["PUBLIC"], passportCb("login"), login);
    this.read("/online", ["PUBLIC"], passportCb("jwt"), online);
    this.create("/logout", ["PUBLIC"],destroySession);
    this.create("/register", ["PUBLIC"],passportCb("register"), register);
    this.read("/verify", ["PUBLIC"],passportCb("verifyEmail"), verifyEmail);
  }
  
}


const sessionRouter = new SessionRouter();

export default sessionRouter.getRouter()  ;
