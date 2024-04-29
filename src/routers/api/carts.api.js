import { Router } from "express";

import cartManager from "../../data/mongo/manager/CartManager.mongo.js";

const cartsRouter = Router();

cartsRouter.post("/", create);
cartsRouter.get("/", read);


async function create(req, res, next) {
    try {
        const one = await cartManager.create(req.body);
        return res.json({
            statusCode: 201,
            message: "CREATED WITH ID " + one.id,
        });
    } catch (error) {
        return next(error)
    }
}
async function read(req, res, next) {
    try {
        const all = await cartManager.read();
        if (all.length > 0) {
            return res.json({
                statusCode: 200,
                response: all,
            });
        } else {
            const error = new Error("Not found!");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        return next(error);
    }
}

export default cartsRouter;