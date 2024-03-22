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
    if (product.length !== 0) {
      return res.status(200).json({
        response: product,
        category,
        success: true,
      });
    } else {
      const error = new Error();
      error.statusCode = 404;
      if (category !== undefined) {
        error.message(
          "No products found in the list with category " + category
        );
      } else {
        error.message("No products found in the list");
      }
    }
  } catch (error) {
    if (error.statusCode === 404) {
      // If the error has a message, it is considered a controlled error
      return res
        .status(error.statusCode)
        .json({ error: error.message, success: false });
    } else {
      // It's considered an internal server error
      console.error(error);
      return res
        .status(500)
        .json({ error: "Internal server error", success: false });
    }
  }
});

server.get("/api/products/:pid", async (req, res) => {
  try {
    console.log('/api/products/:pid')
    const { pid } = req.params;
    const oneProduct = await productsManager.readOne(pid);
    if (oneProduct) {
      return res.status(200).json({
        response: oneProduct,
        success: true,
      });
    } else {
      const error = new Error();
      error.statusCode = 404;
      error.message("No products found with id " + pid);
    }
  } catch (error) {
    if (error.statusCode === 404) {
      // If the error has a message, it is considered a controlled error
      return res
        .status(error.statusCode)
        .json({ error: error.message, success: false });
    } else {
      // It's considered an internal server error
      console.error(error);
      return res
        .status(500)
        .json({ error: "Internal server error", success: false });
    }
  }
});
