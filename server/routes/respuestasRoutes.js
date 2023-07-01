const express = require("express");
const router = express.Router();

const respuestasController = require("../controllers/respuestasController");

router.get("/",respuestasController.get);

router.get("/:id",respuestasController.getById);

module.exports = router;