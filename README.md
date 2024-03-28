# Servidor con Express

Implementación de un servidor utilizando Express, para la gestión de productos y usuarios. Se han desarrollado gestores para manejar los datos de productos y usuarios, permitiendo la creación, lectura, lectura individual y eliminación de recursos tanto en memoria como en archivos.
Para más información sobre los gestores, echa un vistazo al desafío: [Sprint2](https://github.com/juanp1996/servernode/tree/sprint2)

## Estructura de Datos

Cada producto y usuario posee propiedades específicas:

### Producto:
- **id**: Código identificador de 12 bytes en hexadecimal.
- **title**: Título del producto.
- **photo**: Ruta de la imagen del producto.
- **category**: Categoría del producto.
- **price**: Precio del producto.
- **stock**: Unidades disponibles del producto.

### Usuario:
- **id**: Código identificador de 12 bytes en hexadecimal.
- **photo**: Ruta de la imagen del usuario.
- **email**: Dirección de correo electrónico del usuario.
- **password**: Contraseña del usuario.
- **role**: Rol del usuario (por defecto cero).

## Funcionalidades Implementadas

Se han desarrollado las siguientes funcionalidades utilizando Express:

### Endpoints de Productos:
- `GET /api/products`: Permite obtener todos los productos almacenados. Se puede filtrar por categoría mediante una query. Si el array tiene productos, se devuelve un objeto con un código de estado `200` y la lista de productos en la propiedad "response". Si no hay productos, se devuelve un objeto con un código de estado `404` y un mensaje descriptivo.
- `GET /api/products/:pid`: Permite obtener un producto específico por su ID. Si se encuentra el producto, se devuelve un objeto con un código de estado `200` y el producto en la propiedad "response". Si no se encuentra, se devuelve un objeto con un código de estado `404` y un mensaje descriptivo.

### Endpoints de Usuarios:
- `GET /api/users`: Permite obtener todos los usuarios almacenados. Se puede filtrar por rol mediante una query. Si el array tiene usuarios, se devuelve un objeto con un código de estado `200` y la lista de usuarios en la propiedad "response". Si no hay usuarios, se devuelve un objeto con un código de estado `404` y un mensaje descriptivo.
- `GET /api/users/:uid`: Permite obtener un usuario específico por su ID. Si se encuentra el usuario, se devuelve un objeto con un código de estado `200` y el usuario en la propiedad "response". Si no se encuentra, se devuelve un objeto con un código de estado `404` y un mensaje descriptivo.

## Ejecución del Código

### Requisitos Previos
- Node.js instalado en el sistema.

### Pasos para Probar el Servidor
1. Clonar el repositorio o descargar el código fuente.
2. Instalar las dependencias del proyecto utilizando el comando `npm install`.
3. Iniciar el servidor con el comando `npm run dev` o `node server.js`.
4. Utilizar las siguientes URLs en un navegador web o realizar peticiones HTTP mediante herramientas como Postman:

   **Productos:**
   - Para obtener todos los productos: `http://localhost:8080/api/products`
   - Para filtrar por categoria (reemplazar `filtro` por la categoria): `http://localhost:8080/api/products?category=filtro`
   - Para obtener un producto específico (reemplazar `:pid` por el ID del producto): `http://localhost:8080/api/products/:pid`
     
    **Usuarios:**
   - Para obtener todos los usuarios: `http://localhost:8080/api/users`
   - Para filtrar por rol (reemplazar `filtro` por el rol): `http://localhost:8080/api/users?rol=filtro`
   - Para obtener un usuario específico (reemplazar `:uid` por el ID del usuario): `http://localhost:8080/api/users/:uid`
