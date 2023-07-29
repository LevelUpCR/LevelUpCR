const express = require("express");
const router = express.Router();

const pagosController = require("../controllers/pagosController");

router.get("/",pagosController.get);
router.post("/",pagosController.create);
router.get("/usuario/:id",pagosController.getbyUsuario);

router.get("/:id",pagosController.getById);

module.exports = router;