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

//Crear una respuesta
module.exports.create = async (request, response, next) => {
    let respuesta = request.body;
    const newPregunta = await prisma.respuestas.create({
        data: {
            respuesta: respuesta.respuesta,
            preguntaId: respuesta.preguntaId
        },
    });
};

/* //Actualizar una respuesta
module.exports.update = async (request, response, next) => {
    let respuesta = request.body;
    let idRespuesta = parseInt(request.params.id);

    const respuestaViejo = await prisma.respuestas.findUnique({
        where: { id: idRespuesta },
    });

    const newRespuesta = await prisma.respuestas.update({
        where: {
            id: idRespuesta
        },
        data: {
            respuesta: respuesta.respuesta,
            preguntaId: respuesta.preguntaId
        },
    });
    response.json(newRespuesta);
}; */