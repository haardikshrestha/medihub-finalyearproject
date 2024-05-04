const router = require("express").Router();

const HospitalController = require("../controllers/hospital.controller");

router.post("/newward", HospitalController.newWard);
router.get("/wards", HospitalController.getWards);
router.post("/deleteward", HospitalController.deleteWard);
router.get("/getdepartments", HospitalController.getallDepartments);
router.get("/getdepartmentnames", HospitalController.getdepartmentnames);
router.post("/addDepartment", HospitalController.addDepartment);
router.get("/getDepartmentsDistinct", HospitalController.getdisDepartment);
router.post("/surgeries", HospitalController.addSurgery);
router.get("/getsurgeries", HospitalController.getSurgery);


module.exports = router;