import CustomRouter from "../CustomRouter.js";
//import userManager from "../../data/fs/UserManager.fs.js";

import userManager from "../../data/mongo/manager/UserManager.mongo.js";
import { verifyToken } from "../../utils/jwt.utils.js";

class UsersRouter extends CustomRouter {
  init() {
    this.read("/register",["PUBLIC"], register);
    this.read("/login",["PUBLIC"], login);
    this.read("/", ["USER"], userInfo);
  }
}

const userRouter = new UsersRouter();


async function register(req, res, next){
  try {
    return res.render("register", { title: "Register"});
  } catch (error) {
    return next(error);
  }
};

async function login (req, res, next){
  try {
    return res.render("login", { title: "Login"});
  } catch (error) {
    return next(error);
  } 
}



async function userInfo(req, res, next){
  try {
    console.log("entro a profile")
    const user = verifyToken(req.cookies.token);
    const one = await userManager.readOne(user._id);
    if (one) {
      return res.render("userInfo", { title: "User: " + one._id, one });
    } else {
      const error = new Error("Not found!");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
};


export default userRouter.getRouter();
