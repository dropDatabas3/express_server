import { Router } from "express";
import userManager from "../../data/fs/UserManager.fs.js";

const userRouter = Router();

userRouter.get("/register", async (req, res, next) => {
  try {
    return res.render("register", { title: "Register"});
  } catch (error) {
    return next(error);
  }
});


userRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const one = await userManager.readOne(uid);
    if (one) {
      return res.render("userInfo", { title: "User: " + one.id, one });
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
