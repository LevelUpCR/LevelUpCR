const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

//Obtener listado
module.exports.get = async (request, response, next) => {
    const tipoPagos = await prisma.tipoPago.findMany({
        orderBy: {
            idTipoPago: 'asc'
        }
    });
    response.json(tipoPagos);
};
//Obtener por Id
module.exports.getById = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const tipoPago = await prisma.tipoPago.findUnique({
        where: { idTipoPago: id }
    });
    response.json(tipoPago);
};
//Crear un usuario
module.exports.create = async (request, response, next) => {
};
//Actualizar un usuario
module.exports.update = async (request, response, next) => {
};