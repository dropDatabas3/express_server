import { config } from "dotenv"; 
import argsUtils from "./args.utils.js";

const { env } = argsUtils;
const path = env === "prod" ? "./.env.prod" : "./.env.dev";
config({ path });

const enviroment = {
    MONGO_URI : process.env.MONGO_URI,
    SECRET_JWT : process.env.SECRET_JWT,
    SECRET : process.env.SECRET,
    GOOGLE_EMAIL : process.env.GOOGLE_EMAIL,
    GOOGLE_PASSWORD : process.env.GOOGLE_PASSWORD 
}

export default enviroment;

