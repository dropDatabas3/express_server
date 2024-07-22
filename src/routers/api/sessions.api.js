import passportCb from "../../middlewares/passportCb.mid.js";
import CustomRouter from "../CustomRouter.js";
import { login, register, session, online, destroySession , verifyEmail ,passwordRecovery , verifyPasswordCode , resetPassword } from "../../controllers/sessions.controller.js";

class SessionRouter extends CustomRouter {
  init() {
    this.read("/",["PUBLIC"], session);
    this.create("/login", ["PUBLIC"], passportCb("login"), login);
    this.read("/online", ["PUBLIC"], passportCb("jwt"), online);
    this.create("/logout", ["PUBLIC"],destroySession);
    this.create("/register", ["PUBLIC"],passportCb("register"), register);
    this.read("/verify", ["PUBLIC"],passportCb("verifyEmail"), verifyEmail);
    this.create("/password", ["PUBLIC"], chargeMissing, passportCb("passwordRecovery"), passwordRecovery); 
    this.read("/password", ["PUBLIC"],passportCb("verifyPasswordCode"), verifyPasswordCode);
    this.update("/password", ["RECOVERY"], chargeMissing, passportCb("resetPassword"), resetPassword);
  }
  
}

//ESTA FUNCION ES PARA QUE PASSPORT NO DE ERROR CUANDO NO SE ENVIE EL EMAIL O EL PASSWORD
async function chargeMissing(req, res, next) {
  try {
    if (!req.body.email) {
      req.body.email = "default@example.com";
    }
    if (!req.body.password) {
      req.body.password = "defaultpassword";
    }
    return next();
  } catch (error) {
    return next(error);
  }
}

const sessionRouter = new SessionRouter();

export default sessionRouter.getRouter()  ;
