import productsManager from "../data/fs/ProductManager.fs.js";

export default async (socket) => {
  console.log("client connected")
  console.log("client id: " + socket.id);
  socket.emit("products", await productsManager.read());
  socket.on("newProduct", async (data) => {
    await productsManager.create(data);
    socket.emit("products", await productsManager.read());
  });
};