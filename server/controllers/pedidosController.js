const { PrismaClient,Prisma } = require("@prisma/client");

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

module.exports.getGetPedidosHoy = async (request, response, next) => {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0); // Set UTC time to the start of the day
  const tomorrow = new Date(today);
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1); // Get the start of the next UTC day

  const pedidosHoy = await prisma.pedidos.findMany({
    where: {
      fechaCompra: {
        gte: today.toISOString(),
        lt: tomorrow.toISOString(),
      },
    },
  });

  response.json(pedidosHoy);
};








module.exports.getProductosPedidos = async (request, response, next) => {
  const productos = await prisma.pedidos_Productos.findMany({
    include: {
      productos: true,
    },
    orderBy: [
      {
        pedidoId: 'asc',    // Orden ascendente por pedidoId
      },
      {
        productoId: 'asc',   // Orden ascendente por productoId
      },
    ],
  });
  response.json(productos);
};

module.exports.getProductosPedidosbyVendedor = async (request, response, next) => {

    let id = parseInt(request.params.id);
    const productos = await prisma.pedidos_Productos.findMany({
      where: {
        productos: {
          usuarioId: id,
        },
      },
      include:{
        productos:{
          include:{
            usuarios:true,
          }
        },
        pedidos:true,
      },
      orderBy: [
        {
          pedidoId: 'asc',    // Orden ascendente por pedidoId
        },
        {
          productoId: 'asc',   // Orden ascendente por productoId
        },
      ],
    });
    response.json(productos);

};

module.exports.getProPedbyPedido = async (request, response, next) => {
  console.log(request.params.id);
  let id = parseInt(request.params.id);
  const productos = await prisma.pedidos_Productos.findMany({
    where: {
      pedidoId:id
    },
    include:{
      productos:{
        include:{
          usuarios:true,
        }
      },
    },
    orderBy: [
      {
        pedidoId: 'asc',    // Orden ascendente por pedidoId
      },
      {
        productoId: 'asc',   // Orden ascendente por productoId
      },
    ],
  });
  console.log(productos);
  response.json(productos);

};

//Actualizar un usuario
module.exports.updateEstadoProdu = async (request, response, next) => {
  let produPed = request.body;
  console.log(produPed)

  
  const newproduPed = await prisma.pedidos_Productos.update({
      where: {
        pedidoId_productoId: {
          pedidoId: produPed.pedidoId,
          productoId: produPed.productoId,
        },
      },
      data: {
        estadoPedidoId:2
      },
      include:{
        productos:{
          include:{
            usuarios:true,
          }
        },
        pedidos:true,
      },
  });
  console.log(newproduPed);
  response.json(newproduPed);
};
module.exports.updateEstadoPed = async (request, response, next) => {
  let pedido = request.body;
  console.log(pedido.estadopedido)

  
  const newPedido = await prisma.pedidos.update({
      where: {
        idPedido: pedido.idPedido,
      },
      data: {
        estadoPedidoId:pedido.estadoPedidoId
      },
      
  });
  console.log(newPedido);
  response.json(newPedido);
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

module.exports.getVentaProductoMes = async (request, response, next) => {
  let mes = parseInt(request.params.mes); 

  
 const result=await prisma.$queryRaw(
  Prisma.sql`Select pro.nombre, SUM(pp.cantidad) as suma FROM pedidos ped, pedidos_productos pp, productos pro WHERE ped.idPedido=pp.pedidoId and pp.productoId=pro.idProducto and month(ped.fechaCompra) = ${mes} group by pp.productoId ORDER BY suma DESC limit 5`
  )
  console.log(result)
  response.json(result)
};

module.exports.getMejorCliente = async (request, response, next) => {
  let usuarioId = parseInt(request.params.id); 

  
 const result=await prisma.$queryRaw(
  Prisma.sql`SELECT usu.nombre, SUM(pp.cantidad) AS suma FROM usuarios usu JOIN pedidos ped ON usu.idUsuario = ped.usuarioId JOIN pedidos_productos pp ON ped.idPedido = pp.pedidoId JOIN productos pro ON pp.productoId = pro.idProducto WHERE pro.usuarioId = ${usuarioId} GROUP BY usu.nombre ORDER BY suma DESC Limit 1;`
  )
  console.log(result)
  response.json(result)
};


module.exports.getMasVendido = async (request, response, next) => {
  let usuarioId = parseInt(request.params.id); 

  
 const result=await prisma.$queryRaw(
  Prisma.sql`Select pro.*, SUM(pp.cantidad) as suma FROM pedidos ped, pedidos_productos pp, productos pro WHERE ped.idPedido=pp.pedidoId and pp.productoId=pro.idProducto and pro.usuarioId = ${usuarioId} group by pp.productoId ORDER BY suma DESC limit 1;`
  )
  console.log(result)
  response.json(result)
};


//Actualizar un usuario
module.exports.update = async (request, response, next) => {};
