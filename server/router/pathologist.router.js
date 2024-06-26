const router = require("express").Router();

const PathologistController = require("../controllers/pathologists.controller");

router.get("/pathologists", PathologistController.getPathologistUser);
router.get("/getpathologists", PathologistController.getPathologist);
router.get("/getpathologistbyemail/:email", PathologistController.getPathologistByEmail);
router.put("/pathologists/:email", PathologistController.updatePathologistByEmail);
router.get("/getlabreports", PathologistController.getlabreports);

module.exports = router;