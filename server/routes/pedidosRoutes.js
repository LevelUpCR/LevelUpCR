const express = require("express");
const router = express.Router();

const pedidosController = require("../controllers/pedidosController");
const auth=require("../middleware/auth");

router.get("/",pedidosController.get);

router.post("/",auth.grantRole(['Vendedor']),pedidosController.create);

router.get("/produped",pedidosController.getProductosPedidos);

router.get("/cantHoy",pedidosController.getGetPedidosHoy);

router.get("/mejorCliente/:id",pedidosController.getMejorCliente);

router.get("/masVendido/:id",pedidosController.getMasVendido);

router.get("/propedido/:id",pedidosController.getProPedbyPedido);

router.get("/:id",pedidosController.getById);

router.put("/upproduped",auth.grantRole(['Vendedor']),pedidosController.updateEstadoProdu);

router.put("/upped",auth.grantRole(['Vendedor']),pedidosController.updateEstadoPed);

router.get("/produped/:id",pedidosController.getProductosPedidosbyVendedor);

router.get("/pedidovendedor/:id",auth.grantRole(['Vendedor']),pedidosController.getPedidoById);

router.get("/cliente/:id",auth.grantRole(['Cliente']),pedidosController.getByIdUsuario);

router.get("/vendedor/:id",auth.grantRole(['Vendedor']),pedidosController.getByProductosxIdUsuario);

router.get("/vProducto/:mes", pedidosController.getVentaProductoMes);

module.exports = router;