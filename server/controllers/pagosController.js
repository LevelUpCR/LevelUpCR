const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

//Obtener listado
module.exports.get = async (request, response, next) => {
    const pagos = await prisma.pagos.findMany({
        orderBy: {
            idPago: 'asc'
        }
    });
    response.json(pagos);
};
//Obtener por Id
module.exports.getById = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const pago = await prisma.pagos.findUnique({
        where: { idPago: id }
    });
    response.json(pago);
};
//Crear un usuario
module.exports.create = async (request, response, next) => {
};
//Actualizar un usuario
module.exports.update = async (request, response, next) => {
};