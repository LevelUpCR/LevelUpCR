const express = require("express");
const router = express.Router();

const pedidosController = require("../controllers/pedidosController");

router.get("/",pedidosController.get);

router.post("/", pedidosController.create);
router.get("/produped",pedidosController.getProductosPedidos);
router.get("/cantHoy",pedidosController.getGetPedidosHoy);
router.get("/mejorCliente/:id",pedidosController.getMejorCliente);
router.get("/masVendido/:id",pedidosController.getMasVendido);
router.get("/propedido/:id",pedidosController.getProPedbyPedido);
router.get("/:id",pedidosController.getById);
router.put("/upproduped",pedidosController.updateEstadoProdu);
router.put("/upped",pedidosController.updateEstadoPed);
router.get("/produped/:id",pedidosController.getProductosPedidosbyVendedor);
router.get("/pedidovendedor/:id",pedidosController.getPedidoById);
router.get("/cliente/:id",pedidosController.getByIdUsuario);
router.get("/vendedor/:id",pedidosController.getByProductosxIdUsuario);
router.get("/vProducto/:mes", pedidosController.getVentaProductoMes);

module.exports = router;