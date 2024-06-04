import usersRouter from "./users.api.js";
import productsRouter from "./products.api.js";
import cartsRouter from "./carts.api.js";
import ticketsRouter from "./tickets.api.js";
import sessionRouter from "./sessions.api.js";
import CustomRouter from "../CustomRouter.js";

class ApiRouter extends CustomRouter {
    init() {
        this.use("/products", productsRouter);
        this.use("/users", usersRouter);
        this.use("/carts", cartsRouter);
        this.use("/tickets", ticketsRouter);
        this.use("/sessions", sessionRouter);
    }
}


const apiRouter = new ApiRouter();

export default apiRouter.getRouter();