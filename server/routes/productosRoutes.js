const express = require("express");
const router = express.Router();

const productosController = require("../controllers/productosController");

router.get("/",productosController.get);


router.get("/:id",productosController.getById);
router.get("/vendedor/:id",productosController.getByIdUsuario);
router.get("/vendedor",productosController.getByIdUsuario);

module.exports = router;