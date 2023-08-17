const express = require("express");
const router = express.Router();

const direccionController = require("../controllers/direccionController");

router.get("/",direccionController.get);
router.get("/provincia",direccionController.getProvincia)
router.get("/canton/:id",direccionController.getCanton)
router.get("/distrito/:idpro/:idcan",direccionController.getDistrito)
router.post("/",direccionController.create);
router.get("/usuario/:id",direccionController.getbyUsuario);

router.get("/:id",direccionController.getById);



module.exports = router;