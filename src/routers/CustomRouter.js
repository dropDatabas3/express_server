import { Router } from "express";
import { verifyToken } from "../utils/jwt.utils.js";
import usersRepository from "../repositories/user.repository.js";
import winston from "../utils/winston.utils.js";

class CustomRouter {
  //para construir y configurar cada instancia del enrutador
  constructor() {
    this.router = Router();
    this.init();
  }
  //para obtener todas las rutas del enrutador definido
  getRouter() {
    return this.router;
  }
  //para inicializar las clases/propiedades heredades (sub-routers)
  init() {}
  //para manejar las callbacks (de middlewares y la final)
  applyCbs(callbacks) {
    return callbacks.map((callback) => async (...params) => {
      try {
        
        await callback.apply(this, params);
      } catch (error) {
        return params[2](error);
      }
    });
  }
  response = (req, res, next) => {
    res.message200 = (message) => res.json({ statusCode: 200, message });
    res.response200 = (response) => res.json({ statusCode: 200, response });
    res.paginate = (response, info) =>
      res.json({ statusCode: 200, response, info });
    res.message201 = (message) => res.json({ statusCode: 201, message });
    res.response201 = (response) => res.json({ statusCode: 201, response });
    res.error400 = (message) => {
      const errorMessage = `${req.method} - ${req.url}: - 400 ${new Date().toLocaleTimeString()} - ${message} `;
      winston.ERROR(errorMessage);
      res.json({ statusCode: 400, message })};
    res.error401 = () =>{
      const errorMessage = `${req.method} - ${req.url}: - 401 ${new Date().toLocaleTimeString()} - Bad auth from poliecies! `;
      winston.ERROR(errorMessage);
      res.json({ statusCode: 401, message: "Bad auth from poliecies!" })};
    res.error403 = () =>{
      const errorMessage = `${req.method} - ${req.url}: - 403 ${new Date().toLocaleTimeString()} - Forbidden from poliecies! `;
      winston.ERROR(errorMessage);
      res.json({ statusCode: 403, message: "Forbidden from poliecies!" })};
    res.error404 = () =>{
      const errorMessage = `${req.method} - ${req.url}: - 404 ${new Date().toLocaleTimeString()} - Docs not found`;
      winston.ERROR(errorMessage);
      res.json({ statusCode: 404, message: "Not found docs" })};
    return next();
  };
  policies = (policies) => async (req, res, next) => {
    if (policies.includes("PUBLIC")) return next();
    else {
      let token = req.cookies["token"];
      if (!token) return res.error401();
      else {
        try {
          token = verifyToken(token);
          const { role, email } = token;
          if (
            (policies.includes("USER") && role === 0) || 
            (policies.includes("ADMIN") && role === 1)  ||
            (policies.includes("RECOVERY" ) && role === 2)
          ) {
            const user = await usersRepository.readByEmailRepository(email);
            req.user = user;
            return next();
          } else return res.error403();
        } catch (error) {
          return res.error400(error.message);
        }
      }
    }
  };
  create(path, arrayOfPolicies, ...callbacks) {
    this.router.post(
      path,
      this.response,
      this.policies(arrayOfPolicies),
      this.applyCbs(callbacks)
    );
  }
  read(path, arrayOfPolicies, ...callbacks) {
      this.router.get(
      path,
      this.response,
      this.policies(arrayOfPolicies),
      this.applyCbs(callbacks)
    );
  }
  update(path, arrayOfPolicies, ...callbacks) {
    this.router.put(
      path,
      this.response,
      this.policies(arrayOfPolicies),
      this.applyCbs(callbacks)
    );
  }
  destroy(path, arrayOfPolicies, ...callbacks) {
    this.router.delete(
      path,
      this.response,
      this.policies(arrayOfPolicies),
      this.applyCbs(callbacks)
    );
  }
  use(path, ...callbacks) {
    this.router.use(path, this.response, this.applyCbs(callbacks));
  }
}

export default CustomRouter;