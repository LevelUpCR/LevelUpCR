const { PrismaClient } = require('@prisma/client');
const express = require('express');
const path = require('path');


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
module.exports.createFoto= async (request, response, next) =>{
  /* let producto = request.body;
  const imagenes = request.files;
   // Guardar imágenes y crear registros de fotos
   if (imagenes && imagenes.length > 0) {
    const imagenesData = imagenes.map((url) => ({
      Foto: url.filename,
      idProducto: producto.idProducto,
    }));
    await prisma.foto.createMany({
      data: imagenesData,
    });
  }

    response.json(newFoto); */
  
}

