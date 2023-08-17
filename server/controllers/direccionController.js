const { PrismaClient } = require('@prisma/client');
const axios = require('axios');

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

module.exports.getProvincia = async (request, response, next) => {
    const axios = require('axios'); // Import the axios library if not already imported
    
    const apiUrl = 'https://levelupcr.github.io/APIProvinciasCR/CRAPI.json';
  
    try {
        const apiResponse = await axios.get(apiUrl);
        const dataFromApi = apiResponse.data;

        // Extract the list of provinces
        const provincesList = Object.keys(dataFromApi.provincias).map(provinceId => {
            const province = dataFromApi.provincias[provinceId];
            return {
                id: provinceId,
                nombre: province.nombre
            };
        });

        response.json(provincesList);
    } catch (error) {
        console.error('Error:', error);
        response.status(500).json({ error: 'An error occurred while fetching data.' });
    }
};

module.exports.getCanton = async (request, response, next) => {
    const provinciaNombre = request.params.id; // Obtén el nombre de la provincia del request
    const axios = require('axios'); // Importa la biblioteca axios si aún no está importada

    const apiUrl = 'https://levelupcr.github.io/APIProvinciasCR/CRAPI.json';
  
    try {
        const apiResponse = await axios.get(apiUrl);
        const dataFromApi = apiResponse.data;

        // Busca la provincia por su nombre en el objeto 'provincias'
        const provinciaSeleccionada = Object.values(dataFromApi.provincias).find(provincia => provincia.nombre === provinciaNombre);

        if (!provinciaSeleccionada) {
            return response.status(404).json({ error: 'Provincia seleccionada no encontrada.' });
        }

        // Extrae la lista de cantones para la provincia seleccionada
        const listaDeCantones = Object.keys(provinciaSeleccionada.cantones).map(cantonId => {
            const canton = provinciaSeleccionada.cantones[cantonId];
            return {
                id: cantonId,
                nombre: canton.nombre
            };
        });

        response.json(listaDeCantones);
    } catch (error) {
        console.error('Error:', error);
        response.status(500).json({ error: 'Se produjo un error al obtener los datos.' });
    }
};



module.exports.getDistrito = async (request, response, next) => {
    const provinciaNombre = request.params.idpro;
    const cantonNombre = request.params.idcan;
    const axios = require('axios'); // Importa la biblioteca axios si aún no está importada

    const apiUrl = 'https://levelupcr.github.io/APIProvinciasCR/CRAPI.json';
  
    try {
        const apiResponse = await axios.get(apiUrl);
        const dataFromApi = apiResponse.data;

        // Busca la provincia por su nombre en el objeto 'provincias'
        const provinciaSeleccionada = Object.values(dataFromApi.provincias).find(provincia => provincia.nombre === provinciaNombre);

        if (!provinciaSeleccionada) {
            return response.status(404).json({ error: 'Provincia seleccionada no encontrada.' });
        }

        // Busca el cantón por su nombre en los cantones de la provincia seleccionada
        const cantonSeleccionado = Object.values(provinciaSeleccionada.cantones).find(canton => canton.nombre === cantonNombre);

        if (!cantonSeleccionado) {
            return response.status(404).json({ error: 'Cantón seleccionado no encontrado.' });
        }

        // Extrae la lista de distritos para el cantón seleccionado
        const listaDeDistritos = Object.keys(cantonSeleccionado.distritos).map(distritoId => {
            const distritoNombre = cantonSeleccionado.distritos[distritoId];
            return {
                id: distritoId,
                nombre: distritoNombre
            };
        });

        response.json(listaDeDistritos);
    } catch (error) {
        console.error('Error:', error);
        response.status(500).json({ error: 'Se produjo un error al obtener los datos.' });
    }
};
