import apiRouter from "./api/index.api.js";
import viewsRouter from  "./views/index.view.js";
import CustomRouter from "./CustomRouter.js";

class IndexRouter extends CustomRouter {
  init() {
    this.use("/api", apiRouter);
    this.use("/", viewsRouter);
  }
}


const indexRouter = new IndexRouter();
export default indexRouter.getRouter();