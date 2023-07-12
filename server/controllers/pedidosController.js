const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

//Obtener listado
module.exports.get = async (request, response, next) => {
  const pedidos = await prisma.pedidos.findMany({
    orderBy: {
      idPedido: "asc",
    },
  });
  response.json(pedidos);
};
//Obtener por Id
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const pedido = await prisma.pedidos.findUnique({
    where: { idPedido: id },
    include: {
      usuarios: true,
      direcciones: true,
      estadoPedido: true,
      pagos: {
        include: {
          tipoPago: true,
        },
      },
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
  });
  response.json(pedido);
};

module.exports.getPedidoById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  let idUser = 4; // parseInt(request.params.idUser);
  const pedido = await prisma.pedidos.findUnique({
    where: { idPedido: id },
    include: {
      usuarios: true,
      direcciones: true,
      estadoPedido: true,
      pagos: {
        include: {
          tipoPago: true,
        },
      },
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
  });
  response.json(pedido);
};

//Obtener listado por IDUsuario
module.exports.getByIdUsuario = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const pedidos = await prisma.pedidos.findMany({
    where: { usuarioId: id },
    include: {
      usuarios: true,
      estadoPedido: true,
      productos: {
        include: {
          productos: true,
        },
      },
    },
    orderBy: {
      idPedido: "asc",
    },
  });
  response.json(pedidos);
};

module.exports.getByProductosxIdUsuario = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const pedidos = await prisma.pedidos.findMany({
    where: {
      productos: {
        some: {
          productos: {
            usuarioId: id,
          },
        },
      },
    },
    include: {
      usuarios: true,
      estadoPedido: true,
      productos: {
        include: {
          productos: {
            include: {
              usuarios: true
            }
          }
        },
      },
    },
    orderBy: {
      idPedido: "asc",
    },
  });
  response.json(pedidos);
};


//Crear un usuario
module.exports.create = async (request, response, next) => {};
//Actualizar un usuario
module.exports.update = async (request, response, next) => {};
