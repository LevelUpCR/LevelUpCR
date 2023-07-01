const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

//Obtener listado
module.exports.get = async (request, response, next) => {
    const usuarios = await prisma.usuarios.findMany({
        orderBy: {
            nombre: 'asc'
        }
    });
    response.json(usuarios);
};
//Obtener por Id
module.exports.getById = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const usuario = await prisma.usuarios.findUnique({
        where: { idUsuario: id }
    });
    response.json(usuario);
};
//Crear un usuario
module.exports.create = async (request, response, next) => {
};
//Actualizar un usuario
module.exports.update = async (request, response, next) => {
};
