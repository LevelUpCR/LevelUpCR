const express = require("express");
const router = express.Router();

const usuariosController = require("../controllers/usuariosController");

router.get("/",usuariosController.get);

router.get("/",usuariosController.create);

router.get("/:id",usuariosController.getById);

router.get("/:id",usuariosController.update);

module.exports = router;