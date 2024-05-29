const router = require("express").Router();
const HospitalController = require("../controllers/hospital.controller");

router.post("/newward", HospitalController.newWard);
router.get("/wards", HospitalController.getWards);
router.post("/deleteward", HospitalController.deleteWard);
router.get("/getdepartments", HospitalController.getallDepartments);
router.get("/getdepartmentnames", HospitalController.getdepartmentnames);
router.get("/getdepartment/:id", HospitalController.getDepartmentById); 
router.post("/addDepartment", HospitalController.addDepartment);
router.put("/editDepartment/:id", HospitalController.editDepartment); 
router.delete("/deleteDepartment/:id", HospitalController.deleteDepartment);
router.get("/getDepartmentsDistinct", HospitalController.getdisDepartment);
router.post("/surgeries", HospitalController.addSurgery);
router.get("/getsurgeries", HospitalController.getSurgery);
router.post('/addnote/:id', HospitalController.addNote);

module.exports = router;
