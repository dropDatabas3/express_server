import { Router } from "express";
import usersRouter from "./users.api.js";
import productsRouter from "./products.api.js";


const apiRouter = Router()

apiRouter.use("/products",productsRouter)
apiRouter.use("/users",usersRouter)

export default apiRouter