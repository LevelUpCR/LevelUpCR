const { PrismaClient } = require('@prisma/client');
const express = require('express');

const prisma = new PrismaClient();
const app = express();

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
      },
      fotosProductos:true
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
//Crear un producto
module.exports.create = async (request, response, next) => {
  let producto = request.body;
  const newProducto = await prisma.productos.create({
    data: {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      cantidad: producto.cantidad,
      categoriaId: producto.categoriaId,
      estadoProductoId: producto.estadoProductoId,
      usuarioId: usuarioId,
      usuarios: {
        connect: producto.usuarios
      },
    },
  });
  response.json(newProducto);
};

//Actualizar un usuario
module.exports.update = async (request, response, next) => {
  let producto = request.body;
  let idProducto = parseInt(request.params.id);

  const productoViejo = await prisma.productos.findUnique({
    where: { id: idProducto }
  });

  const newProducto = await prisma.productos.update({
    where: {
      id: idProducto
    },
    data: {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      cantidad: producto.cantidad,
      categoriaId: producto.categoriaId,
      estadoProductoId: producto.estadoProductoId,
      usuarioId: usuarioId,
      usuarios: {
        connect: producto.usuarios
      },
    },
  });
  response.json(newProducto);
};
