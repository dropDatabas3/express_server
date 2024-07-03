class UserManager {
  static #user = [];
  create(data) {
    try {
      UserManager.#user.push(data);
      return data;
    } catch (error) {
      throw error;
    }
  }
  //agregar paginate
  //agregar readByEmail
  read(role) {
    try {
      if (UserManager.#user.length === 0) {
        throw new Error(`No hay usuarios disponibles`);
      } else {
        let lista = UserManager.#user;
        if (role) {
          lista = lista.filter((each) => each.role == role);
        }
        return lista;
      }
    } catch (error) {
      throw error;
    }
  }

  readOne = (id) => {
    try {
      const user =
        UserManager.#user.length === 0
          ? (() => {
              throw new Error(`No hay usuarios disponibles`);
            })() //funcion anonima dentro del operador ternario ?:
          : UserManager.#user.find((user) => user._id === id); // si existen usuarios, asignamos el usuario que concida con el id
      if (!user) {
        throw new Error(`No se encontro usuarios con id ${id}`);
      } else {
        return user;
      }
    } catch (error) {
      throw error;
    }
  };
  
  readByEmail(email) {
    try {
      const user = UserManager.#user.find((user) => user.email === email);
      return user;
    } catch (error) {
      throw error;
    }
  }

  update = (id, data) => {
    try {
      let all = this.read();
      let one = all.find((user) => user._id === id);
      if (one) {
        for (let prop in data) {
          one[prop] = data[prop];
        }
        console.log("Usuario modificado");
        return one
      } else {
        throw new Error("No existe el usuario");
      }
    } catch (error) {
      throw error;
    }
  };

  paginate({ filter = {}, page = 1, limit = 10 }) {
    try {
      let users = this.read();

      users = users.filter((user) => {
        return Object.keys(filter).every((key) => {
          if (key in user) {
            if (typeof filter[key] === 'object' && filter[key] !== null) {
              if (filter[key].$in && Array.isArray(filter[key].$in)) {
                return filter[key].$in.includes(user[key]);
              }
            } else {
              return user[key] === filter[key];
            }
          }
          return false;
        });
      });

      const start = (page - 1) * limit;
      const end = start + limit;
      const paginatedUsers = users.slice(start, end);

      const totalPages = Math.ceil(users.length / limit);
      return {
        docs: paginatedUsers,
        totalDocs: users.length,
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
  destroy = (id) => {
    try {
      const user = this.readOne(id); //corroboramos con readOne la existencia del usuario
      if (user) {
        UserManager.#user.splice(UserManager.#user.indexOf(user), 1);
        console.log(`Se elimino el usuario ${JSON.stringify(user)}`);
      }
      return user;
    } catch (error) {
      throw error;
    }
  };
}


const userManager = new UserManager();
export default userManager;