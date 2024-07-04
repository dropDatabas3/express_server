import dbConnect from "../utils/dbConnect.mongo.utils.js";
import "../utils/envs.utils.js";
import productsRepository from "../repositories/products.repository.js";
import { faker } from "@faker-js/faker";

async function createData() {
  dbConnect();
  const category = ["Verduras", "Bebidas", "Comida rapida", "Pasteleria"];

  try {
    for (let i = 0; i < 1000; i++) {
      const product = {
        title: faker.commerce.product(),
        category: category[Math.floor(Math.random() * 4)],
        photo: faker.image.urlLoremFlickr({ category: 'food' }),
        price: Math.floor(Math.random() * 101),
        stock: Math.floor(Math.random() * 101),
      };
      await productsRepository.createRepository(product);
    }
    console.log("Products created");
    return
  } catch (error) {
    console.log(error);
    return
  }
}

createData();