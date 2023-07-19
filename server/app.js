const dotEnv = require('dotenv');
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { request, response } = require('express');
const cors = require('cors');
const logger = require('morgan');
const app = express();
const prism = new PrismaClient();
const multer = require('multer');
const path = require('path');


//---Archivos de rutas---
const catProductosRoutes = require('./routes/categoriaProductoRoutes');
const direccionRoutes = require('./routes/direccionRoutes');
const estadoProductoRoutes = require('./routes/estadoProductoRoutes');
const evaluacionRoutes = require('./routes/evaluacionRoutes');
const pagosRoutes = require('./routes/pagosRoutes');
const pedidosRoutes = require('./routes/pedidosRoutes');
const preguntasRoutes = require('./routes/preguntasRoutes');
const productosRoutes = require('./routes/productosRoutes');
const respuestasRoutes = require('./routes/respuestasRoutes');
const tipoPagoRoutes = require('./routes/tipoPagoRoutes');//10
const usuariosRoutes = require('./routes/usuariosRoutes');
const fotosproductosRoutes = require('./routes/fotosproductosRoutes');
app.use(express.static('./Images'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './Images/');
  },
  filename: function (req, file, cb) {
    // Obtiene el nombre y la extensión de la imagen original
    const ext = file.originalname.split('.').pop();
    const fileName = `imagen-${Date.now()}.${ext}`;
    cb(null, fileName);
  }
});

// Crea el middleware de multer
const upload = multer({ storage });

// Acceder a la configuracion del archivo .env
dotEnv.config();
// Puerto que escucha por defecto 3000 o definido .env
const port = process.env.PORT || 3000;
// Middleware CORS para aceptar llamadas en el servidor
app.use(cors());
// Middleware para loggear las llamadas al servidor
app.use(logger('dev'));
// Middleware para gestionar Requests y Response json
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
//---- Definir rutas ----
app.use("/categoriaproductos/", catProductosRoutes);
app.use("/direccion/", direccionRoutes);
app.use("/estadoproducto/", estadoProductoRoutes);
app.use("/evaluacion/", evaluacionRoutes);
app.use("/pagos/", pagosRoutes);
app.use("/pedidos/", pedidosRoutes);
app.use("/preguntas/", preguntasRoutes);
app.use("/productos/", productosRoutes);
app.use("/respuestas/", respuestasRoutes);
app.use("/tipopago/", tipoPagoRoutes);
app.use("/usuarios/", usuariosRoutes);
app.use("/fotosproductos/", fotosproductosRoutes);

// Servidor
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
  console.log('Presione CTRL-C para deternerlo\n');
});