import { Router } from "express";
import usersRouter from "./users.api.js";
import productsRouter from "./products.api.js";
import cartsRouter from "./carts.api.js";
import ticketsRouter from "./tickets.api.js";

const apiRouter = Router()

apiRouter.use("/products",productsRouter)
apiRouter.use("/users",usersRouter)
apiRouter.use("/carts",cartsRouter)
apiRouter.use("/tickets", ticketsRouter)


export default apiRouter