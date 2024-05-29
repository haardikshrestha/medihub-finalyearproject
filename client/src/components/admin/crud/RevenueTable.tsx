import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Appointment {
  _id: string;
  apptID: string;
  apptDate: string;
  apptPatient: string;
  apptTime: string;
  apptDoctor: string;
  apptReason: string;
  apptStatus: string;
}

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filter, setFilter] = useState<string>('All');
  const [isUpdating, setIsUpdating] = useState<{ [id: string]: boolean }>({});
  const [editMode, setEditMode] = useState<{ [id: string]: boolean }>({});
  const [editValues, setEditValues] = useState<{ [id: string]: { date: string; time: string } }>({});

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5173/getappointments');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      setIsUpdating((prev) => ({ ...prev, [id]: true }));
      await axios.put(`http://localhost:5173/updateappointment/${id}`, { status });
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === id ? { ...appt, apptStatus: status } : appt
        )
      );
      setIsUpdating((prev) => ({ ...prev, [id]: false }));
      toast.success(`Appointment status updated to ${status}`);
    } catch (error) {
      console.error('Error updating appointment status:', error);
      setIsUpdating((prev) => ({ ...prev, [id]: false }));
      toast.error('Failed to update appointment status');
    }
  };

  const updateAppointment = async (id: string, date: string, time: string) => {
    try {
      setIsUpdating((prev) => ({ ...prev, [id]: true }));
      await axios.put(`http://localhost:5173/updateappointment/${id}`, { apptDate: date, apptTime: time });
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === id ? { ...appt, apptDate: date, apptTime: time } : appt
        )
      );
      setIsUpdating((prev) => ({ ...prev, [id]: false }));
      setEditMode((prev) => ({ ...prev, [id]: false }));
      toast.success('Appointment updated successfully');
    } catch (error) {
      console.error('Error updating appointment:', error);
      setIsUpdating((prev) => ({ ...prev, [id]: false }));
      toast.error('Failed to update appointment');
    }
  };

  const filteredAppointments = appointments.filter((appt) => {
    if (filter === 'All') return true;
    return appt.apptStatus === filter;
  });

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <label className="mr-2">Filter by status:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      {filteredAppointments.map((appt) => (
        <div key={appt._id} className="bg-white p-4 rounded shadow-md mb-4 w-full">
          <p><strong>Appointment ID:</strong> {appt.apptID}</p>
          <p><strong>Date:</strong> {new Date(appt.apptDate).toLocaleDateString()}</p>
          <p><strong>Time:</strong> {appt.apptTime}</p>
          <p><strong>Patient:</strong> {appt.apptPatient}</p>
          <p><strong>Doctor:</strong> {appt.apptDoctor}</p>
          <p><strong>Reason:</strong> {appt.apptReason}</p>
          <p><strong>Status:</strong> {appt.apptStatus}</p>
          {editMode[appt._id] ? (
            <div className="mt-4">
              <input
                type="date"
                value={editValues[appt._id]?.date || ''}
                onChange={(e) =>
                  setEditValues((prev) => ({
                    ...prev,
                    [appt._id]: { ...prev[appt._id], date: e.target.value },
                  }))
                }
                className="p-2 border rounded mr-2"
              />
              <input
                type="time"
                value={editValues[appt._id]?.time || ''}
                onChange={(e) =>
                  setEditValues((prev) => ({
                    ...prev,
                    [appt._id]: { ...prev[appt._id], time: e.target.value },
                  }))
                }
                className="p-2 border rounded mr-2"
              />
              <button
                className={`bg-blue-500 text-white py-2 px-4 rounded mr-2 ${
                  isUpdating[appt._id] ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={() => updateAppointment(appt._id, editValues[appt._id]?.date, editValues[appt._id]?.time)}
                disabled={isUpdating[appt._id]}
              >
                {isUpdating[appt._id] ? 'Please wait...' : 'Save'}
              </button>
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded"
                onClick={() => setEditMode((prev) => ({ ...prev, [appt._id]: false }))}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="mt-4">
              {appt.apptStatus !== 'completed' && (
                <>
                  <button
                    className={`bg-green-500 text-white py-2 px-4 rounded mr-2 ${
                      isUpdating[appt._id] ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={() => updateStatus(appt._id, 'Scheduled')}
                    disabled={isUpdating[appt._id]}
                  >
                    {isUpdating[appt._id] ? 'Please wait...' : 'Approve'}
                  </button>
                  <button
                    className={`bg-red-500 text-white py-2 px-4 rounded ${
                      isUpdating[appt._id] ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={() => updateStatus(appt._id, 'Cancelled')}
                    disabled={isUpdating[appt._id]}
                  >
                    {isUpdating[appt._id] ? 'Please wait...' : 'Cancel'}
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      ))}
      <ToastContainer />
    </div>
  );
};

export default Appointments;
