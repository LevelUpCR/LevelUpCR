const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

//Obtener listado
module.exports.get = async (request, response, next) => {
    const evaluaciones = await prisma.evaluacion.findMany({
        orderBy: {
            idEvaluacion: 'asc'
        }
    });
    response.json(evaluaciones);
};
//Obtener por Id
module.exports.getById = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const evaluacion = await prisma.evaluacion.findUnique({
        where: { idEvaluacion: id }
    });
    response.json(evaluacion);
};
//Crear un usuario
module.exports.create = async (request, response, next) => {
};
//Actualizar un usuario
module.exports.update = async (request, response, next) => {
};