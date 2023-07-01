const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

//Obtener listado
module.exports.get = async (request, response, next) => {
    const preguntas = await prisma.preguntas.findMany({
        orderBy: {
            idPregunta: 'asc'
        }
    });
    response.json(preguntas);
};
//Obtener por Id
module.exports.getById = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const pregunta = await prisma.preguntas.findUnique({
        where: { idPregunta: id }
    });
    response.json(pregunta);
};
//Crear un usuario
module.exports.create = async (request, response, next) => {
};
//Actualizar un usuario
module.exports.update = async (request, response, next) => {
};