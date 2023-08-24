const express = require("express");
const router = express.Router();


const productosController = require("../controllers/productosController");
const auth=require("../middleware/auth");

router.get("/",productosController.get);

router.post("/",auth.grantRole(['Vendedor']),productosController.create);

router.get("/:id",productosController.getById);

router.put("/:id",auth.grantRole(['Vendedor']),productosController.update)

router.get("/vendedor/:id",auth.grantRole(['Vendedor']),productosController.getByIdUsuario);

router.get("/vendedor",auth.grantRole(["Vendedor"]),productosController.getByIdUsuario);

module.exports = router;