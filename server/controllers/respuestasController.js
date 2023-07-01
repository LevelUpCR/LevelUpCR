const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

//Obtener listado
module.exports.get = async (request, response, next) => {
    const respuestas = await prisma.respuestas.findMany({
        orderBy: {
            idRespuesta: 'asc'
        }
    });
    response.json(respuestas);
};
//Obtener por Id
module.exports.getById = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const respuesta = await prisma.respuestas.findUnique({
        where: { idRespuesta: id }
    });
    response.json(respuesta);
};
//Crear un usuario
module.exports.create = async (request, response, next) => {
};
//Actualizar un usuario
module.exports.update = async (request, response, next) => {
};