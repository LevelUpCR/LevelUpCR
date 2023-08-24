const express = require("express");
const router = express.Router();

const evaluacionController = require("../controllers/evaluacionController");
const auth=require("../middleware/auth");

router.get("/",evaluacionController.get);

/* router.get("/:id",evaluacionController.getById);*/
 
router.post("/", evaluacionController.create);

router.put("/:id", evaluacionController.update);

router.get("/cliente/:id",auth.grantRole(['Cliente']),evaluacionController.getByIdCliente);

router.get("/vendedor/:id",evaluacionController.getByIdVendedor);

router.get("/pedido/:id",evaluacionController.getByIdPedido);

router.get("/calificador/:id",evaluacionController.getByIdCalificador);

router.get("/calificado/:id",evaluacionController.getByIdCalificado);


module.exports = router;