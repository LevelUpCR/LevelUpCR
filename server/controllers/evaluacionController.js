const { PrismaClient } = require("@prisma/client");

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
