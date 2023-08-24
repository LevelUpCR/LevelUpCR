const express = require("express");
const router = express.Router();

const preguntasController = require("../controllers/preguntasController");
const auth=require("../middleware/auth");

router.get("/",preguntasController.get);

router.post("/",auth.grantRole(['Cliente']),preguntasController.create);

router.get("/:id",preguntasController.getById);

//router.get("/:id",preguntasController.update);

module.exports = router;