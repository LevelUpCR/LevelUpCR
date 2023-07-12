const express = require("express");
const router = express.Router();

const fotosproductosController = require("../controllers/fotosproductosController");

router.get("/",fotosproductosController.get);


//Ruta Post, siempre poner despues del get
router.post('/crearFoto', fotosproductosController.createFoto);
module.exports = router;