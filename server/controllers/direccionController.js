const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

//Obtener listado
module.exports.get = async (request, response, next) => {
    const direcciones = await prisma.direccion.findMany({
        orderBy: {
            idDireccion: 'asc'
        }
    });
    response.json(direcciones);
};
//Obtener por Id
module.exports.getById = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const direccion = await prisma.direccion.findUnique({
        where: { idDireccion: id }
    });
    response.json(direccion);
};
//Crear un usuario
module.exports.create = async (request, response, next) => {
};
//Actualizar un usuario
module.exports.update = async (request, response, next) => {
};