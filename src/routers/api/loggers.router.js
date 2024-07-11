import CustomRouter from "../CustomRouter.js";
import logger from "../../utils/winston.utils.js";

class LoggerRouter extends CustomRouter {
    init() {
      this.read("/", ["PUBLIC"], (req, res) => {
        req.logger = logger;
        req.logger.FATAL("FATAL");
        req.logger.ERROR("ERROR");
        req.logger.INFO("INFO");
        req.logger.HTTP("HTTP");
      
        res.send("Logger test complete");
      });
      
    }
  }
  
  const loggersRouter = new LoggerRouter();
  
  export default loggersRouter.getRouter();