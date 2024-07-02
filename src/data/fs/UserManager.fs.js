import fs from "fs";

class UserManager {
  constructor() {
    this.path = "./src/data/fs/files/users.json";
    this.init();
  }

  init() {
    const checkExist = fs.existsSync(this.path);
    if (!checkExist) {
      const newFile = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, newFile);
      console.log("Archivo creado");
    } else {
      let checkArray = fs.readFileSync(this.path, "utf-8");
      if (checkArray.trim() === "") {
        console.error("El archivo no contiene un array");
        fs.unlinkSync(this.path);
        this.init();
      } else {
        console.log("El archivo ya existe");
      }
    }
  }
   //agregar paginate
  //agregar readByEmail

  async create(data) {
    try {
        // Leer y modificar la lista de usuarios
        let users = await fs.promises.readFile(this.path, "utf-8");
        users = JSON.parse(users);
        users.push(data);

        // Escribir en el archivo
        await fs.promises.writeFile(this.path, JSON.stringify(users, null, 2));
        return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async read(role) {
    try {
      let lista = await fs.promises.readFile(this.path, "utf-8");
      lista = JSON.parse(lista);
      role && // <-- Evaluamos si role es false
        (lista = lista.filter((each) => each.role == role)); // <-- En caso de ser true, filtramos la lista a solo los que tengan role = role
      return lista;
    } catch (error) {
      throw error;
    }
  }

  async readOne(id) {
    try {
      let lista = await this.read();
      let user = lista.find((each) => each.id === id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      let all = await this.read();
      let one = all.find((each) => each._id === id);
      if (one) {
        for (let prop in data) {
          one[prop] = data[prop];
        }
      } else {
        throw new Error("User not found!");
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
        throw new Error("User not found!");
      } else {
        let all = await fs.promises.readFile(this.path, "utf-8");
        all = JSON.parse(all).filter((each) => each.id !== one.id);
        await fs.promises.writeFile(this.path, JSON.stringify(all, null, 2));
        console.log("User with id ", one.id, " succesfully deleted");
        return one;
      }
    } catch (error) {
      throw error;
    }
  }
  async paginate({ filter, opts}) {
    try {
        let { page, limit } = opts;
        limit = parseInt(limit) || 10;
        page = parseInt(page) || 1;
        let users = await this.read();
        console.log("limit: ", limit)
        console.log("page: ", page)
        
        // Aplicar filtros
        users = users.filter(cart => {
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

        //console.log("users por key: ", users)
        const start = (page - 1) * limit;
        const end = start + limit;
        const paginatedusers = users.slice(start, end);
        //console.log("paginateusers: ", paginatedusers)

        const totalPages = Math.ceil(users.length / limit);
        return {
            docs: paginatedusers,
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
  async readByEmail(email) {
    try {
      let users = await this.read();
      let user = users.find((each) => each.email === email);
      return user;
    } catch (error) {
      throw error;
    }
  }
}

async function test() {
  const user = new UserManager();
  //await user.create({ email: 'juan@juan.com', password: 'contraseña1', role: '0', photo: 'sin foto' })
  //await user.create({ email: 'marcos@marcos.com', password: 'contraseña2', role: '1', photo: 'sin foto' })
  //await user.create({ email: 'luis@luis.com', password: 'contraseña3', role: '0', photo: 'foto.jpg' , id:'298791076a493adfb6a48ef4'})
  //await user.create({ email: 'agustina@agustina.com', password: 'contraseña4', role: '1', photo: 'sin foto' })
  await user.create({
    email: "tomas@tomas.com",
    password: "contraseña5",
    role: "0",
    photo: "foto.jpg",
  });
  console.log(
    "Tratamos de crear un usuario con password:null para verificar que se soliciten todos los campos"
  );
  await user.create({
    email: "tomas@tomas.com",
    password: null,
    role: "0",
    photo: "foto.jpg",
  });
  console.log(
    "Usuario de prueba: Se le setea un id por deafault para poder probar metodos readOne() y destroy()"
  );
  await user.create({
    email: "luis@luis.com",
    password: "contraseña3",
    role: "0",
    photo: "foto.jpg",
    id: "298791076a493adfb6a48ef4",
  });
  console.log("Metodo Read():");
  await user.read();
  console.log("\n\nMetodo ReadOne(), usamos user de prueba:");
  console.log(await user.readOne("298791076a493adfb6a48ef4"));
  console.log("\n\nMetodo destroy(), usamos user de prueba:");
  await user.destroy("298791076a493adfb6a48ef4");
  console.log(
    "\n\n Metodo read() nuevamente para verificar que se elimino el user de prueba:"
  );
  await user.read();
}
async function create4users() {
  const user = new UserManager();
  await user.create({
    email: "juan@juan.com",
    password: "contraseña1",
    role: "0",
    photo: "sin foto",
  });
  await user.create({
    email: "marcos@marcos.com",
    password: "contraseña2",
    role: "1",
    photo: "sin foto",
  });
  await user.create({
    email: "luis@luis.com",
    password: "contraseña3",
    role: "0",
    photo: "foto.jpg",
    id: "298791076a493adfb6a48ef4",
  });
  await user.create({
    email: "agustina@agustina.com",
    password: "contraseña4",
    role: "1",
    photo: "sin foto",
  });
}

const userManager = new UserManager();
export default userManager;
