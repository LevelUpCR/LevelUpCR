const express = require("express");
const router = express.Router();

const usuariosController = require("../controllers/usuariosController");

router.get("/",usuariosController.get);

router.get("/:id",usuariosController.getById);

module.exports = router;