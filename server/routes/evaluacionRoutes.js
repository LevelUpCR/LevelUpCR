const express = require("express");
const router = express.Router();

const evaluacionController = require("../controllers/evaluacionController");

router.get("/",evaluacionController.get);

/* router.get("/:id",evaluacionController.getById);*/
 
router.post("/", evaluacionController.create);

router.put("/:id", evaluacionController.update);

router.get("/cliente/:id",evaluacionController.getByIdCliente);

router.get("/vendedor/:id",evaluacionController.getByIdVendedor);

module.exports = router;