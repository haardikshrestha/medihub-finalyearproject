const User = require("../models/userSchema");
const Doctors = require("../models/doctor-models/doctorschema");
const Patient = require("../models/patient-models/patientSchema");
const Ward = require("../models/hospital-models/wardSchema");
const Pathologist = require("../models/pathology-models/pathologistSchema");
const Department = require("../models/hospital-models/departmentSchema");
const Appointment = require("../models/patient-models/appointmentsSchema");
const Surgery = require("../models/doctor-models/surgerySchema");
const LabTest = require("../models/pathology-models/labtestSchema");
const TestResult = require("../models/pathology-models/testResultSchema");
const SampleCollection = require("../models/pathology-models/sampleCollectionSchema");
const InPatient = require("../models/patient-models/inPatientSchema");
const LabReport = require("../models/pathology-models/labReportSchema");
const Diagnosis = require("../models/diagnosisSchema.js");

const countStats = async (req, res) => {
    try {
        const stats = {
            users: await User.countDocuments(),
            doctors: await Doctors.countDocuments(),
            patients: await Patient.countDocuments(),
            wards: await Ward.countDocuments(),
            pathologists: await Pathologist.countDocuments(),
            departments: await Department.countDocuments(),
            appointments: await Appointment.countDocuments(),
            surgeries: await Surgery.countDocuments(),
            labTests: await LabTest.countDocuments(),
            testResults: await TestResult.countDocuments(),
            sampleCollections: await SampleCollection.countDocuments(),
            inPatients: await InPatient.countDocuments(),
            patientDiagnoses: await PatientDiagnosis.countDocuments(),
            labReports: await LabReport.countDocuments()
        };
        res.json(stats);
    } catch (error) {
        console.error("Error counting stats:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const countDataByPatientEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const stats = {
            appointments: await Appointment.countDocuments({ apptPatient: email }),
            diagnosis: await Diagnosis.countDocuments({ patientEmail: email }),
            labReports: await LabReport.countDocuments({ patientEmail: email })
        };
        res.json(stats);
    } catch (error) {
        console.error("Error counting data by patient email:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const countDataByDoctorEmail = async (req, res) => {
    try {
        const email = req.body.email;
        const stats = {
            appointments: await Appointment.countDocuments({ apptDoctor: email }),
            diagnosis: await Diagnosis.countDocuments({ doctorEmail: email }),
            labReports: await LabReport.countDocuments({ doctorEmail: email })
        };
        res.json(stats);
    } catch (error) {
        console.error("Error counting data by patient email:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const countSampleCollectionsByStatus = async (req, res) => {
    try {
        const statusCounts = await SampleCollection.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);
        const stats = {};
        statusCounts.forEach(({ _id, count }) => {
            stats[_id] = count;
        });
        res.json(stats);
    } catch (error) {
        console.error("Error counting sample collections by status:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const CounterController = {
    countStats,
    countDataByPatientEmail,
    countDataByDoctorEmail,
    countSampleCollectionsByStatus
};

module.exports = CounterController;
