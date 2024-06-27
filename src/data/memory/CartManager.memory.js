class CartManager {
    static #cart = [];
  
    create(data) {
      try {
        const newCart = {
            user_id: data.user_id,
            product_id: data.product_id,
            quantity: data.quantity,
            state: data.state,
            id:
            CartManager.#cart.length === 0
              ? 1
              : CartManager.#cart[CartManager.#cart.length - 1].id +
                1,
        };
        if (
          !data.user_id ||
          !data.product_id ||
          !data.quantity ||
          !data.state
        ) {
          throw new Error(`Todos los campos de cart deben ser obligatorios`);
        } else {
            CartManager.#cart.push(newCart);
          console.log(
            `\nSe creo con exito el cart del usuario "${data.user_id}". Su id es: ${newCart.id}`
          );
        }
      } catch (error) {
        console.error(error);
      }
    }
    read() {
      try {
        if (CartManager.#cart.length === 0) {
          throw new Error(`No hay cart disponibles`);
        } else {
          console.log(CartManager.#cart);
        }
      } catch (error) {
        console.error(error);
      }
    }
    readOne = (id) => {
      try {
        const cart =
        CartManager.#cart.length === 0
            ? (() => {
                throw new Error(`No hay carritos disponibles`);
              })()
            : ProductManager.#cart.find((cart) => cart.id === id);
        if (!cart) {
          throw new Error(`No se encontro carritos con id ${id}`);
        } else {
          return cart;
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    update = (id, data) => {
      try {
        let all = this.read();
        let one = all.find((cart) => cart.id === id);
        if (one) {
          for (let prop in data) {
            one[prop] = data[prop];
          }
          console.log("carrito modificado");
        } else {
          throw new Error("No existe el carrito");
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    destroy = (id) => {
      const cart = this.readOne(id);
      if (cart) {
        CartManager.#cart.splice(
          CartManager.#cart.indexOf(cart),
          1
        );
        console.log(`Se elimino el producto ${JSON.stringify(cart)}`);
      }
    };
  }

  
  const cartManager = new CartManager();
  export default cartManager;