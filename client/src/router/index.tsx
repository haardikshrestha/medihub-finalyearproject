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
          <Route path="/in" element={<Initial />} />
          <Route path="/patient" element={<PatientLayout />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/resetask" element={<ResetAsk />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
