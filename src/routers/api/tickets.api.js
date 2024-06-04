import CustomRouter from "../CustomRouter.js";
import cartManager from "../../data/mongo/manager/CartManager.mongo.js";
import { Types } from "mongoose";

class TicketsRouter extends CustomRouter {
    init() {
        this.read("/:uid",["USER", "ADMIN"], read);
    }
}

const ticketsRouter = new TicketsRouter();

async function read(req, res, next){
    try {
        const { uid } = req.params
        const ticket = await cartManager.aggregate([
            {
                $match: {
                    user_id : new Types.ObjectId(uid)
                },
            },
            {
                $lookup: {
                    foreignField: "_id",
                    from: "products",
                    localField: "product_id",
                    as: "product_id",
                },
            },
            {
                $replaceRoot:{
                    newRoot:{
                        $mergeObjects: [{$arrayElemAt : ["$product_id", 0]}, "$$ROOT"],
                    }
                }
            },
            {
                $set:{
                    subTotal: {
                        $multiply: ["$quantity", "$price"]
                    },
                },
            },
            {
                $group:{
                    _id: "$user_id",
                    total: {
                        $sum: "$subTotal"
                    },
                    products:{
                        $push:{
                            _id: "$_id",
                            title: "$title",
                            price: "$price",
                            quantity: "$quantity",
                            subTotal: "$subTotal"
                        }
                    }
                }
            },
            {
                $project:{
                    _id: 0,
                    user_id: "$_id",
                    total: "$total",
                    products: 1,
                    date: new Date()
                }
            
            }
        ])
        return res.response200(ticket);
    } catch (error) {
        return next(error)
    }
}


export default ticketsRouter.getRouter();