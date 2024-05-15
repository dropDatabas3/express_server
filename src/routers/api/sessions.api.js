import { Router } from "express";
import userManager from "../../data/mongo/manager/UserManager.mongo.js";
import isValidEmail from "../../middlewares/isValidEmail.mid.js";
import isValidData from "../../middlewares/isValidData.mid.js";
import isValidUser from "../../middlewares/isValidUser.mid.js";
import isValidPassword from "../../middlewares/isValidPassword.mid.js";

const sessionRouter = Router();

sessionRouter.post("/login", isValidUser, isValidPassword, login);
sessionRouter.get("/online", online);
sessionRouter.post("/logout", destroySession);
sessionRouter.post("/register", isValidData, isValidEmail, register);

async function register(req, res, next) {
  try {
    const data = req.body;
    await userManager.create(data);
    return res.json({
      statusCode: 201,
      message: "Registered",
    });
  } catch (error) {
    return next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email } = req.body;
    const user = await userManager.readByEmail(email);
    req.session.email = email;
    req.session.role = user.role;
    req.session.user_id = user._id;
    req.session.photo = user.photo;
    return res.json({
      statusCode: 200,
      message: "Logged",
    });
  } catch (error) {
    return next(error);
  }
}

async function online(req, res, next) {
  try {
    console.log(req.session);
    if (req.session.email) {
      return res.json({
        statusCode: 200,
        message: "User is online",
      });
    }
    return res.json({
      statusCode: 401,
      message: "User is offline",
    });
  } catch (error) {
    return next(error);
  }
}

async function destroySession(req, res, next) {
  try {
    console.log("Entro a destruir la sesion");
    req.session.destroy((err) => {
      if (err) {
        console.error("Error al destruir la sesión:", err);
        return next(err);
      }
      console.log("Sesión destruida con éxito");
      return res.json({
        statusCode: 200,
        message: "Session destroyed",
      });
    });
  } catch (error) {
    console.error("Error en el controlador al querer destruir sesión:", error);
    return next(error);
  }
}

export default sessionRouter;