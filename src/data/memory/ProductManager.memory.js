class ProductManager {
  static #products = [];

  async create(data) {
    try {
        ProductManager.#products.push(data);
        console.log(
          `\nSe creo con exito el producto "${data.title}". Su id es: ${newProduct._id}`
        );
        return data
    } catch (error) {
      throw error;
    }
  }

  read(category) {
    try {
      if (ProductManager.#products.length === 0) {
        throw new Error(`No hay productos disponibles`);
      } else {
        let lista = ProductManager.#products;
        if (category) {
          lista = lista.filter((each) => each.category == category);
        }
        return lista;
      }
    } catch (error) {
      throw error;
    }
  }

   readOne = async (id) => {
    try {
      const product =
        ProductManager.#products.length === 0
          ? (() => {
              throw new Error(`No hay productos disponibles`);
            })()
          : ProductManager.#products.find((product) => product._id === id);
      if (!product) {
        throw new Error(`No se encontro producto con id ${id}`);
      } else {
        return product;
      }
    } catch (error) {
      throw error;
    }
  };

  update = async(id, data) => {
    try {
      let all = this.read();
      let one = all.find((product) => product.id === id);
      if (one) {
        for (let prop in data) {
          one[prop] = data[prop];
        }
        console.log("producto modificado");
        return one
      } else {
        throw new Error("No existe el producto");
      }
    } catch (error) {
      throw error;
    }
  };

  destroy = async (id) => {
      try {
        const product = this.readOne(id);
        if (product) {
          ProductManager.#products.splice(
            ProductManager.#products.indexOf(product),
            1
          );
          console.log(`Se elimino el producto ${JSON.stringify(product)}`);
          return product
        }
      } catch (error) {
        throw error;
      }
  };

  async paginate({ filter, opts}) {
    try {
        let { page, limit } = opts;
        limit = parseInt(limit) || 10;
        page = parseInt(page) || 1;
        let products = this.read();
        console.log("limit: ", limit)
        console.log("page: ", page)
        
        // Aplicar filtros
        products = products.filter(product => {
            return Object.keys(filter).every(key => {
                if (key in product) {
                    if (typeof filter[key] === 'object' && filter[key] !== null) {
                        if (filter[key].$in && Array.isArray(filter[key].$in)) {
                            return filter[key].$in.includes(product[key]);
                        }
                    } else {
                        return product[key] === filter[key];
                    }
                }
                return false;
            });
        });

        //console.log("products por key: ", products)
        const start = (page - 1) * limit;
        const end = start + limit;
        const paginatedproducts = products.slice(start, end);
        //console.log("paginateproducts: ", paginatedproducts)

        const totalPages = Math.ceil(products.length / limit);
        return {
            docs: paginatedproducts,
            totalDocs: products.length,
            limit: limit,
            page: page,
            totalPages: totalPages,
            hasPrevPage: page > 1,
            hasNextPage: page < totalPages,
            prevPage: page > 1 ? page - 1 : null,
            nextPage: page < totalPages ? page + 1 : null
        };
    } catch (error) {
        throw error;
    }
  }
}


const productManager = new ProductManager();
export default productManager;


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
