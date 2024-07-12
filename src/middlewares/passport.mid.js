import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import usersRepository from "../repositories/user.repository.js";
import UserDTO from "../dto/user.dto.js";
import { createHash, verifyHash } from "../utils/hash.utils.js";
import { createToken } from "../utils/jwt.utils.js";
import sendEmail from "../utils/mailing.utils.js";
import enviroment from "../utils/envs.utils.js";
import errors from "../utils/errors/errors.js";
import CustomError from "../utils/errors/customError.js";

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        //LA ESTRATEGIA NECESARIA PARA REGISTRAR A UN USUARIO
        //QUE CONSTA DE TODO LO QUE VALIDAMOS EN LOS MIDDLEWARES
        if (!email || !password || !req.body.name) {
          if (!req.body.name) {
            const error = CustomError.new(errors.missing);
            return done(error);
          }
          const error = CustomError.new(errors.missing);
          return done(error);
        }
        const one = await usersRepository.readByEmailRepository(email);
        if (one) {
          const error = CustomError.new(errors.emailAlreadyExists);
          return done(error);
        }
        req.body.password = createHash(password);
        const data = new UserDTO(req.body);
        const user = await usersRepository.createRepository(data);
        await sendEmail({to : email , name: user.name , verifyCode: user.verifyCode});//enviar email
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        console.log("Entro a login strategy")
        const one = await usersRepository.readByEmailRepository(email);
        console.log("one: ", one)
        if (!one) {
          console.log("no encontro usuario")
          const error = CustomError.new(errors.invalid);
          return done(error);
        }
        if(one.verify === false){
          console.log("email no verificado")
          const error = CustomError.new(errors.notVerified);
          return done(error);
        }
        const verify = verifyHash(password, one.password);
        if (verify) {
          console.log("contraseña correcta")
          const user = {
            email,
            role: one.role,
            photo: one.photo,
            name: one.name,
            _id: one._id,
            avatar: one.photo,
            online: true,
          };
          const token = createToken(user);
          user.token = token;
          return done(null, user);
          //agrega la propeidad USER al objeto de requerimientos
          //esa propiedad user tiene todas las propiedades que estamos definiendo en el objeto correspondiente
        }
        const error = CustomError.new(errors.invalid);
        return done(error);
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.use(
  "jwt",
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies["token"],
      ]),
      secretOrKey: enviroment.SECRET_JWT,
    },
    (data, done) => {
      try {
        if (data) {
          return done(null, data);
        } else {
          const error = CustomError.new(errors.forbidden);
          return done(error);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.use(
  "verifyEmail",
  new LocalStrategy(
    {passwordField: 'code' , usernameField: "email", passReqToCallback: true},
    async (req, email, code, done) => {
      console.log("entro a estrategia de verificaicon")
      try {
        const one = await usersRepository.readByEmailRepository(email);
        if (!one) {
          const error = CustomError.new(errors.invalid);
          return done(error);
        }
        if(one.verify){
          const error = CustomError.new(errors.auth);
          return done(error)
        }
        if (one.verifyCode === code) {
          const user = {
            email,
            role: one.role,
            photo: one.photo,
            name: one.name,
            _id: one._id,
            online: true,
          };
          await usersRepository.updateRepository(one._id, {verify: true});
          const token = createToken(user);
          user.token = token;
          return done(null, user);
        }
        const error = CustomError.new(errors.invalid);
        return done(error);
      } catch (error) {
        return done(error);
      }
    }
  )
)

export default passport;