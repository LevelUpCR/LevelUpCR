const express = require("express");
const router = express.Router();

const respuestasController = require("../controllers/respuestasController");

router.get("/",respuestasController.get);

router.get("/",respuestasController.create);

router.get("/:id",respuestasController.getById);

//router.get("/:id",respuestasController.update);

module.exports = router;