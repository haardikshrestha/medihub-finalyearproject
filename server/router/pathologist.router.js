const router = require("express").Router();

const PathologistController = require("../controllers/pathologists.controller");

router.get("/pathologists", PathologistController.getPathologistUser);
router.get("/getpathologists", PathologistController.getPathologist);


module.exports = router;