const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

//Obtener listado
module.exports.get = async (request, response, next) => {
    const catProductos = await prisma.categoriaProducto.findMany({
        orderBy: {
            idCategoria: 'asc'
        }
    });
    response.json(catProductos);
};
//Obtener por Id
module.exports.getById = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const catProducto = await prisma.categoriaProducto.findUnique({
        where: { idCategoria: id }
    });
    response.json(catProducto);
};
//Crear un usuario
module.exports.create = async (request, response, next) => {
};
//Actualizar un usuario
module.exports.update = async (request, response, next) => {
};