import { Router } from "express";

import cartManager from "../../data/mongo/manager/CartManager.mongo.js";

const cartRouter = Router();

cartRouter.post("/", create);
cartRouter.get("/", read);
cartRouter.get("/paginate", paginate);
cartRouter.get("/:cid", readOne);
cartRouter.put("/:cid", update) //<-- Si se quiere modificar la cantidad de un producto en el carrito 
cartRouter.delete("/:cid", destroy) // <-- Si se quiere eliminar un producto del carrito
//cartRouter.get("/findUno", findUno); //<-- Si se quiere buscar un producto en el carrito por user_id y product_id


async function create(req, res, next) {
    try {
        const one = await cartManager.create(req.body);
        return res.json({
            statusCode: 201,
            response: one,
            message: "CREATED WITH ID " + one.id,
        });
    } catch (error) {
        return next(error)
    }
}
async function read(req, res, next) {
    try {
        const { uid } = req.body;
        const all = await cartManager.read(uid);
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
async function paginate(req, res, next) {
    console.log("ENTRO A PAGINATE")
    try {
      const opts = {};
      const filter = {};
      if (req.query.state) {
        filter.state = req.query.state;
      }
      if(req.query.product_id){
        filter.product_id = req.query.product_id;
      }
      filter.user_id = req.session.user_id
      console.log("Vamos a buscar con user_id: ", filter.user_id , " y pid: ", filter.product_id)
      const all = await cartManager.paginate({ filter, opts });
      console.log("all de paginate carrito: ", all)
      res.json({
        statusCode: 200,
        response: all.docs,
      });
    } catch (error) {
      next(error);
    }
  }

async function readOne(req, res, next) {
    try {
        const { cid } = req.params;
        const one = await cartManager.readOne(cid);
        if (one) {
            return res.json({
                statusCode: 200,
                response: one,
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


async function update(req, res, next) {
    try {
        const { cid } = req.params;
        const one = await cartManager.update(cid, req.body);
        return res.json({
            statusCode: 200,
            response: one,
        });
    } catch (error) {
        return next(error);
    }
}

async function destroy(req, res, next) {
    try {
        const { cid } = req.params;
        const one = await cartManager.destroy(cid);
        return res.json({
            statusCode: 200,
            response: one,
            message: "Carrito borrado con éxito"
        });
    } catch (error) {
        return next(error);
    }
}


export default cartRouter;