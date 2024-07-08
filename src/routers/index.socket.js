import productsRepository from "../repositories/products.repository.js";


export default async (socket) => {
  console.log("client connected")
  console.log("client id: " + socket.id);
  socket.emit("products", await productsRepository.readRepository());
  socket.on("newProduct", async (data) => {
    await productsRepository.createRepository(data);
    socket.emit("products", await productsRepository.readRepository());
  });
};

