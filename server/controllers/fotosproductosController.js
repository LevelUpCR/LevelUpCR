const { PrismaClient } = require('@prisma/client');
const express = require('express');

const prisma = new PrismaClient();
const app = express();

//Obtener listado
module.exports.get = async (request, response, next) => {
    const fotosproductos = await prisma.fotos_Productos.findMany({
        orderBy: {
          idFoto: 'asc'
        }
    });
    response.json(fotosproductos);
};




//Guardar Imagenes
module.exports.createFoto = async (request, response, next) => {
  console.log(request.body.imagen);
  
};

