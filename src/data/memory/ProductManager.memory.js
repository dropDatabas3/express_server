class ProductManager {
  static #products = [];

  create(data) {
    try {
      const newProduct = {
        title: data.title,
        photo: data.photo,
        category: data.category,
        price: data.price,
        stock: data.stock,
        id:
          ProductManager.#products.length === 0
            ? 1
            : ProductManager.#products[ProductManager.#products.length - 1].id +
              1,
      };
      if (
        !data.title ||
        !data.photo ||
        !data.category ||
        !data.price ||
        !data.stock
      ) {
        throw new Error(`Todos los campos de producto deben ser obligatorios`);
      } else {
        ProductManager.#products.push(newProduct);
        console.log(
          `\nSe creo con exito el producto "${data.title}". Su id es: ${newProduct.id}`
        );
      }
    } catch (error) {
      console.error(error);
    }
  }
  read() {
    try {
      if (ProductManager.#products.length === 0) {
        throw new Error(`No hay productos disponibles`);
      } else {
        console.log(ProductManager.#products);
      }
    } catch (error) {
      console.error(error);
    }
  }
  readOne = (id) => {
    try {
      const product =
        ProductManager.#products.length === 0
          ? (() => {
              throw new Error(`No hay productos disponibles`);
            })()
          : ProductManager.#products.find((product) => product.id === id);
      if (!product) {
        throw new Error(`No se encontro producto con id ${id}`);
      } else {
        return product;
      }
    } catch (error) {
      console.error(error);
    }
  };

  update = (id, data) => {
    try {
      let all = this.read();
      let one = all.find((product) => product.id === id);
      if (one) {
        for (let prop in data) {
          one[prop] = data[prop];
        }
        console.log("producto modificado");
      } else {
        throw new Error("No existe el producto");
      }
    } catch (error) {
      console.error(error);
    }
  };

  destroy = (id) => {
    const product = this.readOne(id);
    if (product) {
      ProductManager.#products.splice(
        ProductManager.#products.indexOf(product),
        1
      );
      console.log(`Se elimino el producto ${JSON.stringify(product)}`);
    }
  };
}

function testProductManager() {
  console.log("Creamos 10 prductos:");
  manager.create({
    title: "Arroz",
    photo: "sin foto",
    category: "comida",
    price: 200,
    stock: 25,
  });
  manager.create({
    title: "Papas Fritas",
    photo: "sin foto",
    category: "snack",
    price: 1200,
    stock: 5,
  });
  manager.create({
    title: "Leche",
    photo: "sin foto",
    category: "comida",
    price: 200,
    stock: 25,
  });
  manager.create({
    title: "Manzanas",
    photo: "sin foto",
    category: "frutas",
    price: 1200,
    stock: 5,
  });
  manager.create({
    title: "Hamburguesa",
    photo: "sin foto",
    category: "comida",
    price: 200,
    stock: 25,
  });
  manager.create({
    title: "Refresco",
    photo: "sin foto",
    category: "bebida",
    price: 1200,
    stock: 5,
  });
  manager.create({
    title: "Pan",
    photo: "sin foto",
    category: "comida",
    price: 200,
    stock: 25,
  });
  manager.create({
    title: "Cerveza",
    photo: "sin foto",
    category: "bebida",
    price: 1200,
    stock: 5,
  });
  manager.create({
    title: "Queso",
    photo: "sin foto",
    category: "comida",
    price: 200,
    stock: 25,
  });
  manager.create({
    title: "Chocolate",
    photo: "sin foto",
    category: "dulces",
    price: 1200,
    stock: 5,
  });
}
