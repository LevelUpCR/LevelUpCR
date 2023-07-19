const express = require("express");
const router = express.Router();
const multer = require('multer');

const fotosproductosController = require("../controllers/fotosproductosController");

// Configurar el almacenamiento y la carpeta destino
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './Images/');
    },
    filename: function (req, file, cb) {
      // Obtiene el nombre y la extensión de la imagen original
      const ext = file.originalname.split('.').pop();
      const fileName = `imagen-${Date.now()}.${ext}`;
      cb(null, fileName);
    }
  });

  const upload = multer({ storage });

  router.post('/upload', upload.single('image'), fotosproductosController.createFoto);

router.get("/",fotosproductosController.get);


//Ruta Post, siempre poner despues del get
module.exports = router;