import passport from "./passport.mid.js";


function passportCb(strategy) {
  console.log("passportCb")
  return (req, res, next) => {
    console.log("entro a passportCb")
    passport.authenticate(strategy, (error, user, info) => {
      console.log(error)
      if (error) {
        console.log("entro a error")

        return next(error);
      }
      if (user) {
        req.user = user;
        return next();
      }
      console.log("error")
      return res.json({
        
        statusCode: info.statusCode || 401,
        message: info.message ? info.message : info.toString,
      });
    })(req, res, next);
  };
}
export default passportCb;