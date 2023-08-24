const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();

//Obtener listado
module.exports.get = async (request, response, next) => {
  const evaluaciones = await prisma.evaluacion.findMany({
    orderBy: {
      idEvaluacion: "asc",
    },
    include: {
      pedidos: {
        include: {
          productos: {
            include: {
              productos: {
                include: {
                  usuarios: true,
                },
              },
            },
          },
        },
      },
    },
  });
  response.json(evaluaciones);
};

//Obtener por Id de la evaluación
/* module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const evaluacion = await prisma.evaluacion.findUnique({
    where: { idEvaluacion: id },
    include: {
      pedidos: {
        include: {
          productos: {
            include: {
              productos: {
                include: {
                  usuarios: true,
                },
              },
            },
          },
        },
      },
    },
  });
  response.json(evaluacion);
}; */

module.exports.getByIdCliente = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const evaluacion = await prisma.evaluacion.findMany({
    where: {
      usuarioId: id,
    },
    include: {
      pedidos: {
        include: {
          productos: {
            include: {
              productos: {
                include: {
                  usuarios: true,
                },
              },
            },
          },
        },
      },
    },
  });
  response.json(evaluacion);
};

module.exports.getByIdVendedor = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const evaluacion = await prisma.evaluacion.findMany({
    where: {
      pedidos: {
        productos: {
          some: {
            productos: {
              usuarioId: id,
            },
          },
        },
      },
    },
    include: {
      pedidos: {
        include: {
          productos: {
            include: {
              productos: {
                include: {
                  usuarios: true,
                },
              },
            },
          },
        },
      },
    },
  });
  response.json(evaluacion);
};

module.exports.getByIdPedido = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const evaluacion = await prisma.evaluacion.findMany({
    where: {
      pedidoId:id
    },
  });

  response.json(evaluacion);
};
module.exports.getByIdCalificador = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const evaluacion = await prisma.evaluacion.findMany({
    where: {
      calificadorId:id
    },
  });

  response.json(evaluacion);
};

//Crear un usuario
module.exports.create = async (request, response, next) => {
  let evaluacion = request.body;

  const newEvaluacion = await prisma.evaluacion.create({
    data: {
      calificacion: parseFloat(evaluacion.calificacion),
      comentario: evaluacion.comentario,
      pedidoId: parseInt(evaluacion.pedidoId),
      calificadoId: parseInt(evaluacion.calificadoId),
      calificadorId: parseInt(evaluacion.calificadorId),
    },
  });
  response.json(newEvaluacion);
};

//Actualizar un usuario
module.exports.update = async (request, response, next) => {
  let evaluacion = request.body;
  let id = parseInt(request.params.id);

  const evaluacionVieja = await prisma.evaluacion.findUnique({
    where: {
      idEvaluacion: id,
    } /* 
        include:{
            usuarios: true
        } */,
  });

  const newEvaluacion = await prisma.evaluacion.update({
    where: {
      idEvaluacion: id,
    },
    data: {
      calificacion: evaluacion.calificacion,
      comentario: evaluacion.comentario,
      pedidoId: parseInt(evaluacion.pedidoId),
      usuarios: parseInt(evaluacion.usuarioId),
    },
  });
  response.json(newEvaluacion);
};


module.exports.top5Mejores = async (request, response, next) => {

 const result=await prisma.$queryRaw(
  Prisma.sql`SELECT usu.nombre, AVG(ev.calificacion) as promedio FROM usuarios usu JOIN _roletousuarios ru ON usu.idUsuario = ru.B JOIN evaluacion ev ON usu.idUsuario = ev.calificadoId WHERE ru.A = 3 GROUP BY usu.nombre ORDER BY promedio DESC LIMIT 5;`
  )

  response.json(result)
};

module.exports.top3Peores = async (request, response, next) => {

  const result=await prisma.$queryRaw(
   Prisma.sql`SELECT usu.nombre, AVG(ev.calificacion) as promedio FROM usuarios usu JOIN _roletousuarios ru ON usu.idUsuario = ru.B JOIN evaluacion ev ON usu.idUsuario = ev.calificadoId WHERE ru.A = 3 GROUP BY usu.nombre ORDER BY promedio ASC LIMIT 3;`
   )
 
   response.json(result)
 };

 module.exports.countCalificaciones = async (request, response, next) => {
  let usuarioId = parseInt(request.params.id); 
  console.log(usuarioId)
  const result=await prisma.$queryRaw(
   Prisma.sql`SELECT ev.calificacion, COUNT(ev.calificacion) as cantidad FROM evaluacion ev JOIN usuarios usu ON ev.calificadoId = usu.idUsuario WHERE usu.idUsuario = ${usuarioId} GROUP BY ev.calificacion;`
   )

   const serializedResults = result.map(result => ({
    calificacion: result.calificacion,
    cantidad: Number(result.cantidad) // Convertir BigInt a número entero
  }));
   response.json(serializedResults)
 };