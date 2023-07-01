const express = require("express");
const router = express.Router();

const pedidosController = require("../controllers/pedidosController");

router.get("/",pedidosController.get);

router.get("/:id",pedidosController.getById);

module.exports = router;