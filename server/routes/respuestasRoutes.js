const express = require("express");
const router = express.Router();

const respuestasController = require("../controllers/respuestasController");
const auth=require("../middleware/auth");

router.get("/",respuestasController.get);

router.post("/",auth.grantRole(['Vendedor']),respuestasController.create);

router.get("/:id",respuestasController.getById);

//router.get("/:id",respuestasController.update);

module.exports = router;