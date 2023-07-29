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
//Obtener listado por Usuario
module.exports.getbyUsuario = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const direcciones = await prisma.direccion.findMany({
        where: { usuarioId: id },
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
    let direccion = request.body;
    direccion.codigoPostal=parseInt(direccion.codigoPostal)
    direccion.telefono=parseInt(direccion.telefono)
    console.log(direccion)
    const newDireccion = await prisma.direccion.create({
        data: {
            provincia: direccion.provincia,
            canton: direccion.canton,
            distrito: direccion.distrito,
            direccionExacta: direccion.direccion,
            codigoPostal: direccion.codigoPostal,
            telefono: direccion.telefono,
            usuarioId: direccion.usuarioId
        },
    });
    response.json(newDireccion);
};
//Actualizar un usuario
module.exports.update = async (request, response, next) => {
};