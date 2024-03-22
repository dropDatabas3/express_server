import express from "express";
import productsManager from "./data/fs/ProductManager.fs.js";

/*************
    SERVER
**************/
const server = express(); // <-- Initialize Express server
const port = 8080; // <-- Define the port number for the server
const ready = () => console.log("Server ready on port " + port); // <-- Log a message when the server is ready
server.listen(port, ready); // <-- Start the server and listen on the specified port

/*************
  MIDDLEWARES
**************/
server.use(express.urlencoded({ extended: true })); // <-- Allows the server to read req.param and req.query
server.use(express.json()); // <-- Used for req body

/*************
  ROUTES
**************/
server.get("/api/products", async (req, res) => {
  try {
    const { category } = req.query;
    const product = await productsManager.read(category);
    if (product.length !== 0 ) {
      return res.status(200).json({
        response: product,
        category,
        success: true,
      });
    }else{
        if(category !== undefined){
            throw new Error("No products found in the list with category "+category)
        }else{
            throw new Error("No products found in the list")
        }
    }
  } catch (error) {
    const { category } = req.query;
    if (error.message === "No products found in the list" || error.message === `No products found in the list with category ${category}`) {
      // If the error has a message, it is considered a controlled error
      return res.status(404).json({ error: error.message, success: false });
    } else {
      // It's considered an internal server error
      console.error(error);
      return res
        .status(500)
        .json({ error: "Internal server error", success: false });
    }
  }
});
