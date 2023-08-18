const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

//Obtener listado
module.exports.get = async (request, response, next) => {
  const productos = await prisma.pedidos.findMany({
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
  response.json(productos);
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
module.exports.create = async (request, response, next) => {
  let infoOrden = request.body;

  const newVideoJuego = await prisma.pedidos.create({
    data: {
      fechaCompra: infoOrden.fechaOrden,
      usuarioId: infoOrden.otros.usuarioId,
      estadoPedidoId: 1,
      direccionId: infoOrden.otros.direccion,
      pagoId: infoOrden.otros.metodo,
      total: infoOrden.total,
      productos: {
        createMany: {
          data: infoOrden.productos
        }
      }
    }
  });

  // Update the product quantities based on infoOrden.productos
  for (const producto of infoOrden.productos) {
    await prisma.productos.update({
      where: { idProducto: producto.productoId }, // Assuming "productoId" is the unique identifier for the product
      data: {
        cantidad: {
          decrement: producto.cantidad // Subtract the ordered quantity from the current quantity
        }
      }
    });
  }

  response.json(newVideoJuego);
};


//Actualizar un usuario
module.exports.update = async (request, response, next) => {};
