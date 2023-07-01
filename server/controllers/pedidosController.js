const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

//Obtener listado
module.exports.get = async (request, response, next) => {
    const pedidos = await prisma.pedidos.findMany({
        orderBy: {
            idPedido: 'asc'
        }
    });
    response.json(pedidos);
};
//Obtener por Id
module.exports.getById = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const pedido = await prisma.pedidos.findUnique({
        where: { idPedido: id }
    });
    response.json(pedido);
};
//Crear un usuario
module.exports.create = async (request, response, next) => {
};
//Actualizar un usuario
module.exports.update = async (request, response, next) => {
};