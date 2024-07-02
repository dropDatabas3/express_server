import fs from "fs";
import crypto from "crypto";

class CartManager{
    constructor(){
        this.path = "./src/data/fs/files/carts.json";
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
            !data.user_id ||
            !data.product_id ||
            !data.quantity ||
            !data.state
          ) {
            throw new Error("All fields are required");
          } else {
            //CREO EL NUEVO CART PARA LUEGO AGREGARLO A LA LISTA
            const newCart = {
              id: data.id || crypto.randomBytes(12).toString("hex"),
              user_id: data.user_id,
              product_id: data.product_id,
              quantity: data.quantity,
              state: data.state,
            };
            //HAGO UNA COPIA DEL ARRAY DE CARTS.JSON EN MI VARIABLE CART
            let carts = await fs.promises.readFile(this.path, "utf-8");
            carts = JSON.parse(carts);
            //AGREGO EL NUEVO CART A LA COPIA DEL ARCHIVO
            carts.push(newCart);
            //SOBREESCRIBO EL ARCHIVO CON MI NUEVA INFORMACION
            await fs.promises.writeFile(
              this.path,
              JSON.stringify(carts, null, 2)
            );
            return newCart
          }
        } catch (error) {
          throw error
        }
      }
      async read() {
        try {
          let lista = await fs.promises.readFile(this.path, "utf-8");
          lista = JSON.parse(lista);
          return lista;
        } catch (error) {
          throw error;
        }
      }
      async readOne(id) {
        try {
          let lista = await fs.promises.readFile(this.path, "utf-8");
          lista = JSON.parse(lista);
          let cart = lista.find((each) => each.id === id);
          return cart;
        } catch (error) {
          throw error;
        }
      }
      async paginate({ filter, opts}) {
        try {
            let { page, limit } = opts;
            limit = parseInt(limit) || 10;
            page = parseInt(page) || 1;
            let carts = await this.read();
            console.log("limit: ", limit)
            console.log("page: ", page)
            
            // Aplicar filtros
            carts = carts.filter(cart => {
                return Object.keys(filter).every(key => {
                    if (key in cart) {
                        if (typeof filter[key] === 'object' && filter[key] !== null) {
                            if (filter[key].$in && Array.isArray(filter[key].$in)) {
                                return filter[key].$in.includes(cart[key]);
                            }
                        } else {
                            return cart[key] === filter[key];
                        }
                    }
                    return false;
                });
            });
    
            //console.log("carts por key: ", carts)
            const start = (page - 1) * limit;
            const end = start + limit;
            const paginatedCarts = carts.slice(start, end);
            //console.log("paginateCarts: ", paginatedCarts)
    
            const totalPages = Math.ceil(carts.length / limit);
            return {
                docs: paginatedCarts,
                totalDocs: carts.length,
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
      async update(id, data) {
        try {
          let all = await this.read();
          let one = all.find((each) => each.id === id);
          if (one) {
            for (let prop in data) {
              one[prop] = data[prop];
            }
          } else {
            throw new Error("Cart not found!");
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
            throw new Error("Cart not found!");
          } else {
            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all).filter((each) => each.id !== one.id);
            await fs.promises.writeFile(this.path, JSON.stringify(all, null, 2));
            console.log("Cart with id ", one.id, " successfully deleted:");
            return one;    
          }
        } catch (error) {
          throw error;
        }
      }
    }

const cartManager = new CartManager();
export default cartManager;