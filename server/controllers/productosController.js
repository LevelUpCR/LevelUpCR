const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

//Obtener listado
module.exports.get = async (request, response, next) => {
    const productos = await prisma.productos.findMany({
      
        include:{
            usuarios:true
        },
        orderBy: {
            idProducto: 'asc'
        }
    });
    response.json(productos);
};
// Obtener por Id
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const producto = await prisma.productos.findUnique({
    where: { idProducto: id },
    include: {
      usuarios: true,
      categoria: true,
      estadoProducto: true,
      preguntas: {
        include: {
          respuestas: true
        }
      }
    }
  });
  response.json(producto);
};

//Obtener listado por IDUsuario
module.exports.getByIdUsuario = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const productos = await prisma.productos.findMany({
        where: { usuarioId: id },
        include:{
            usuarios:true
        },
        orderBy: {
            idProducto: 'asc'
        }
    });
    response.json(productos);
};
//Crear un usuario
module.exports.create = async (request, response, next) => {
};
//Actualizar un usuario
module.exports.update = async (request, response, next) => {
};