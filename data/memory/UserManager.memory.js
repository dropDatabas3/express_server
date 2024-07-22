class UserManager {
    static #user = []
    create(data) {
        try {
            const newUser = {
                email: data.email,
                password: data.password,
                role: data.role,
                photo: data.photo,
                id: UserManager.#user.length === 0
                    ? 1
                    : UserManager.#user[UserManager.#user.length - 1].id + 1
            }
            if (!data.email || !data.password || !data.role || !data.photo) {
                throw new Error(`Todos los campos de usuario deben ser obligatorios`)
            } else {
                UserManager.#user.push(newUser)
                console.log(`Se creo con exito el usuario "${data.email}". Su id es: ${newUser.id}`)
            }
        } catch (error) {
            console.error(error)
        }
    }
    read() {
        try {
            if (UserManager.#user.length === 0) {
                throw new Error(`No hay usuarios disponibles`)
            } else {
                console.log(UserManager.#user)
            }
        } catch (error) {
            console.error(error)
        }
    }

    readOne = (id) => {
        try {
            const user = UserManager.#user.length === 0
                ? (() => { throw new Error(`No hay usuarios disponibles`) })() //funcion anonima dentro del operador ternario ?:
                : UserManager.#user.find(user => user.id === id); // si existen usuarios, asignamos el usuario que concida con el id  
            if (!user) {
                throw new Error(`No se encontro usuarios con id ${id}`)
            } else {
                return user
            }
        } catch (error) {
            console.error(error)
        }
    }

    destroy = (id) => {
        const user = this.readOne(id) //corroboramos con readOne la existencia del usuario
        if (user) {
            UserManager.#user.splice(UserManager.#user.indexOf(user), 1);
            console.log(`Se elimino el usuario ${JSON.stringify(user)}`)
        }
    }
}