import express from "express";
import morgan from "morgan";
import { Server } from "socket.io";
import { createServer } from "http";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";

import enviromenten from "./src/utils/envs.utils.js";
import argsUtils from "./src/utils/args.utils.js";
import indexRouter from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import  __dirname  from "./utils.js";
import socketcb from "./src/routers/index.socket.js"


/*************
  HTTP  SERVER
**************/
const server = express(); // <-- Initialize Express server
const port = argsUtils.p || 8080; // <-- Define the port number for the server
const ready = async () => {
  console.log("Server ready on port " + port); // <-- Log a message when the server is ready
} 
const nodeServer = createServer(server)
nodeServer.listen(port, ready); // <-- Start the server and listen on the specified port


/*************
  TCP  SERVER
**************/
const socketServer = new Server(nodeServer)
socketServer.on("connection", socketcb)


/*************
MOTOR DE PLANTILLAS / TEMPLATING ENGINE
**************/
server.engine("handlebars", engine()); // <-- Initialize the Handlebars engine
server.set("view engine", "handlebars"); // <-- Set the view engine to Handlebars
server.set("views", __dirname+'/src/views'); // <-- Set the views directory


/*************
  MIDDLEWARES
**************/
server.use(session({
  store: new MongoStore({mongoUrl: enviromenten.MONGO_URI, ttl: 60*60}),
  secret: enviromenten.SECRET,
  resave: true,
  saveUninitialized: true,
}));
server.use(cookieParser(enviromenten.SECRET));
server.use(express.urlencoded({ extended: true })); // <-- Allows the server to read req.param and req.query
server.use(express.json()); // <-- Used for req body
server.use(morgan("dev")); // <-- Log requests to the console
server.use(express.static(__dirname + "/public")); // <-- Serve static files


/*************
  ENDPOINTS
**************/
server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);

console.log("args: ", argsUtils)
console.log("Envirment: ",enviromenten)

