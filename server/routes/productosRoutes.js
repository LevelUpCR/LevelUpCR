const express = require("express");
const router = express.Router();

const productosController = require("../controllers/productosController");

router.get("/",productosController.get);

router.get("/:id",productosController.getById);

module.exports = router;