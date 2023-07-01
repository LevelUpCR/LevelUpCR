const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

//Obtener listado
module.exports.get = async (request, response, next) => {
    const estado_productos = await prisma.estadoProducto.findMany({
        orderBy: {
            idEstado: 'asc'
        }
    });
    response.json(estado_productos);
};
//Obtener por Id
module.exports.getById = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const estado_producto = await prisma.estadoProducto.findUnique({
        where: { idEstado: id }
    });
    response.json(estado_producto);
};
//Crear un usuario
module.exports.create = async (request, response, next) => {
};
//Actualizar un usuario
module.exports.update = async (request, response, next) => {
};