import passportCb from "../../middlewares/passportCb.mid.js";
import CustomRouter from "../CustomRouter.js";

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
async function session(req, res, next) {
  try {
    console.log("entro a ruta session");
    if (req.session.online) {
      console.log("respuesta 200");
      return res.message200("User is online");
    }
    console.log("respuesta 401");
    return res.error401();
  } catch (error) {
    return next(error);
  }
}

async function register(req, res, next) {
  try {
    return res.message201("Registered");
  } catch (error) {
    return next(error);
  }
}

async function login(req, res, next) {
  try {
    return res
      .cookie("token", req.user.token, { signedCookie: true })
      .message200("Logged in!");
  } catch (error) {
    return next(error);
  }
}

async function online(req, res, next) {
  try {
    if (req.user.online) {
      return res.response200(req.user);
    }
    const error = new Error("Bad auth");
    error.statusCode = 401;
    throw error;
  } catch (error) {
    return next(error);
  }
}

async function destroySession(req, res, next) {
  try {
    console.log("Entro a destruir la sesion");
      res.clearCookie("token");
      console.log("Sesión destruida con éxito");
      return res.message200("Session closed successfully");
  } catch (error) {
    console.error("Error en el controlador al querer destruir sesión:", error);
    return next(error);
  }
}
export default sessionRouter.getRouter()  ;
