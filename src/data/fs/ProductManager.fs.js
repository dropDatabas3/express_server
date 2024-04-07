import fs from "fs";
import crypto from "crypto";

class ProductManager {
  constructor() {
    this.path = "./src/data/fs/files/products.json";
    this.init();
  }
  init() {
    const checkExist = fs.existsSync(this.path);
    if (!checkExist) {
      const newFile = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, newFile);
      console.log("archivo creado");
    } else {
      let checkArray = fs.readFileSync(this.path, "utf-8");
      if (checkArray.trim() === "") {
        //VERIFICAMOS SI EL ARCHIVO ESTA VACIO, EN CASO DE ESTARLO SE ELIMINA Y SE CREA DE NUEVO CON UN []
        console.error("El archivo no contiene un array");
        fs.unlinkSync(this.path);
        this.init();
      } else {
        console.log("El archivo ya existe");
      }
    }
  }
  async create(data) {
    try {
      if (
        !data.title ||
        !data.price ||
        !data.stock ||
        !data.category
      ) {
        throw new Error("All fields are required");
      } else {
        //CREO EL NUEVO PRODUCTO PARA LUEGO AGREGARLO A LA LISTA
        const newProduct = {
          id: data.id || crypto.randomBytes(12).toString("hex"), //data.id para generar un producto de prueba para readOne(id) y destroy(id)
          title: data.title,
          photo: data.photo || "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png",
          category: data.category,
          price: data.price,
          stock: data.stock,
        };
        //HAGO UNA COPIA DEL ARRAY DE PRODUCTS.JSON EN MI VARIABLE PRODUCTS
        let products = await fs.promises.readFile(this.path, "utf-8");
        products = JSON.parse(products);
        //AGREGO EL NUEVO PRODUCTO A LA COPIA DEL ARCHIVO
        products.push(newProduct);
        //SOBREESCRIBO EL ARCHIVO CON MI NUEVA INFORMACION
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(products, null, 2)
        );
        return newProduct
      }
    } catch (error) {
      throw error
    }
  }
  async read(category) {
    try {
      let lista = await fs.promises.readFile(this.path, "utf-8");
      lista = JSON.parse(lista);
      category && // <-- Evaluamos si category es false
        (lista = lista.filter((each) => each.category === category)); // <-- En caso de ser true, filtramos la lista a solo los que tengan category = category
      return lista;
    } catch (error) {
      return error;
    }
  }
  async readOne(id) {
    try {
      let lista = await fs.promises.readFile(this.path, "utf-8");
      lista = JSON.parse(lista);
      let product = lista.find((each) => each.id === id);
      return product;
    } catch (error) {
      return error;
    }
  }

  async update(id, data) {
    try {
      let all = await this.read();
      let one = all.find((each) => each.id === id);
      if (one) {
        for (let prop in data) {
          one[prop] = data[prop];
        }
      } else {
        throw new Error("Product not found!");
      }
      all = JSON.stringify(all, null, 2);
      await fs.promises.writeFile(this.path, all);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      const one = await this.readOne(id);
      if (!one) {

        throw new Error("Product not found!");
      } else {
        let all = await fs.promises.readFile(this.path, "utf-8");
        all = JSON.parse(all).filter((each) => each.id !== one.id);
        await fs.promises.writeFile(this.path, JSON.stringify(all, null, 2));
        console.log("Product with id ", one.id, " successfully deleted:");
        return one;

      }
    } catch (error) {
      throw error;
    }
  }
}

async function test() {
  const product = new ProductManager();
  await product.create({
    title: "Refresco",
    photo: "sin foto",
    category: "bebida",
    price: 1200,
    stock: 5,
  });
  await product.create({
    title: "Pan",
    photo: "sin foto",
    category: "comida",
    price: 200,
    stock: 25,
  });
  await product.create({
    title: "Cerveza",
    photo: "sin foto",
    category: "bebida",
    price: 1200,
    stock: 5,
  });
  await product.create({
    title: "Queso",
    photo: "sin foto",
    category: "comida",
    price: 200,
    stock: 25,
  });
  console.log(
    "Tratamos de crear un producto con stock:null para verificar que se soliciten todos los campos"
  );
  await product.create({
    title: "Chocolate",
    photo: "sin foto",
    category: "dulces",
    price: 1200,
    stock: null,
  });
  console.log(
    "producto de prueba: Se le setea un id por deafault para poder probar metodos readOne() y destroy()"
  );
  await product.create({
    title: "Producto prueba",
    photo: "sin foto",
    category: "test",
    price: 2000,
    stock: 25,
    id: "298791076a493adfb6a48ef4",
  });
  console.log("Metodo Read():");
  await product.read();
  console.log("\n\nMetodo ReadOne(), usamos producto de prueba:");
  console.log(await product.readOne("298791076a493adfb6a48ef4"));
  console.log("\n\nMetodo destroy(), usamos producto de prueba:");
  await product.destroy("298791076a493adfb6a48ef4");
  console.log(
    "\n\n Metodo read() nuevamente para verificar que se elimino el producto de prueba:"
  );
  await product.read();
}

