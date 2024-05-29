import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

interface Medication {
  name: string;
  dosage: string;
  timeOfDay: string;
  beforeOrAfterEating: string;
}

interface DiagnosisFormProps {
  onCancel: () => void;
}

const DiagnosisForm: React.FC<DiagnosisFormProps> = ({ onCancel }) => {
  const [diagnosis, setDiagnosis] = useState("");
  const [medications, setMedications] = useState<Medication[]>([
    { name: "", dosage: "", timeOfDay: "", beforeOrAfterEating: "" },
  ]);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string>("");

  const handleMedicationChange = (
    index: number,
    key: keyof Medication,
    value: string
  ) => {
    const updatedMedications = [...medications];
    updatedMedications[index][key] = value;
    setMedications(updatedMedications);
  };

  const handleAddMedication = () => {
    setMedications([
      ...medications,
      { name: "", dosage: "", timeOfDay: "", beforeOrAfterEating: "" },
    ]);
  };

  const handleRemoveMedication = (index: number) => {
    const newMedications = [...medications];
    newMedications.splice(index, 1);
    setMedications(newMedications);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!diagnosis || !medications.every(isMedicationValid)) {
        setError("Please fill out all fields.");
        return;
      }
      const patientEmail = new URLSearchParams(window.location.search).get(
        "email"
      );
      const doctorEmail = localStorage.getItem("email");

      const diagnosisData = {
        patientEmail,
        doctorEmail,
        diagnosis,
        medications,
        notes,
      };

      const response = await axios.post(
        "http://localhost:5173/postdiagnosis",
        diagnosisData
      );
      console.log(response.data);

      setDiagnosis("");
      setMedications([
        { name: "", dosage: "", timeOfDay: "", beforeOrAfterEating: "" },
      ]);
      setNotes("");
      setError("");
      toast.success("Diagnosis Saved!")
    } catch (error) {
      console.error("Error submitting diagnosis:", error);
      setError("Error submitting diagnosis. Please try again.");
      toast.error("Failed to save diagnosis!")
    }
  };

  const isMedicationValid = (medication: Medication) =>
    medication.name && medication.dosage && medication.timeOfDay && medication.beforeOrAfterEating;

  return (
    <div className="bg-white rounded-lg border p-6 mt-5">
      <ToastContainer/>
      <h2 className="text-lg font-semibold mb-4">Add Diagnosis</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="diagnosis" className="block text-sm font-medium text-gray-700">
            Diagnosis
          </label>
          <input
            type="text"
            id="diagnosis"
            name="diagnosis"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter diagnosis"
            required
          />
        </div>
        {medications.map((medication, index) => (
          <div key={index} className="mb-4">
            <label
              htmlFor={`medication-${index}`}
              className="block text-sm font-medium text-gray-700"
            >
              Medication {index + 1}
            </label>
            <div className="flex">
              <input
                type="text"
                id={`medication-${index}`}
                name={`medication-${index}`}
                value={medication.name}
                onChange={(e) => handleMedicationChange(index, "name", e.target.value)}
                className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter medication"
                required
              />
              <select
                value={medication.dosage}
                onChange={(e) => handleMedicationChange(index, "dosage", e.target.value)}
                className="mt-1 ml-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                required
              >
                <option value="">Select dosage (mg)</option>
                <option value="100">100 mg</option>
                <option value="250">250 mg</option>
                <option value="500">500 mg</option>
              </select>
              <select
                value={medication.timeOfDay}
                onChange={(e) => handleMedicationChange(index, "timeOfDay", e.target.value)}
                className="mt-1 ml-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                required
              >
                <option value="">Time of the day</option>
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
                <option value="Night">Night</option>
              </select>
              <select
                value={medication.beforeOrAfterEating}
                onChange={(e) => handleMedicationChange(index, "beforeOrAfterEating", e.target.value)}
                className="mt-1 ml-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                required
              >
                <option value="">Before or after eating</option>
                <option value="Before">Before</option>
                <option value="After">After</option>
              </select>
              {index === medications.length - 1 ? (
                <button
                  type="button"
                  onClick={handleAddMedication}
                  className="ml-2 px-3 py-2 bg-gray-300 text-gray-700 rounded-lg focus:outline-none focus:bg-gray-400"
                >
                  +
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleRemoveMedication(index)}
                  className="ml-2 px-3 py-2 bg-red-500 text-white rounded-lg focus:outline-none focus:bg-red-600"
                >
                  -
                </button>
              )}
            </div>
          </div>
        ))}
        <div className="mb-4">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter notes"
            rows={4}
          />
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="mr-2 bg-gray-400 text-white px-4 py-2 rounded-lg focus:outline-none hover:bg-gray-500"
          >
            Cancel
          </button>
          <button type="submit" className="bg-[#8AC185] text-white px-4 py-2 rounded-lg focus:outline-none hover:bg-[#6E9E73]">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DiagnosisForm;

