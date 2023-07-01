const express = require("express");
const router = express.Router();

const evaluacionController = require("../controllers/evaluacionController");

router.get("/",evaluacionController.get);

router.get("/:id",evaluacionController.getById);

module.exports = router;