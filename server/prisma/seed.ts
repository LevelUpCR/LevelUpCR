import { EstadoPedido, PrismaClient, TipoPago } from "@prisma/client";
import { usuarios } from "./seeds/usuarios";
import { tipoPago } from "./seeds/tipoPago";
import { estadoProducto } from "./seeds/estadoProducto";
import { categoriaProducto } from "./seeds/categoriaProducto";

const prisma = new PrismaClient();

async function main() {
   //Usuarios
    await prisma.usuarios.createMany({
        data: usuarios
    });
    //TipoPago
    await prisma.tipoPago.createMany({
        data: tipoPago
    });
    //EstadoProducto
    await prisma.estado_Producto.createMany({
        data: estadoProducto
    });
    await prisma.categoriaProducto.createMany({
        data: categoriaProducto
    });
    //Direccion
    //1
    await prisma.direccion.create({
        data: {
            provincia:              "Alajuela",
            canton:                 "Alajuela",
            distrito:               "Alajuela",
            direccionExacta:        "Alajuela",
            codigoPostal:           20101,
            telefono:               12345678,
            idUsuario:              1
        }
    });
    //2
    await prisma.direccion.create({
        data: {
            provincia:              "Heredia",
            canton:                 "Heredia",
            distrito:               "Heredia",
            direccionExacta:        "Heredia",
            codigoPostal:           30101,
            telefono:               12345678,
            idUsuario:              2
        }
    });
    //3
    await prisma.direccion.create({
        data: {
            provincia:              "San José",
            canton:                 "San José",
            distrito:               "San José",
            direccionExacta:        "San José",
            codigoPostal:           10101,
            telefono:               12345678,
            idUsuario:              3
        }
    });
    //Pagos
    //1
    await prisma.pagos.create({
        data: {
            nombre:                "Luis Solera",
            idUsuario:             1,
            idTipoPago:            1
        }
    });
    //2
    await prisma.pagos.create({
        data: {
            nombre:                "Israel Calvo",
            idUsuario:             2,
            idTipoPago:            3
        }
    });
    //3
    await prisma.pagos.create({
        data: {
            numTarjeta:            111,
            proveedor:             "Banco Nacional",
            fechaExpiracion:       new Date("2023-06-30"),
            nombre:                "Israel Calvo",
            idUsuario:             1,
            idTipoPago:            2
        }
    });
    //4
    await prisma.pagos.create({
        data: {
            proveedor:             "Grupo Mutual",
            numCuenta:             112,
            nombre:                "Luis Solera",
            idUsuario:             1,
            idTipoPago:            4
        }
    });
    //Productos
    //1
    await prisma.productos.create({
        data: {
            nombre:                 "PS5",
            descripcion:            "Consola de videojuegos",
            precio:                 500.00,
            cantidad:               1,
            //foto:                 ,
            idCategoria:            1,
            idEstadoProducto:       1,
            idUsuario:              1
        }
    });
    //2
    await prisma.productos.create({
        data: {
            nombre:                 "Nintendo Switch",
            descripcion:            "Consola de videojuegos",
            precio:                 400.00,
            cantidad:               1,
            //foto:                 ,
            idCategoria:            3,
            idEstadoProducto:       2,
            idUsuario:              2
        }
    });
    //Preguntas
    //1
    await prisma.preguntas.create({
        data: {
            pregunta:               "¿Colores disponibles?",
            idProducto:             1
        }
    });
    //Respuestas
    //1
    await prisma.respuestas.create({
        data: {
            respuesta:              "Rojo",
            idPregunta:             1
        }
    });
    //2
    await prisma.respuestas.create({
        data: {
            respuesta:              "Azul",
            idPregunta:             1
        }
    });
    //Pedidos
    //1
    await prisma.pedidos.create({
        data:{
            estadoPedido:           EstadoPedido.Recibido,
            total:                  1.00,
            idUsuario:              1
        }
    });
    //Evaluacion
    //1
    await prisma.evaluacion.create({
        data:{
            calificacion:           5,
            comentario:             "Excelente",
            idUsuario:              1,
            idPedido:               1
        }
    });
}