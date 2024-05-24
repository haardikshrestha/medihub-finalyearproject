import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { FaTrashAlt, FaFilter, FaThList } from 'react-icons/fa';
import BackButton from '@/components/BackButton';

interface Appointment {
  _id: string;
  apptID: string;
  apptDate: string;
  apptPatient: string;
  apptTime: string;
  apptDoctor: string;
  apptReason: string;
  apptStatus: string;
  __v: number;
}

const AppointmentHistory = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [positions, setPositions] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const email = localStorage.getItem('email');
        const response = await axios.get('http://localhost:5173/getappointmentsbyemail', {
          params: { email }
        });
        setAppointments(response.data);
        setFilteredAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        toast.error('Error fetching appointments');
      }
    };

    fetchAppointments();
  }, []);

  const handleFilterChange = (status: string) => {
    setFilterStatus(status);
    if (status === 'All') {
      setFilteredAppointments(appointments);
    } else {
      const filtered = appointments.filter((appointment) => appointment.apptStatus === status);
      setFilteredAppointments(filtered);
    }
  };

  const handleCancelAppointment = (appointmentId: string) => {
    confirmAlert({
      title: 'Cancel Appointment',
      message: 'Are you sure you want to cancel this appointment?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await axios.post(`http://localhost:5173/appointments/${appointmentId}/cancel`);
              toast.success('Appointment canceled successfully!');
              const email = localStorage.getItem('email');
              const response = await axios.get('http://localhost:5173/getappointmentsbyemail', {
                params: { email }
              });
              setAppointments(response.data);
              setFilteredAppointments(response.data);
            } catch (error) {
              console.error('Error cancelling appointment:', error);
              toast.error('Failed to cancel appointment');
            }
          },
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  };

  const fetchPositionInQueue = async (appointmentId: string) => {
    try {
      const response = await axios.get('http://localhost:5173/getpositioninqueue', {
        params: { appointmentId }
      });
      setPositions(prev => ({ ...prev, [appointmentId]: response.data.position }));
    } catch (error) {
      console.error('Error fetching position in queue:', error);
    }
  };

  useEffect(() => {
    filteredAppointments
      .filter(appt => appt.apptStatus === 'Pending')
      .forEach(appt => fetchPositionInQueue(appt._id));
  }, [filteredAppointments]);

  return (
    <div className="bg-gradient-to-br from-green-100 to-blue-100 min-h-screen py-12 rounded-lg">
      <BackButton />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Appointment History</h2>
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-full px-4 py-2 flex items-center shadow-md">
            <FaFilter className="text-gray-500 mr-2" />
            <button
              className={`px-3 py-1 rounded-full ${
                filterStatus === 'All' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } mr-2 transition-colors duration-300`}
              onClick={() => handleFilterChange('All')}
            >
              All
            </button>
            <button
              className={`px-3 py-1 rounded-full ${
                filterStatus === 'Pending' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } mr-2 transition-colors duration-300`}
              onClick={() => handleFilterChange('Pending')}
            >
              Pending
            </button>
            <button
              className={`px-3 py-1 rounded-full ${
                filterStatus === 'Scheduled' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } mr-2 transition-colors duration-300`}
              onClick={() => handleFilterChange('Scheduled')}
            >
              Scheduled
            </button>
            <button
              className={`px-3 py-1 rounded-full ${
                filterStatus === 'Completed' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition-colors duration-300`}
              onClick={() => handleFilterChange('Completed')}
            >
              Completed
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
          {filteredAppointments.map((appointment, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden hover:shadow-md w-full transition-shadow duration-300">
              <div className="p-6 flex justify-between items-center bg-gray-100">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-white mr-4 flex items-center justify-center text-gray-600 font-semibold text-xl">
                    {appointment.apptDoctor.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{appointment.apptReason}</h3>
                    <span className="text-gray-700 text-sm">Dr. {appointment.apptDoctor}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <span
                    className={`text-sm font-semibold px-3 py-1 rounded-full mr-2 ${
                      appointment.apptStatus === 'Pending'
                        ? 'bg-yellow-500 text-white shadow-md'
                        : appointment.apptStatus === 'Scheduled'
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-green-500 text-white shadow-md'
                    }`}
                  >
                    {appointment.apptStatus}
                  </span>
                  {appointment.apptStatus === 'Pending' && (
                    <button
                      className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors duration-300 ml-2 shadow-md"
                      onClick={() => handleCancelAppointment(appointment._id)}
                    >
                      <FaTrashAlt />
                    </button>
                  )}
                  {appointment.apptStatus === 'Pending' && positions[appointment._id] && (
                    <div className="bg-purple-500 text-white px-3 py-1 rounded-lg ml-2 flex items-center shadow-md">
                      <FaThList className="mr-2" />
                      <span>Position {positions[appointment._id]}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-6 bg-white flex justify-between items-center">
                <span className="text-gray-600 text-sm">
                  {new Date(appointment.apptDate).toLocaleDateString()} - {appointment.apptTime}
                </span>
              </div>
            </div>
          ))}
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AppointmentHistory;
