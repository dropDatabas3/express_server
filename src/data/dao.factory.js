import argsUtils from "../utils/args.utils.js";
import dbConnect from "../utils/dbConnect.mongo.utils.js";

const persistence = argsUtils.persistence;

let dao = {}

switch (persistence) {
    case "memory":
        console.log("Using memory persistence")
        const { default: userManageMemory } = await import("./memory/UserManager.memory.js");
        const { default: productManagerMemory } = await import("./memory/ProductManager.memory.js");
        const { default: cartManagerMemory } = await import("./memory/CartManager.memory.js");
        dao = {
            users: userManageMemory,
            products: productManagerMemory,
            carts: cartManagerMemory
        }
        break;
    case "fs":
        console.log("Using FileSystem persistence")
        const { default: userManagerFs } = await import("./fs/UserManager.fs.js");
        const { default: productManagerFs } = await import("./fs/ProductManager.fs.js");
        const { default: cartManagerFs } = await import("./fs/CartManager.fs.js");
        dao = {
            users: userManagerFs,
            products: productManagerFs,
            carts: cartManagerFs
        }
        break;
    default:
        console.log("Using Mongo persistence")
        await dbConnect();
        const { default: userManagerMongo } = await import("./mongo/manager/UserManager.mongo.js");
        const { default: productManagerMongo } = await import("./mongo/manager/ProductManager.mongo.js");
        const { default: cartManagerMongo } = await import("./mongo/manager/CartManager.mongo.js");
        dao = {
            users: userManagerMongo,
            products: productManagerMongo,
            carts: cartManagerMongo
        }
        break;
}


export default dao;