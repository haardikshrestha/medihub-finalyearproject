import React, { useState } from 'react';


interface AppointmentFormData {
  apptID: string;
  apptDate: string;
  apptPatient: string;
  apptTime: string;
  apptDoctor: string;
  apptStatus: string;
  apptDisease: string;
  paymentStatus: string;
  transactionID: string;
}

const AppointmentForm = () => {
  const [formData, setFormData] = useState<AppointmentFormData>({
    apptID: '',
    apptDate: '',
    apptPatient: '',
    apptTime: '',
    apptDoctor: '',
    apptStatus: '',
    apptDisease: '',
    paymentStatus: '',
    transactionID: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setFormData({
      apptID: '',
      apptDate: '',
      apptPatient: '',
      apptTime: '',
      apptDoctor: '',
      apptStatus: '',
      apptDisease: '',
      paymentStatus: '',
      transactionID: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apptID">
          Appointment ID
        </label>
        <input
          type="text"
          name="apptID"
          value={formData.apptID}
          onChange={handleChange}
          placeholder="Appointment ID"
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apptDate">
          Appointment Date
        </label>
        <input
          type="text"
          name="apptDate"
          value={formData.apptDate}
          onChange={handleChange}
          placeholder="Appointment Date"
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      {/* Repeat this pattern for other input fields */}
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AppointmentForm;
