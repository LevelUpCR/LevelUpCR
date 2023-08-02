const { PrismaClient } = require('@prisma/client');
const express = require('express');

const prisma = new PrismaClient();
const app = express();

//Obtener listado
module.exports.get = async (request, response, next) => {
  const productos = await prisma.productos.findMany({
      include: {
          usuarios: true,
          fotosProductos: {
              take: 1 // Limitar a traer solo 1 registro de la tabla fotosProductos
          }
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
      precio: parseInt(producto.precio),
      cantidad: parseInt(producto.cantidad),
      categoriaId: parseInt(producto.categoria),
      estadoProductoId: parseInt(producto.estado),
      usuarioId: parseInt(producto.usuario)
    },
  });
  response.json(newProducto);
};

//Actualizar un usuario
module.exports.update = async (request, response, next) => {
  let producto = request.body;
  let idProduct = parseInt(request.params.id);

  const productoViejo = await prisma.productos.findUnique({
    where: { 
      idProducto: idProduct 
    }, // Use idProducto as the value for the id field
    include: {
      usuarios: true,
      categoria: true,
      estadoProducto: true,
      preguntas: {
        include: {
          respuestas: true
        }
      },
      fotosProductos: true
    }
  });

  const newProducto = await prisma.productos.update({
    where: {
      idProducto : idProduct
    },
    data: {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: parseInt(producto.precio),
      cantidad: parseInt(producto.cantidad),
      categoriaId: parseInt(producto.categoria),
      estadoProductoId: parseInt(producto.estado),
      usuarioId: parseInt(producto.usuario)
    },
  });
  response.json(newProducto);
};
