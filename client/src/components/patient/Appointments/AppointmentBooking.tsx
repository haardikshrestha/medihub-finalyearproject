import React, { useState } from 'react';

interface Appointment {
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

const AppointmentBooking: React.FC = () => {
  const [appointment, setAppointment] = useState<Appointment>({
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission and booking logic here
    console.log(appointment);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Book Appointment</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="apptPatient" className="block text-gray-700 font-semibold mb-2">
              Patient Name
            </label>
            <input
              type="text"
              id="apptPatient"
              name="apptPatient"
              value={appointment.apptPatient}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:bg-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="apptDoctor" className="block text-gray-700 font-semibold mb-2">
              Doctor Name
            </label>
            <input
              type="text"
              id="apptDoctor"
              name="apptDoctor"
              value={appointment.apptDoctor}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:bg-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="apptDate" className="block text-gray-700 font-semibold mb-2">
              Appointment Date
            </label>
            <input
              type="date"
              id="apptDate"
              name="apptDate"
              value={appointment.apptDate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:bg-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="apptTime" className="block text-gray-700 font-semibold mb-2">
              Appointment Time
            </label>
            <input
              type="time"
              id="apptTime"
              name="apptTime"
              value={appointment.apptTime}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:bg-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="apptDisease" className="block text-gray-700 font-semibold mb-2">
              Disease
            </label>
            <textarea
              id="apptDisease"
              name="apptDisease"
              value={appointment.apptDisease}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:bg-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="transactionID" className="block text-gray-700 font-semibold mb-2">
              Transaction ID
            </label>
            <input
              type="text"
              id="transactionID"
              name="transactionID"
              value={appointment.transactionID}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:bg-white"
              required
            />
          </div>
          <div className="flex justify-between">
            <div>
              <label htmlFor="paymentStatus" className="block text-gray-700 font-semibold mb-2">
                Payment Status
              </label>
              <select
                id="paymentStatus"
                name="paymentStatus"
                value={appointment.paymentStatus}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:bg-white"
                required
              >
                <option value="">Select Payment Status</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentBooking;