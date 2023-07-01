const express = require("express");
const router = express.Router();

const estadoProductoController = require("../controllers/estadoProductoController");

router.get("/",estadoProductoController.get);

router.get("/:id",estadoProductoController.getById);

module.exports = router;