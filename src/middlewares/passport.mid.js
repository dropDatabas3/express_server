import passport from "passport";
import { Strategy } from "passport-local";
import userManager from "../data/mongo/manager/UserManager.mongo.js";
import { createHash, verifyHash } from "../utils/hash.utils.js";

passport.use(
    "register",
    new Strategy(
        {passReqToCallback: true , usernameField: "email"},
        async (req, email, password, done) => {
            try {
                if (!email || !password) {
                    const error = new Error("Please enter email and password!");
                    error.statusCode = 400;
                    return done(error);
                  }
                const user = await userManager.readByEmail(email);
                if (user) {
                    const error = new Error("Bad auth from register!");
                    error.statusCode = 401;
                    return done(error);
                }   
                const hash = createHash(password);
                req.body.password = hash
                const newUser = await userManager.create(req.body);
                return done(null, newUser);
            } catch (error) {
                return done(error);
            }
        }
    )
)
passport.use(
    "login",
    new Strategy(
        {passReqToCallback: true, usernameField: "email"},
        async (req, email, password, done) => {
            try {
                const user = await userManager.readByEmail(email);
                if (!user) {
                    const error = new Error("Bad auth from login!");
                    error.statusCode = 401;
                    return done(error);
                }
                const isValid = verifyHash(password, user.password);
                if (isValid) {
                    req.session.email = email;
                    req.session.online = true;
                    req.session.role = user.role;
                    req.session.photo = user.photo;
                    req.session.user_id = user._id;
                    return done(null, user);
                }
                const error = new Error("Invalid credentials");
                error.statusCode = 401;
                return done(error);
            } catch (error) {
                return done(error);
            }
        }
    )
)

export default passport