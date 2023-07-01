const express = require("express");
const router = express.Router();

const preguntasController = require("../controllers/preguntasController");

router.get("/",preguntasController.get);

router.get("/:id",preguntasController.getById);

module.exports = router;