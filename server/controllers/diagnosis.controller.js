Diagnosis = require("../models/diagnosisSchema");

const newDiagnosis = () => async (req, res) => {
    console.log("ji")
  try {
    const {
      patientEmail,
      doctorEmail,
      symptoms,
      diagnosis,
      treatmentPlan,
      medicines,
    } = req.body;

    const newMedicines = medicines.map((medicine) => ({
      name: medicine.name,
      dosage: medicine.dosage,
      frequency: medicine.frequency,
      duration: medicine.duration
    }));

    const newDiagnosis = new Diagnosis({
      patientEmail,
      doctorEmail,
      symptoms,
      diagnosis,
      treatmentPlan,
      medicines: newMedicines,
    });

    await newDiagnosis.save();

    res
      .status(201)
      .json({
        message: "Diagnosis added successfully",
        diagnosis: newDiagnosis,
      });
  } catch (error) {
    console.error("Error adding diagnosis:", error);
    res.status(500).json({ error: "Error adding diagnosis" });
  }
};

const DiagnosisController = {
    newDiagnosis
};

module.exports = DiagnosisController;
