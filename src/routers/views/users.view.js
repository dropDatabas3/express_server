import { Router } from "express";
//import userManager from "../../data/fs/UserManager.fs.js";
import userManager from "../../data/mongo/manager/UserManager.mongo.js";


const userRouter = Router();


userRouter.get("/register", async (req, res, next) => {
  try {
    return res.render("register", { title: "Register"});
  } catch (error) {
    return next(error);
  }
});

userRouter.get("/login", async (req, res, next) => {
  try {
    return res.render("login", { title: "Login"});
  } catch (error) {
    return next(error);
  } 
})



userRouter.get("/", async (req, res, next) => {
  try {
    const { user_id } = req.session;
    const one = await userManager.readOne(user_id);
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
});






/*
userRouter.get("/", async (req, res, next) => {
  try {
    const users = await userManager.read();
    return res.render("users", { title: "Users", users });
  } catch (error) {
    return next(error);
  }
});
*/
export default userRouter;