async function create40products() {
  const product = new ProductManager();
  await product.create({
    title: "Galletas",
    photo: "galletas.jpg",
    category: "snack",
    price: 500,
    stock: 10,
  });
  await product.create({
    title: "Agua Mineral",
    photo: "agua.jpg",
    category: "bebida",
    price: 300,
    stock: 50,
  });
  await product.create({
    title: "Manzanas",
    photo: "manzanas.jpg",
    category: "fruta",
    price: 600,
    stock: 15,
  });
  await product.create({
    title: "Chocolate",
    photo: "chocolate.jpg",
    category: "dulce",
    price: 1000,
    stock: 8,
  });
  await product.create({
    title: "Leche",
    photo: "leche.jpg",
    category: "lácteo",
    price: 900,
    stock: 20,
  });
  await product.create({
    title: "Yogur",
    photo: "yogur.jpg",
    category: "lácteo",
    price: 700,
    stock: 15,
  });
  await product.create({
    title: "Hamburguesa",
    photo: "hamburguesa.jpg",
    category: "comida rápida",
    price: 1500,
    stock: 7,
  });
  await product.create({
    title: "Jugo de Naranja",
    photo: "jugo.jpg",
    category: "bebida",
    price: 800,
    stock: 30,
  });
  await product.create({
    title: "Cereal",
    photo: "cereal.jpg",
    category: "desayuno",
    price: 1200,
    stock: 10,
  });
  await product.create({
    title: "Papas Fritas",
    photo: "papas.jpg",
    category: "snack",
    price: 700,
    stock: 25,
  });
  await product.create({
    title: "Tomates",
    photo: "tomates.jpg",
    category: "verdura",
    price: 400,
    stock: 12,
  });
  await product.create({
    title: "Pescado",
    photo: "pescado.jpg",
    category: "mariscos",
    price: 2500,
    stock: 4,
  });
  await product.create({
    title: "Refresco de Lima",
    photo: "refresco.jpg",
    category: "bebida",
    price: 1000,
    stock: 20,
  });
  await product.create({
    title: "Huevos",
    photo: "huevos.jpg",
    category: "lácteo",
    price: 600,
    stock: 18,
  });
  await product.create({
    title: "Pizza",
    photo: "pizza.jpg",
    category: "comida rápida",
    price: 1800,
    stock: 6,
  });
  await product.create({
    title: "Caramelo",
    photo: "caramelo.jpg",
    category: "dulce",
    price: 200,
    stock: 50,
  });
  await product.create({
    title: "Sandwich",
    photo: "sandwich.jpg",
    category: "comida rápida",
    price: 900,
    stock: 15,
  });
  await product.create({
    title: "Zanahorias",
    photo: "zanahorias.jpg",
    category: "verdura",
    price: 300,
    stock: 20,
  });
  await product.create({
    title: "Té",
    photo: "te.jpg",
    category: "bebida",
    price: 600,
    stock: 40,
  });
  await product.create({
    title: "Pasta",
    photo: "pasta.jpg",
    category: "comida",
    price: 1100,
    stock: 8,
  });
  await product.create({
    title: "Café",
    photo: "cafe.jpg",
    category: "bebida",
    price: 450,
    stock: 40,
  });

  await product.create({
    title: "Croissant",
    photo: "croissant.jpg",
    category: "panadería",
    price: 700,
    stock: 20,
  });

  await product.create({
    title: "Ensalada César",
    photo: "ensalada.jpg",
    category: "ensalada",
    price: 1200,
    stock: 15,
  });

  await product.create({
    title: "Sushi",
    photo: "sushi.jpg",
    category: "comida",
    price: 2000,
    stock: 10,
  });

  await product.create({
    title: "Almendras",
    photo: "almendras.jpg",
    category: "fruto seco",
    price: 850,
    stock: 30,
  });

  await product.create({
    title: "Torta de Chocolate",
    photo: "torta.jpg",
    category: "postre",
    price: 1500,
    stock: 10,
  });

  await product.create({
    title: "Sopa de Verduras",
    photo: "sopa.jpg",
    category: "sopa",
    price: 600,
    stock: 20,
  });

  await product.create({
    title: "Pistachos",
    photo: "pistachos.jpg",
    category: "fruto seco",
    price: 900,
    stock: 25,
  });

  await product.create({
    title: "Hummus",
    photo: "hummus.jpg",
    category: "dip",
    price: 750,
    stock: 15,
  });

  await product.create({
    title: "Pastel de Carne",
    photo: "pastel.jpg",
    category: "comida",
    price: 1400,
    stock: 8,
  });
  await product.create({
    title: "Pancakes",
    photo: "pancakes.jpg",
    category: "desayuno",
    price: 800,
    stock: 20,
  });

  await product.create({
    title: "Sándwich de Pollo",
    photo: "sandwich_pollo.jpg",
    category: "comida rápida",
    price: 1000,
    stock: 15,
  });

  await product.create({
    title: "Aceitunas",
    photo: "aceitunas.jpg",
    category: "aperitivo",
    price: 600,
    stock: 30,
  });

  await product.create({
    title: "Tarta de Queso",
    photo: "tarta_queso.jpg",
    category: "postre",
    price: 1300,
    stock: 10,
  });

  await product.create({
    title: "Burritos",
    photo: "burritos.jpg",
    category: "comida rápida",
    price: 1200,
    stock: 12,
  });

  await product.create({
    title: "Sopa de Tomate",
    photo: "sopa_tomate.jpg",
    category: "sopa",
    price: 700,
    stock: 25,
  });

  await product.create({
    title: "Plátanos",
    photo: "platanos.jpg",
    category: "fruta",
    price: 300,
    stock: 40,
  });

  await product.create({
    title: "Ensalada de Frutas",
    photo: "ensalada_frutas.jpg",
    category: "ensalada",
    price: 900,
    stock: 15,
  });

  await product.create({
    title: "Empanadas",
    photo: "empanadas.jpg",
    category: "comida",
    price: 1100,
    stock: 8,
  });

  await product.create({
    title: "Pastel de Manzana",
    photo: "pastel_manzana.jpg",
    category: "postre",
    price: 1400,
    stock: 10,
  });
}


const productsManager = new ProductManager();
export default productsManager;
