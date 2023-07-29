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
    let pregunta = request.body;
    console.log(pregunta)
    const newPregunta = await prisma.preguntas.create({
        data: {
            pregunta: pregunta.pregunta,
            productoId: pregunta.productoId,
            usuarioId: pregunta.usuarioId
        },
    });
    response.json(newPregunta);
};
//Actualizar un usuario
module.exports.update = async (request, response, next) => {
    let pregunta = request.body;
    let idPregunta = parseInt(request.params.id);

    const preguntaVieja = await prisma.preguntas.findUnique({
        where: { id: idPregunta }
    });

    const newPregunta = await prisma.preguntas.update({
        where: {
            id: idPregunta
        },
        data: {
            pregunta: pregunta.pregunta,
            productoId: pregunta.productoId,
            usuarioId: pregunta.usuarioId
        },
    });
    response.json(newPregunta);
};