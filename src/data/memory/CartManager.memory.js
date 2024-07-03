class CartManager {
    static #cart = [];
  
    create(data) {
      try {
          CartManager.#cart.push(data);
          return data
      } catch (error) {
        throw error
      }
    }
    read() {
      try {
        if (CartManager.#cart.length === 0) {
          throw new Error(`No hay cart disponibles`);
        } else {
          return CartManager.#cart;
        }
      } catch (error) {
        throw error
      }
    }
    readOne = (id) => {
      try {
        const cart =
        CartManager.#cart.length === 0
            ? (() => {
                throw new Error(`No hay carritos disponibles`);
              })()
            : ProductManager.#cart.find((cart) => cart._id === id);
        if (!cart) {
          throw new Error(`No se encontro carritos con id ${id}`);
        } else {
          return cart;
        }
      } catch (error) {
        throw error
      }
    };
  
    update = (id, data) => {
      try {
        let all = this.read();
        let one = all.find((cart) => cart._id === id);
        if (one) {
          for (let prop in data) {
            one[prop] = data[prop];
          }
          return one
        } else {
          throw new Error("No existe el carrito");
        }
      } catch (error) {
        throw error
      }
    };
  
    destroy = (id) => {
      try {
        const one = this.readOne(id);
        if (!one) {
          throw new Error("Carrito no encontrado");
        } else {
          let all = CartManager.#cart.filter((each) => each._id !== one.id);
          CartManager.#cart = all;
          console.log("Carrito con id ", one._id, " borrado con exito");
          return one;
        }
      } catch (error) {
        throw error
      }
    };

    paginate({ filter = {}, opts = {} }) {
      try {
        let { page, limit } = opts;
        limit = parseInt(limit) || 10;
        page = parseInt(page) || 1;
        let carts = this.read();
  
        // Aplicar filtros
        carts = carts.filter((cart) => {
          return Object.keys(filter).every((key) => {
            if (key in cart) {
              if (typeof filter[key] === "object" && filter[key] !== null) {
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
  
        const start = (page - 1) * limit;
        const end = start + limit;
        const paginatedCarts = carts.slice(start, end);
  
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
          nextPage: page < totalPages ? page + 1 : null,
        };
      } catch (error) {
        throw error;
      }
    }
  }

  
  const cartManager = new CartManager();
  export default cartManager;