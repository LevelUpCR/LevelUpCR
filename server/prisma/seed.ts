import { PrismaClient } from "@prisma/client";
import { tipoPago } from "./seeds/tipoPago";
import { estadoProducto } from "./seeds/estadoProducto";
import { categoriaProducto } from "./seeds/categoriaProducto";
import { estadoPedido } from "./seeds/estadoPedido";
import { rol } from "./seeds/rol";

const prisma = new PrismaClient();

async function main() {
  //EstadoPedido
  await prisma.estado_Pedido.createMany({
    data: estadoPedido,
  });
  //Rol
  await prisma.rol.createMany({
    data: rol,
  });
  //TipoPago
  await prisma.tipoPago.createMany({
    data: tipoPago,
  });
  //EstadoProducto
  await prisma.estadoProducto.createMany({
    data: estadoProducto,
  });
  await prisma.categoriaProducto.createMany({
    data: categoriaProducto,
  });
  //Usuarios
  await prisma.usuarios.create({
    data: {
      cedula: 101010101,
      nombre: "Administrador",
      telefono: 81818181,
      correo: "admin@admin.com",
      password: "123456",
      roles: {
        connect: [{ idRol: 1 }, { idRol: 1 }],
      },
    },
  });
  //2
  await prisma.usuarios.create({
    data: {
      cedula: 202020202,
      nombre: "Luis Solera",
      telefono: 82828282,
      correo: "lsolera@cliente.com",
      password: "123456",
      roles: {
        connect: [{ idRol: 2 }, { idRol: 2 }],
      },
    },
  });
  //3
  await prisma.usuarios.create({
    data: {
      cedula: 117960190,
      nombre: "Israel Calvo",
      telefono: 83838383,
      correo: "icalvo@cliente.com",
      password: "123456",
      roles: {
        connect: [{ idRol: 2 }, { idRol: 2 }],
      },
    },
  });
  //4
  await prisma.usuarios.create({
    data: {
      cedula: 404040404,
      nombre: "Sony",
      telefono: 84848484,
      correo: "sony@vendedor.com",
      password: "123456",
      roles: {
        connect: [{ idRol: 3 }, { idRol: 3 }],
      },
    },
  });
  //5
  await prisma.usuarios.create({
    data: {
      cedula: 505050505,
      nombre: "Nintendo",
      telefono: 85858585,
      correo: "nintendo@vendedor.com",
      password: "123456",
      roles: {
        connect: [{ idRol: 3 }, { idRol: 3 }],
      },
    },
  });
  //6
  await prisma.usuarios.create({
    data: {
      cedula: 606060606,
      nombre: "Microsoft",
      telefono: 86868686,
      correo: "microsoft@vendedor.com",
      password: "123456",
      roles: {
        connect: [{ idRol: 3 }, { idRol: 3 }],
      },
    },
  });

  //Direccion
  //1
  await prisma.direccion.create({
    data: {
      provincia: "San José",
      canton: "San José",
      distrito: "San José",
      direccionExacta: "Del parque de la sabana 800 mts al sur",
      codigoPostal: 20101,
      telefono: 12345678,
      usuarioId: 1,
    },
  });
  //2
  await prisma.direccion.create({
    data: {
      provincia: "Heredia",
      canton: "Heredia",
      distrito: "Heredia",
      direccionExacta: "De Repuestos Gigante 200 mts al norte",
      codigoPostal: 30101,
      telefono: 12345678,
      usuarioId: 2,
    },
  });
  //3
  await prisma.direccion.create({
    data: {
      provincia: "Alajuela",
      canton: "Alajuela",
      distrito: "Alajuela",
      direccionExacta: "Del polideportivo de Monserrat 700 mts al oeste",
      codigoPostal: 10101,
      telefono: 12345678,
      usuarioId: 3,
    },
  });
  //Pagos
  //1
  await prisma.pagos.create({
    data: {
      nombre: "Luis Solera",
      usuarioId: 2,
      tipoPagoId: 1,
    },
  });
  //2
  await prisma.pagos.create({
    data: {
      nombre: "Israel Calvo",
      usuarioId: 3,
      tipoPagoId: 3,
    },
  });
  //3
  await prisma.pagos.create({
    data: {
      numTarjeta: 111,
      proveedor: "Banco Promerica",
      fechaExpiracion: new Date("2023-06-30"),
      nombre: "Israel Calvo",
      usuarioId: 3,
      tipoPagoId: 2,
    },
  });
  //4
  await prisma.pagos.create({
    data: {
      proveedor: "Grupo Mutual",
      numCuenta: 112,
      nombre: "Luis Solera",
      usuarioId: 2,
      tipoPagoId: 4,
    },
  });
  //5
  await prisma.pagos.create({
    data: {
      nombre: "Administrador",
      usuarioId: 1,
      tipoPagoId: 1,
    },
  });
  //Productos
  //1
  await prisma.productos.create({
    data: {
      nombre: "Bundle PS5 Spiderman 2",
      descripcion: "Consola de videojuegos de Sony",
      precio: 600.0,
      cantidad: 10,
      categoriaId: 1,
      estadoProductoId: 1,
      usuarioId: 4,
    },
  });

  //2
  await prisma.productos.create({
    data: {
      nombre: "Nintendo Switch",
      descripcion: "Consola de videojuegos de Nintendo en su version original",
      precio: 400.0,
      cantidad: 1,
      categoriaId: 3,
      estadoProductoId: 2,
      usuarioId: 5,
    },
  });
  //3
  await prisma.productos.create({
    data: {
      nombre: "XBOX Series X",
      descripcion: "Consola de videojuegos de ultima generacion de Microsoft",
      precio: 450.0,
      cantidad: 1,
      categoriaId: 3,
      estadoProductoId: 2,
      usuarioId: 6,
    },
  });
  //4
  await prisma.productos.create({
    data: {
      nombre: "Auriculares Pulse 3D",
      descripcion: "Audifonos de Sony para la PS5",
      precio: 69.99,
      cantidad: 10,
      categoriaId: 3,
      estadoProductoId: 1,
      usuarioId: 4,
    },
  });
  //5
  await prisma.productos.create({
    data: {
      nombre: "Covers PS5 Marvel´s Spider-Man 2",
      descripcion: "Covers oficiales para la PS5",
      precio: 79.99,
      cantidad: 15,
      categoriaId: 3,
      estadoProductoId: 1,
      usuarioId: 4,
    },
  });
  //6
  await prisma.productos.create({
    data: {
      nombre: "Control DualSense Marvel´s Spider-Man 2",
      descripcion: "Control oficial para la PS5",
      precio: 79.99,
      cantidad: 15,
      categoriaId: 3,
      estadoProductoId: 1,
      usuarioId: 4,
    },
  });
  //7
  await prisma.productos.create({
    data: {
      nombre: "Control DualSense Original White",
      descripcion: "Control oficial para la PS5",
      precio: 79.99,
      cantidad: 15,
      categoriaId: 3,
      estadoProductoId: 1,
      usuarioId: 4,
    },
  });
  //8
  await prisma.productos.create({
    data: {
      nombre: "Control DualSense Midnight Black.",
      descripcion: "Control oficial para la PS5",
      precio: 79.99,
      cantidad: 15,
      categoriaId: 3,
      estadoProductoId: 1,
      usuarioId: 4,
    },
  });
  //9
  await prisma.productos.create({
    data: {
      nombre: "Control DualSense Cosmic Red",
      descripcion: "Control oficial para la PS5",
      precio: 79.99,
      cantidad: 15,
      categoriaId: 3,
      estadoProductoId: 1,
      usuarioId: 4,
    },
  });
  //10
  await prisma.productos.create({
    data: {
      nombre: "Control DualSense Nova Pink",
      descripcion: "Control oficial para la PS5",
      precio: 79.99,
      cantidad: 15,
      categoriaId: 3,
      estadoProductoId: 1,
      usuarioId: 4,
    },
  });
  //11
  await prisma.productos.create({
    data: {
      nombre: "Control DualSense Starlight Blue",
      descripcion: "Control oficial para la PS5",
      precio: 79.99,
      cantidad: 15,
      categoriaId: 3,
      estadoProductoId: 1,
      usuarioId: 4,
    },
  });
  //12
  await prisma.productos.create({
    data: {
      nombre: "Control DualSense Galactic Purple",
      descripcion: "Control oficial para la PS5",
      precio: 79.99,
      cantidad: 15,
      categoriaId: 3,
      estadoProductoId: 1,
      usuarioId: 4,
    },
  });
  //13
  await prisma.productos.create({
    data: {
      nombre: "JoyCon Rojo/Azul Neón",
      descripcion: "Mandos para la Nintendo Switch",
      precio: 79.99,
      cantidad: 5,
      categoriaId: 3,
      estadoProductoId: 1,
      usuarioId: 4,
    },
  });
  //14
  await prisma.productos.create({
    data: {
      nombre: "Xbox Wirelles Controller",
      descripcion: "Mando oficial de Xbox Series X/S",
      precio: 79.99,
      cantidad: 5,
      categoriaId: 3,
      estadoProductoId: 1,
      usuarioId: 6,
    },
  });
  //15
  await prisma.productos.create({
    data: {
      nombre: "Marvel´s Spiderman Remastered",
      descripcion: "Juego de Spiderman de PS4 remasterizado para PS5",
      precio: 69.99,
      cantidad: 8,
      categoriaId: 3,
      estadoProductoId: 1,
      usuarioId: 4,
    },
  });
  //16
  await prisma.productos.create({
    data: {
      nombre: "PS5",
      descripcion: "Consola de videojuegos de Sony",
      precio: 500.0,
      cantidad: 1,
      categoriaId: 1,
      estadoProductoId: 1,
      usuarioId: 4,
    },
  });
  //17
  await prisma.productos.create({
    data: {
      nombre: "Marvel´s Spiderman Remastered",
      descripcion: "Juego de Spiderman de PS4 remasterizado para PS5",
      precio: 69.99,
      cantidad: 8,
      categoriaId: 3,
      estadoProductoId: 1,
      usuarioId: 4,
    },
  });
  //Preguntas
  //1
  await prisma.preguntas.create({
    data: {
      pregunta: "¿Colores disponibles?",
      productoId: 16,
      usuarioId: 3,
    },
  });
  //2
  await prisma.preguntas.create({
    data: {
      pregunta:
        "¿Cuáles son los principales juegos exclusivos de cada consola?",
      productoId: 3,
      usuarioId: 2,
    },
  });
  //3
  await prisma.preguntas.create({
    data: {
      pregunta:
        "¿Cuáles son los beneficios de elegir una consola portátil en lugar de una de sobremesa?",
      productoId: 2,
      usuarioId: 3,
    },
  });
  //4
  await prisma.preguntas.create({
    data: {
      pregunta: "¿Los audifonos se pueden usar via bluetooth?",
      productoId: 4,
      usuarioId: 2,
    },
  });
  //5
  await prisma.preguntas.create({
    data: {
      pregunta: "¿Y hay disponibles en este momento?",
      productoId: 3,
      usuarioId: 2,
    },
  });
  //Respuestas
  //1
  await prisma.respuestas.create({
    data: {
      respuesta: "Solo disponible en blanco.",
      preguntaId: 1,
    },
  });
  //2
  await prisma.respuestas.create({
    data: {
      respuesta:
        "Algunas recomendaciones son Halo Infinite, Forza Horizon 5 o Fable.",
      preguntaId: 2,
    },
  });

  //3
  await prisma.respuestas.create({
    data: {
      respuesta: "Sí, hay disponibles de los 3.",
      preguntaId: 5,
    },
  });
  //4
  await prisma.respuestas.create({
    data: {
      respuesta:
        "La Nintendo Switch es tanto una consola de sobremesa, como portátil.",
      preguntaId: 3,
    },
  });
  //Pedidos
  //1
  await prisma.pedidos.create({
    data: {
      pagoId: 1,
      direccionId: 1,
      usuarioId: 1,
      estadoPedidoId: 1,
      total: 529.99,
    },
  });
  //2
  await prisma.pedidos.create({
    data: {
      pagoId: 1,
      direccionId: 1,
      usuarioId: 1,
      estadoPedidoId: 2,
      total: 819.97,
    },
  });
  //3
  await prisma.pedidos.create({
    data: {
      pagoId: 1,
      direccionId: 1,
      usuarioId: 1,
      estadoPedidoId: 1,
      total: 479.99,
    },
  });
  //Evaluacion
  //1
  await prisma.evaluacion.create({
    data: {
      calificacion: 5,
      comentario: "Excelente.",
      usuarioId: 3,
      pedidoId: 2,
    },
  });
  //2
  await prisma.evaluacion.create({
    data: {
      calificacion: 4,
      comentario: "No todos los productos estaban disponibles.",
      usuarioId: 1,
      pedidoId: 1,
    },
  });
  //3
  await prisma.evaluacion.create({
    data: {
      calificacion: 5,
      comentario: "Excelente servicio al cliente",
      usuarioId: 2,
      pedidoId: 3,
    },
  });
  //Pedidos_Productos
  //2
  await prisma.pedidos_Productos.create({
    data: {
      productoId: 1,
      pedidoId: 2,
      cantidad: 1,
      estadoPedidoId: 2,
    },
  });

  await prisma.pedidos_Productos.create({
    data: {
      productoId: 4,
      pedidoId: 2,
      cantidad: 1,
      estadoPedidoId: 2,
    },
  });
  await prisma.pedidos_Productos.create({
    data: {
      productoId: 15,
      pedidoId: 2,
      cantidad: 1,
      estadoPedidoId: 2,
    },
  });
  await prisma.pedidos_Productos.create({
    data: {
      productoId: 13,
      pedidoId: 2,
      cantidad: 1,
      estadoPedidoId: 2,
    },
  });
  //3
  await prisma.pedidos_Productos.create({
    data: {
      productoId: 2,
      pedidoId: 3,
      cantidad: 2,
      estadoPedidoId: 1,
    },
  });
  await prisma.pedidos_Productos.create({
    data: {
      productoId: 13,
      pedidoId: 3,
      cantidad: 2,
      estadoPedidoId: 1,
    },
  });
  //1
  await prisma.pedidos_Productos.create({
    data: {
      productoId: 3,
      pedidoId: 1,
      cantidad: 1,
      estadoPedidoId: 1,
    },
  });
  await prisma.pedidos_Productos.create({
    data: {
      productoId: 14,
      pedidoId: 1,
      cantidad: 1,
      estadoPedidoId: 1,
    },
  });

  await prisma.fotos_Productos.create({
    data: {
      Foto: "PS5.jpg",
      idProducto: 16,
    },
  });
  await prisma.fotos_Productos.create({
    data: {
      Foto: "PS5 2.jpg",
      idProducto: 16,
    },
  });
  await prisma.fotos_Productos.create({
    data: {
      Foto: "Switch.jpg",
      idProducto: 2,
    },
  });
  await prisma.fotos_Productos.create({
    data: {
      Foto: "Xbox.jpg",
      idProducto: 3,
    },
  });
  await prisma.fotos_Productos.create({
    data: {
      Foto: "Bundle PS5 Spiderman 2.jpg",
      idProducto: 1,
    },
  });
  await prisma.fotos_Productos.create({
    data: {
      Foto: "Bundle PS5 Spiderman 2 2.jpg",
      idProducto: 1,
    },
  });
  await prisma.fotos_Productos.create({
    data: {
      Foto: "Bundle PS5 Spiderman 2 3.jpg",
      idProducto: 1,
    },
  });
  await prisma.fotos_Productos.create({
    data: {
      Foto: "Bundle PS5 Spiderman 2 4.jpg",
      idProducto: 1,
    },
  });

  await prisma.fotos_Productos.create({
    data: {
      Foto: "Covers PS5 Spiderman 2.jpg",
      idProducto: 5,
    },
  });
  await prisma.fotos_Productos.create({
    data: {
      Foto: "Covers PS5 Spiderman 2 2.jpg",
      idProducto: 5,
    },
  });
  await prisma.fotos_Productos.create({
    data: {
      Foto: "Covers PS5 Spiderman 2 3.jpg",
      idProducto: 5,
    },
  });
  await prisma.fotos_Productos.create({
    data: {
      Foto: "DualSense Spiderman 2.jpg",
      idProducto: 6,
    },
  });
  await prisma.fotos_Productos.create({
    data: {
      Foto: "DualSense Spiderman 2 2.jpg",
      idProducto: 6,
    },
  });
  await prisma.fotos_Productos.create({
    data: {
      Foto: "DualSense Spiderman 2 3.jpg",
      idProducto: 6,
    },
  });
  await prisma.fotos_Productos.create({
    data: {
      Foto: "DualSense Spiderman 2 4.jpg",
      idProducto: 6,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
