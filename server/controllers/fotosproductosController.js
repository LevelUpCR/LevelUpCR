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
  try {
    if (!request.file) {
      return response.status(400).send('No se ha seleccionado una imagen');
    }

    const imageUrl = path.join('/Images/', request.file.filename);
    return response.status(200).json({ imageUrl });
  } catch (error) {
    console.error('Error al subir la imagen:', error);
    return response.status(500).send('Error al subir la imagen');
  }
}

