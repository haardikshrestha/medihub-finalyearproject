import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AdminLayout from '@/layouts/AdminLayout';
import PatientLayout from '@/layouts/PatientLayout';
import ProtectedRoute from '@/layouts/ProtectedRoute';
import Signup from '@/pages/signup/Signup';
import Login from '@/pages/login/Login';
import ResetPassword from '@/pages/login/ResetPassword';
import ResetAsk from '@/pages/login/ResetAsk';
import OTP from '@/pages/signup/OTP';
import DashboardPage from '@/pages/adminPages/DashboardPage';
import DepartmentsPage from '@/pages/adminPages/DepartmentsPage';
import DoctorsPage from '@/pages/adminPages/DoctorsPage';
import PathologistsPage from '@/pages/adminPages/PathologistsPage';
import PatientsPage from '@/pages/adminPages/PatientsPage';
import WardsPage from '@/pages/adminPages/WardsPage';
import RevenuePage from '@/pages/adminPages/RevenuePage';
import Initial from '@/pages/patientPages/Initial';
import DoctorLayout from '@/layouts/DoctorLayout';
import DoctorDashboard from '@/pages/doctorPages/DoctorDashboard';
import DoctorForm from '@/components/doctor/DoctorForm';
import PatientDashboard from '@/pages/patientPages/PatientDashboard';
import PatientDoctors from '@/pages/patientPages/PatientDoctors';
import PatientAppointments from '@/pages/patientPages/PatientAppointments';
import AppointmentDoctors from '@/pages/patientPages/AppointmentDoctors';
import PatientProfile from '@/pages/patientPages/patientProfile';
import CalendarPage from '@/pages/patientPages/Appointment_1';
import PatientTests from '@/pages/patientPages/PatientTests';
import PatientHealth from '@/pages/patientPages/PatientHealth';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<DashboardPage />} />
            <Route path="/admin/departments" element={<DepartmentsPage />} />
            <Route path="/admin/doctors" element={<DoctorsPage />} />
            <Route path="/admin/pathologists" element={<PathologistsPage />} />
            <Route path="/admin/patients" element={<PatientsPage />} />
            <Route path="/admin/wards" element={<WardsPage />} />
            <Route path="/admin/revenue" element={<RevenuePage />} />
          </Route>
        </Route>
        <Route path='/'>
          <Route element={<DoctorLayout/>}>
            <Route path='/doctor' element={<DoctorDashboard/>} />
          </Route>
        </Route>
        <Route path='/'>
          <Route element={<PatientLayout/>}>
            <Route path='/patient' element={<PatientDashboard/>} />
            <Route path='/patient/doctors' element={<PatientDoctors/>} />
            <Route path='/patient/appointments' element={<PatientAppointments/>} />
            <Route path='/patient/adoctors' element={<AppointmentDoctors/>} />
            <Route path='/patient/profile' element={<PatientProfile/>} />
            <Route path='/patient/calendar' element={<CalendarPage/>} />
            <Route path='/patient/pathology' element={<PatientTests/>} />
            <Route path='/patient/packages' element={<PatientHealth/>} />
          </Route>
        </Route>
          <Route path="/in" element={<Initial />} />
          <Route path="/ind" element={<DoctorForm />} />
          <Route path="/patient" element={<PatientLayout />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/resetask" element={<ResetAsk />} />
          <Route path="/doctor" element={<DoctorLayout />} />


      </Routes>
    </Router>
  );
};

export default AppRouter;
