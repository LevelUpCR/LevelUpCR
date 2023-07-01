const express = require("express");
const router = express.Router();

const categoriaProductosController = require("../controllers/categoriaProductosController");

router.get("/",categoriaProductosController.get);

router.get("/:id",categoriaProductosController.getById);

module.exports = router;