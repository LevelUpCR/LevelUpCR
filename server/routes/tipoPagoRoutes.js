const express = require("express");
const router = express.Router();

const tipoPagoController = require("../controllers/tipoPagoController");

router.get("/",tipoPagoController.get);

router.get("/:id",tipoPagoController.getById);

module.exports = router;