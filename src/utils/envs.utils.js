import { config } from "dotenv"; 
import argsUtils from "./args.utils.js";

const { env } = argsUtils;
const path = env === "prod" ? "./.env.prod" : "./.env.dev";
config({ path });

const enviromenten = {
    MONGO_URI : process.env.MONGO_URI,
    SECRET_JWT : process.env.SECRET_JWT,
    SECRET : process.env.SECRET,
}

export default enviromenten;