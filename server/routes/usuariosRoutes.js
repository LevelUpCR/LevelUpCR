const express = require("express");
const router = express.Router();

const usuariosController = require("../controllers/usuariosController");
const auth=require("../middleware/auth")

router.get("/",auth.grantRole(['ADMIN']),usuariosController.get);

router.post("/",usuariosController.register);

router.get("/:id",auth.grantRole(['ADMIN','Cliente','Vendedor']),usuariosController.getById);

router.put("/:id",auth.grantRole(['ADMIN']),usuariosController.update);

router.put("/disable/:id",auth.grantRole(['ADMIN']),usuariosController.disabled);

router.post("/login", usuariosController.login);

router.post("/registrar", usuariosController.register);

module.exports = router;