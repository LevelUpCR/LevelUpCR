const express = require("express");
const router = express.Router();

const preguntasController = require("../controllers/preguntasController");

router.get("/",preguntasController.get);

router.post("/",preguntasController.create);

router.get("/:id",preguntasController.getById);

//router.get("/:id",preguntasController.update);

module.exports = router;