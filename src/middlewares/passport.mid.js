import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import usersRepository from "../repositories/user.repository.js";
import UserDTO from "../dto/user.dto.js";
import { createHash, verifyHash } from "../utils/hash.utils.js";
import { createToken } from "../utils/jwt.utils.js";
import {sendVerifyEmail , sendPasswordRecovery} from "../utils/mailing.utils.js";
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
        await sendVerifyEmail({to : email , name: user.name , verifyCode: user.verifyCode});//enviar email
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
        const one = await usersRepository.readByEmailRepository(email);
        if (!one) {
          const error = CustomError.new(errors.invalid);
          return done(error);
        }
        if(one.verify === false){
          const error = CustomError.new(errors.notVerified);
          return done(error);
        }
        const verify = verifyHash(password, one.password);
        if (verify) {
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


passport.use(
  "passwordRecovery",
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: "email",
      passwordField: "password", // Necesario para evitar el error de credenciales faltantes
    },
    async (req, email, password,  done) => {
      try {
        const user = await usersRepository.readByEmailRepository(email);
        if (!user) {
          const error = CustomError.new(errors.invalid);
          return done(error);
        }
        const verifyCode = Math.floor(Math.random() * 1000000);
        await usersRepository.updateRepository(user._id, { verifyCode });
        await sendPasswordRecovery({ to: email, name: user.name, verifyCode });
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "verifyPasswordCode",
  new LocalStrategy(
    {passwordField: 'code' , usernameField: "email", passReqToCallback: true},
    async (req, email, code, done) => {
      try {
        const one = await usersRepository.readByEmailRepository(email);
        if (!one) {
          const error = CustomError.new(errors.invalid);
          return done(error);
        }
        if (one.verifyCode === code) {
          const user = {
            email,
            role: 2,
            _id: one._id,
            online: false,
          };
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

passport.use(
  "resetPassword",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email", passwordField: "password" },
    async (req, email, password, done) => {
      try {
        // Autenticar al usuario con JWT
        passport.authenticate('jwt', { session: false }, async (err, user, info) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            const error = CustomError.new(errors.invalid);
            return done(error);
          }
          // Obtener el email del usuario autenticado
          const userEmail = user.email;

          // Buscar el usuario por email
          const one = await usersRepository.readByEmailRepository(userEmail);
          if (!one) {
            const error = CustomError.new(errors.invalid);
            return done(error);
          }

          // Actualizar la contraseña
          const newPassword = createHash(password);
          await usersRepository.updateRepository(one._id, { password: newPassword });

          return done(null, one);
        })(req, null, done); // Asegúrate de pasar los parámetros req y done
      } catch (error) {
        return done(error);
      }
    }
  )
);




export default passport;