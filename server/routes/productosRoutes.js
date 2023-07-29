const express = require("express");
const router = express.Router();


const productosController = require("../controllers/productosController");
const auth=require("../middleware/auth")

router.get("/",productosController.get);

//router.get("/",productosController.create);

router.get("/:id",productosController.getById);

//router.get("/vendedor/:id",productosController.update)

router.get("/vendedor/:id",auth.grantRole(["ADMIN"]),productosController.getByIdUsuario);

router.get("/vendedor",auth.grantRole(["ADMIN"]),productosController.getByIdUsuario);

module.exports = router;