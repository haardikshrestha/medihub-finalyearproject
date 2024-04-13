import React from 'react';

const Appointments: React.FC = () => {
  const appointments = [
    {
      apptID: 'APPT-1234',
      apptDate: '2024-04-12',
      apptPatient: 'John Doe',
      apptTime: '10:00 AM',
      apptDoctor: 'Dr. Jane Smith',
      apptStatus: 'scheduled',
      apptDisease: 'Common Cold',
      paymentStatus: 'paid',
      transactionID: 'TXN-0001',
    },
    {
      apptID: 'APPT-5678',
      apptDate: '2024-04-18',
      apptPatient: 'Jane Doe',
      apptTime: '2:00 PM',
      apptDoctor: 'Dr. Michael Brown',
      apptStatus: 'pending',
      apptDisease: 'Back Pain',
      paymentStatus: 'unpaid',
      transactionID: '',
    },
  ];

  return (
    <div className="">
      <h2 className="text-xl font-medium text-gray-700 mb-4">Your Appointment History</h2>
      <table className="w-full table-auto min-w-max">
        <thead>
          <tr className="text-left bg-gray-100 border-b border-gray-200 font-medium">
            <th className="p-4">ID</th>
            <th className="p-4">Date</th>
            <th className="p-4">Time</th>
            <th className="p-4">Doctor</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.apptID} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-4">{appointment.apptID}</td>
              <td className="p-4">{appointment.apptDate}</td>
              <td className="p-4">{appointment.apptTime}</td>
              <td className="p-4">{appointment.apptDoctor}</td>
              <td className="p-4 text-center flex items-center">
                {appointment.apptStatus === 'scheduled' && (
                  <span className="inline-flex items-center px-3 py-2 rounded-full bg-green-100 text-green-600 font-bold">
                    Scheduled
                  </span>
                )}
                {appointment.apptStatus === 'pending' && (
                  <span className="inline-flex items-center px-3 py-2 rounded-full bg-yellow-100 text-yellow-600 font-bold">
                    Pending
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Appointments;
