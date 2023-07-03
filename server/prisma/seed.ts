import { PrismaClient, Rol } from "@prisma/client";
import { tipoPago } from "./seeds/tipoPago";
import { estadoProducto } from "./seeds/estadoProducto";
import { categoriaProducto } from "./seeds/categoriaProducto";
import { estadoPedido } from "./seeds/estadoPedido";

const prisma = new PrismaClient();

async function main() {
   //Usuarios
    await prisma.usuarios.create({
        data: {
            nombre: 'Admin',
            telefono: 81818181,
            correo:'admin@admin.com',
            password:'123456',
            Rol: Rol.ADMIN
        }
    });
    //2
    await prisma.usuarios.create({
        data: {
            nombre: 'Luis Solera',
            telefono: 82828282,
            correo:'lsolera@cliente.com',
            password:'123456',
            Rol: Rol.Cliente
        }
    });
    //3
    await prisma.usuarios.create({
        data: {
            nombre: 'Israel Calvo',
            telefono: 83838383,
            correo:'icalvo@cliente.com',
            password:'123456',
            Rol: Rol.Cliente
        }
    });
    //4
    await prisma.usuarios.create({
        data: {
            nombre: 'Sony',
            telefono: 84848484,
            correo:'sony@vendedor.com',
            password:'123456',
            Rol: Rol.Vendedor
        }
    });
    //5
    await prisma.usuarios.create({
        data: {
            nombre: 'Nintendo',
            telefono: 85858585,
            correo:'nintendo@vendedor.com',
            password:'123456',
            Rol: Rol.Vendedor
        }
    });
    //6
    await prisma.usuarios.create({
        data: {
            nombre: 'Microsoft',
            telefono: 86868686,
            correo:'microsoft@vendedor.com',
            password:'123456',
            Rol: Rol.Vendedor
        }
    });
    //EstadoPedido
    await prisma.estado_Pedido.createMany({
        data: estadoPedido
    })
    //TipoPago
    await prisma.tipoPago.createMany({
        data: tipoPago
    }); 
    //EstadoProducto
    await prisma.estadoProducto.createMany({
        data: estadoProducto
    });
    await prisma.categoriaProducto.createMany({
        data: categoriaProducto
    });
    //Direccion
    //1
    await prisma.direccion.create({
        data: {
            provincia:              'Alajuela',
            canton:                 'Alajuela',
            distrito:               'Alajuela',
            direccionExacta:        'Alajuela',
            codigoPostal:           20101,
            telefono:               12345678,
            usuarioId:              1
        }
    });
    //2
    await prisma.direccion.create({
        data: {
            provincia:              'Heredia',
            canton:                 'Heredia',
            distrito:               'Heredia',
            direccionExacta:        'Heredia',
            codigoPostal:           30101,
            telefono:               12345678,
            usuarioId:              2
        }
    });
    //3
    await prisma.direccion.create({
        data: {
            provincia:              'San José',
            canton:                 'San José',
            distrito:               'San José',
            direccionExacta:        'San José',
            codigoPostal:           10101,
            telefono:               12345678,
            usuarioId:              3
        }
    });
    //Pagos
    //1
    await prisma.pagos.create({
        data: {
            nombre:                'Luis Solera',
            usuarioId:             1,
            tipoPagoId:            1
        }
    });
    //2
    await prisma.pagos.create({
        data: {
            nombre:                'Israel Calvo',
            usuarioId:             2,
            tipoPagoId:            3
        }
    });
    //3
    await prisma.pagos.create({
        data: {
            numTarjeta:            111,
            proveedor:             'Banco Nacional',
            fechaExpiracion:       new Date('2023-06-30'),
            nombre:                'Israel Calvo',
            usuarioId:             1,
            tipoPagoId:            2
        }
    });
    //4
    await prisma.pagos.create({
        data: {
            proveedor:             'Grupo Mutual',
            numCuenta:             112,
            nombre:                'Luis Solera',
            usuarioId:             1,
            tipoPagoId:            4
        }
    });
    //Productos
    //1
    await prisma.productos.create({
        data: {
            nombre:                 'PS5',
            descripcion:            'Consola de videojuegos',
            precio:                 500.00,
            cantidad:               1,
            //fotoId:                 1,
            categoriaId:            1,
            estadoProductoId:       1,
            usuarioId:              4
        }
    });
    //2
    await prisma.productos.create({
        data: {
            nombre:                 'Nintendo Switch',
            descripcion:            'Consola de videojuegos',
            precio:                 400.00,
            cantidad:               1,
            //fotoId:                 1,
            categoriaId:            3,
            estadoProductoId:       2,
            usuarioId:              5
        }
    });    
    //3
    await prisma.productos.create({
        data: {
            nombre:                 'XBOX Series X',
            descripcion:            'Consola de videojuegos',
            precio:                 450.00,
            cantidad:               1,
            //fotoId:                 1,
            categoriaId:            3,
            estadoProductoId:       2,
            usuarioId:              6
        }
    });
    //4
    await prisma.productos.create({
        data: {
            nombre:                 'Auriculares Pulse 3D',
            descripcion:            'Audifonos de Sony para la PS5',
            precio:                 69.99,
            cantidad:               10,
            //fotoId:                 1,
            categoriaId:            3,
            estadoProductoId:       1,
            usuarioId:              4
        }
    });
    //5
    await prisma.productos.create({
        data: {
            nombre:                 'Control DualSense Original White',
            descripcion:            'Control oficial para la PS5',
            precio:                 79.99,
            cantidad:               15,
            //fotoId:                 1,
            categoriaId:            3,
            estadoProductoId:       1,
            usuarioId:              4
        }
    });
    //6
    await prisma.productos.create({
        data: {
            nombre:                 'Control DualSense Midnight Black.',
            descripcion:            'Control oficial para la PS5',
            precio:                 79.99,
            cantidad:               15,
            //fotoId:                 1,
            categoriaId:            3,
            estadoProductoId:       1,
            usuarioId:              4
        }
    });
    //7
    await prisma.productos.create({
        data: {
            nombre:                 'Control DualSense Cosmic Red',
            descripcion:            'Control oficial para la PS5',
            precio:                 79.99,
            cantidad:               15,
            //fotoId:                 1,
            categoriaId:            3,
            estadoProductoId:       1,
            usuarioId:              4
        }
    });
    //8
    await prisma.productos.create({
        data: {
            nombre:                 'Control DualSense Nova Pink',
            descripcion:            'Control oficial para la PS5',
            precio:                 79.99,
            cantidad:               15,
            //fotoId:                 1,
            categoriaId:            3,
            estadoProductoId:       1,
            usuarioId:              4
        }
    });
    //9
    await prisma.productos.create({
        data: {
            nombre:                 'Control DualSense Starlight Blue',
            descripcion:            'Control oficial para la PS5',
            precio:                 79.99,
            cantidad:               15,
            //fotoId:                 1,
            categoriaId:            3,
            estadoProductoId:       1,
            usuarioId:              4
        }
    });
    //10
    await prisma.productos.create({
        data: {
            nombre:                 'Control DualSense Galactic Purple',
            descripcion:            'Control oficial para la PS5',
            precio:                 79.99,
            cantidad:               15,
            //fotoId:                 1,
            categoriaId:            3,
            estadoProductoId:       1,
            usuarioId:              4
        }
    });
    //Preguntas
    //1
    await prisma.preguntas.create({
        data: {
            pregunta:               '¿Colores disponibles?',
            productoId:             1,
            usuarioId:              1
        }
    });
    //2
    await prisma.preguntas.create({
        data: {
            pregunta:               '¿Cuáles son los principales juegos exclusivos de cada consola?',
            productoId:             3,
            usuarioId:              2
        }
    });
    //3
    await prisma.preguntas.create({
        data: {
            pregunta:               '¿Cuáles son los beneficios de elegir una consola portátil en lugar de una de sobremesa?',
            productoId:             2,
            usuarioId:              1
        }
    });
    //4
    await prisma.preguntas.create({
        data: {
            pregunta:               '¿Los audifonos se pueden usar via bluetooth?',
            productoId:             4,
            usuarioId:              1
        }
    });
    //Respuestas
    //1
    await prisma.respuestas.create({
        data: {
            respuesta:              'Solo disponible en blanco.',
            preguntaId:             1
        }
    });
    //2
    await prisma.respuestas.create({
        data: {
            respuesta:              'Algunas recomendaciones son Halo Infinite, Forza Horizon 5 o Fable.',
            preguntaId:             2
        }
    });
    //3
    await prisma.respuestas.create({
        data: {
            respuesta:              '¿Y hay disponibles en este momento?',
            preguntaId:             2
        }
    });
    //4
    await prisma.respuestas.create({
        data: {
            respuesta:              'Sí, hay disponibles de los 3.',
            preguntaId:             2
        }
    });
    //5
    await prisma.respuestas.create({
        data: {
            respuesta:              'La Nintendo Switch es tanto una consola de sobremesa, como portátil.',
            preguntaId:             3
        }
    });
    //Pedidos
    //1
    await prisma.pedidos.create({
        data:{
            pagoId:                 1,
            direccionId:            1,
            usuarioId:              1,
            estadoPedidoId:         1,
            total:                 400.00
        }
    });
    //2
    await prisma.pedidos.create({
        data:{
            pagoId:                 1,
            direccionId:            1,
            usuarioId:              1,
            estadoPedidoId:         1,
            total:                 450.00
        }
    });
    //3
    await prisma.pedidos.create({
        data:{
            pagoId:                 1,
            direccionId:            1,
            usuarioId:              1,
            estadoPedidoId:         1,
            total:                 500.00
        }
    });
    //Evaluacion
    //1
    await prisma.evaluacion.create({
        data:{
            calificacion:           5,
            comentario:             'Excelente.',
            usuarioId:              3,
            pedidoId:               2
        }
    });
    //2
    await prisma.evaluacion.create({
        data:{
            calificacion:           4,
            comentario:             'No todos los productos estaban disponibles.',
            usuarioId:              1,
            pedidoId:               1
        }
    });
    //3
    await prisma.evaluacion.create({
        data:{
            calificacion:           5,
            comentario:             'Excelente servicio al cliente',
            usuarioId:              2,
            pedidoId:               3
        }
    });
    //Pedidos_Productos
    //1
    await prisma.pedidos_Productos.create({
        data:{
            productoId:             1,
            pedidoId:               2
        }
    });
    //2
    await prisma.pedidos_Productos.create({
        data:{
            productoId:             2,
            pedidoId:               3
        }
    });
    //3
    await prisma.pedidos_Productos.create({
        data:{
            productoId:             3,
            pedidoId:               1
        }
    });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });