const fs = require('fs')
const crypto = require('crypto')
const { error } = require('console')

class ProductManager {
    constructor() {
        this.path = './files/products.json'
        this.init()
    }
    init() {
        const checkExist = fs.existsSync(this.path)
        if (!checkExist) {
            const newFile = JSON.stringify([], null, 2)
            fs.writeFileSync(this.path, newFile)
            console.log('archivo creado')
        } else {
            console.log('El archivo ya existe')
        }
    }
    async create(data) {
        try {
            if (!data.title || !data.price || !data.stock || !data.category || !data.photo) {
                throw new Error('Todos los campos son necesarios')
            } else {
                //CREO EL NUEVO PRODUCTO PARA LUEGO AGREGARLO A LA LISTA
                const newProduct = {
                    id: data.id || crypto.randomBytes(12).toString('hex'), //data.id para generar un producto de prueba para readOne(id) y destroy(id)
                    title: data.title,
                    photo: data.photo,
                    category: data.category,
                    price: data.price,
                    stock: data.stock,
                }
                //HAGO UNA COPIA DEL ARRAY DE PRODUCTS.JSON EN MI VARIABLE PRODUCTS
                let products = await fs.promises.readFile(this.path, "utf-8")
                products = JSON.parse(products)
                //AGREGO EL NUEVO PRODUCTO A LA COPIA DEL ARCHIVO
                products.push(newProduct)
                //SOBREESCRIBO EL ARCHIVO CON MI NUEVA INFORMACION
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))
                console.log(`producto '${data.title}' guardado correctamente`)
            }
        } catch (error) {
            console.error(error);
        }
    }
    async read() {
        try {
            let lista = await fs.promises.readFile(this.path, 'utf-8')
            lista = JSON.parse(lista)
            if (lista.length === 0) {
                throw new Error('No hay productos en la lista')
            } else {
                console.log(lista)
            }
        } catch (error) {
            console.error(error)
        }
    }
    async readOne(id) {
        try {
            let lista = await fs.promises.readFile(this.path, 'utf-8')
            lista = JSON.parse(lista)
            if (lista.length === 0) {
                throw new Error('No hay productos en la lista')
            } else {
                let product = lista.find((each) => each.id === id)
                if (!product) {
                    throw new Error('Producto no encontrado')
                } else {
                    return (product)
                }
            }
        } catch (error) {
            console.error(error)
        }
    }
    async destroy(id) {
        try {
            const one = await this.readOne(id)
            if (!one) {
                throw new Error('El producto no existe')
            } else {
                let all = await fs.promises.readFile(this.path, 'utf-8')
                all = JSON.parse(all).filter((each) => each.id !== one.id)
                await fs.promises.writeFile(this.path, JSON.stringify(all, null, 2))
                console.log('Se elimino el producto: ', one.id)
            }
        } catch (error) {
            console.error(error)
        }
    }
}

async function test() {
    const product = new ProductManager();

    await product.create({ title: 'Refresco', photo: 'sin foto', category: 'bebida', price: 1200, stock: 5 })
    await product.create({ title: 'Pan', photo: 'sin foto', category: 'comida', price: 200, stock: 25 })
    await product.create({ title: 'Cerveza', photo: 'sin foto', category: 'bebida', price: 1200, stock: 5 })
    await product.create({ title: 'Queso', photo: 'sin foto', category: 'comida', price: 200, stock: 25 })
    console.log('Tratamos de crear un producto con stock:null para verificar que se soliciten todos los campos')
    await product.create({ title: 'Chocolate', photo: 'sin foto', category: 'dulces', price: 1200, stock: null })
    console.log('producto de prueba: Se le setea un id por deafault para poder probar metodos readOne() y destroy()')
    await product.create(({ title: 'Producto prueba', photo: 'sin foto', category: 'test', price: 2000, stock: 25 , id: '298791076a493adfb6a48ef4'}))
    console.log('Metodo Read():')
    await product.read()
    console.log('\n\nMetodo ReadOne(), usamos producto de prueba:')
    console.log(await product.readOne('298791076a493adfb6a48ef4'))    
    console.log('\n\nMetodo destroy(), usamos producto de prueba:')
    await product.destroy('298791076a493adfb6a48ef4')
    console.log('\n\n Metodo read() nuevamente para verificar que se elimino el producto de prueba:')
    await product.read()
}


test()

