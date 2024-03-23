# Gestión de Productos y Usuarios

Este proyecto implementa un sistema de gestión de productos y usuarios utilizando `Node.js` y el módulo FileSystem (`fs`) de forma asíncrona, aprovechando las funcionalidades de `async/await` y `promises` para garantizar un flujo de ejecución eficiente y no bloqueante.

## Estructura de Datos

Cada producto tiene las siguientes propiedades:
- ***id*** (código identificador de 12 bytes en hexadecimal)
- ***title*** (título)
- ***photo*** (ruta de imagen)
- ***category*** (categoría)
- ***price*** (precio)
- ***stock*** (unidades disponibles)

Cada usuario tiene las siguientes propiedades:
- ***id*** (código identificador de 12 bytes en hexadecimal)
- ***photo*** (ruta de imagen)
- ***email***
- ***password***
- ***role*** (rol de usuario)

## Clases ProductManager y UserManager

Las clases `ProductManager` y `UserManager` cuentan con los siguientes métodos:

- `init()`: Se utiliza para inicializar el sistema de archivos y asegurarse de que el archivo de datos exista y esté en el formato adecuado.
- `create(data)`: Agrega un nuevo producto o usuario al sistema.
- `read()`: Devuelve una lista de todos los productos o usuarios almacenados.
- `readOne(id)`: Devuelve un producto o usuario específico según su ID.
- `destroy(id)`: Elimina un producto o usuario según su ID.

Estos métodos manejan errores utilizando `try/catch`.

## Uso del Código

Para utilizar las clases `ProductManager` y `UserManager`, puedes seguir el siguiente ejemplo:

```javascript
const productManager = new ProductManager();

// Ejemplo de creación de un producto
productManager.create({
    title: 'Producto de Ejemplo',
    photo: 'ruta/a/la/foto.jpg',
    category: 'Ejemplo',
    price: 100,
    stock: 10
});

// Ejemplo de lectura de todos los productos
productManager.read();

// Ejemplo de lectura de un producto específico
const product = productManager.readOne('ID_DEL_PRODUCTO');

// Ejemplo de eliminación de un producto
productManager.destroy('ID_DEL_PRODUCTO');
```
```javascript
const userManager = new UserManager();

// Ejemplo de creación de un usuario
userManager.create({
    email: 'usuario@prueba.com',
    password: 'password',
    role: 1,
    photo: './ruta/imagen.jpg'
});

// Ejemplo de lectura de todos los usuarios
userManager.read();

// Ejemplo de lectura de un usuario específico
const user = userManager.readOne('ID_DEL_USUARIO');

// Ejemplo de eliminación de un usuario
userManager.destroy('ID_DEL_USUARIO');
```
