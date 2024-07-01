import apiRouter from "./api/index.api.js";
import viewsRouter from  "./views/index.view.js";
import CustomRouter from "./CustomRouter.js";
import sendEmail from "../utils/mailing.utils.js";

class IndexRouter extends CustomRouter {
  init() {
    this.use("/api", apiRouter);
    this.create("/api/nodemailer", ["PUBLIC"] ,async(req, res, next) => {
      try {
        const {email , name } = req.body
        await sendEmail({to: email , name}) 
        return res.message200("EMAIL SENT")
      } catch (error) {
        next(error)
      }
    })
    this.use("/", viewsRouter);
  }
}


const indexRouter = new IndexRouter();
export default indexRouter.getRouter();