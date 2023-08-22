const express = require("express");
const router = express.Router();
const multer = require('multer');

const fotosproductosController = require("../controllers/fotosproductosController");
const { error } = require("console");

const MYME_TYPE_MAP = {
  'image/png':'png',
  'image/jpeg':'jpg',
  'image/jpg':'jpg'
}
// Configurar el almacenamiento y la carpeta destino
/* const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './Images/');
    },
    filename: function (req, file, cb) {
      // Obtiene el nombre y la extensión de la imagen original
      const ext = file.originalname.toLowerCase.split(' ').join('-').split('.').pop();
      const fileName = `imagen-${Date.now()}.${ext}`;
      cb(null, fileName);
    }
}); */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = MYME_TYPE_MAP[file.mimetype];
    let error = new Error["Invalid mime type"];
    if(isValid){
      error=null;
    }
    cb(error, './Images/');
  },
  filename: function (req, file, cb) {
    // Obtiene el nombre y la extensión de la imagen original

    const name = file.originalname.toLowerCase.split(' ').join('-');
    const ext = MYME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

router.post("", multer(storage).single("image"), (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post success",
      postId: createdPost._id
    });
  });
});

const upload = multer({ storage });



router.get("/",fotosproductosController.get);
router.get("/:id",fotosproductosController.getById);
router.post('/',fotosproductosController.createFoto);


//Ruta Post, siempre poner despues del get
module.exports = router;