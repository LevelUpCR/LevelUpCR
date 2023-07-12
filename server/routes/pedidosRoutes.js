const express = require("express");
const router = express.Router();

const pedidosController = require("../controllers/pedidosController");

router.get("/",pedidosController.get);
router.get("/:id",pedidosController.getById);
router.get("/pedidovendedor/:id",pedidosController.getPedidoById);
router.get("/cliente/:id",pedidosController.getByIdUsuario);
router.get("/vendedor/:id",pedidosController.getByProductosxIdUsuario);


module.exports = router;