const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

//Obtener listado
module.exports.get = async (request, response, next) => {
    const pagos = await prisma.pagos.findMany({
        orderBy: {
            idPago: 'asc'
        },
        include:{
            tipoPago:true,
        }
    });
    response.json(pagos);
};

module.exports.getbyUsuario = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const pagos = await prisma.pagos.findMany({
        where: { usuarioId: id },
        orderBy: {
            idPago: 'asc'
        },
        include:{
            tipoPago:true,
        }
    });
    response.json(pagos);
};
//Obtener por Id
module.exports.getById = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const pago = await prisma.pagos.findUnique({
        where: { idPago: id },
        include:{
            tipoPago:true,
        }
    });
    response.json(pago);
};
//Crear un usuario
module.exports.create = async (request, response, next) => {
    let pago = request.body;
    pago.numTarjeta=parseInt(pago.numTarjeta)
    pago.numCuenta=parseInt(pago.numCuenta)
    pago.telefono=parseInt(pago.telefono)
    console.log(pago)
    const newPagos = await prisma.pagos.create({
        data: {
            numTarjeta: pago.numTarjeta,
            proveedor: pago.proveedor,
            numCuenta: pago.numCuenta,
            fechaExpiracion: pago.fechaExpiracion,
            nombre: pago.nombre,
            usuarioId: pago.usuarioId,
            tipoPagoId: pago.tipoPagoId,
        },
    });
    response.json(newPagos);
};
//Actualizar un usuario
module.exports.update = async (request, response, next) => {
};