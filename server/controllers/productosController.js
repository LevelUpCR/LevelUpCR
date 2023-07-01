const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

//Obtener listado
module.exports.get = async (request, response, next) => {
    const productos = await prisma.productos.findMany({
        orderBy: {
            idProducto: 'asc'
        }
    });
    response.json(productos);
};
//Obtener por Id
module.exports.getById = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const producto = await prisma.productos.findUnique({
        where: { idProducto: id }
    });
    response.json(producto);
};
//Crear un usuario
module.exports.create = async (request, response, next) => {
};
//Actualizar un usuario
module.exports.update = async (request, response, next) => {
};