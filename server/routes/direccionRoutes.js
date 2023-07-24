const express = require("express");
const router = express.Router();

const direccionController = require("../controllers/direccionController");

router.get("/",direccionController.get);
router.get("/usuario/:id",direccionController.getbyUsuario);

router.get("/:id",direccionController.getById);

module.exports = router;