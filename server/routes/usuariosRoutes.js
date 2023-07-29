const express = require("express");
const router = express.Router();

const usuariosController = require("../controllers/usuariosController");

router.get("/",usuariosController.get);

router.get("/:id",usuariosController.getById);

router.get("/:id",usuariosController.update);

router.post("/login", usuariosController.login);

router.post("/registrar", usuariosController.register);

module.exports = router;