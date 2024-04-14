import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminLayout from "@/layouts/AdminLayout";
import PatientLayout from "@/layouts/PatientLayout";
import ProtectedRoute from "@/layouts/ProtectedRoute";
import Signup from "@/pages/signup/Signup";
import Login from "@/pages/login/Login";
import ResetPassword from "@/pages/login/ResetPassword";
import ResetAsk from "@/pages/login/ResetAsk";
import OTP from "@/pages/signup/OTP";
import DashboardPage from "@/pages/adminPages/DashboardPage";
import DepartmentsPage from "@/pages/adminPages/DepartmentsPage";
import DoctorsPage from "@/pages/adminPages/DoctorsPage";
import PathologistsPage from "@/pages/adminPages/PathologistsPage";
import PatientsPage from "@/pages/adminPages/PatientsPage";
import WardsPage from "@/pages/adminPages/WardsPage";
import RevenuePage from "@/pages/adminPages/RevenuePage";
import Initial from "@/pages/patientPages/Initial";
import DoctorLayout from "@/layouts/DoctorLayout";
import DoctorDashboard from "@/pages/doctorPages/DoctorDashboard";
import DoctorForm from "@/components/doctor/DoctorForm";
import PatientDashboard from "@/pages/patientPages/PatientDashboard";
import PatientDoctors from "@/pages/patientPages/PatientDoctors";
import PatientAppointments from "@/pages/patientPages/PatientAppointments";
import AppointmentDoctors from "@/pages/patientPages/AppointmentDoctors";
import PatientProfile from "@/pages/patientPages/patientProfile";
import PatientHealth from "@/pages/patientPages/PatientHealth";
import DoctorPatients from "@/pages/doctorPages/DoctorPatients";
import DoctorAppointments from "@/pages/doctorPages/DoctorAppointments";
import DoctorSurgeries from "@/pages/doctorPages/DoctorSurgeries";
import DoctorPathology from "@/pages/doctorPages/DoctorPathology";
import DoctorSettings from "@/pages/doctorPages/DoctorSettings";
import PatientView from "@/pages/doctorPages/PatientView";
import ChatInterface from "@/components/patient/Chats/Chat";
import PathologyPage from "@/components/patient/Pathology/PathologyPage";
import AppointmentDetails from "@/components/patient/Appointments/AppointmentDetails";
import PathologistLayout from "@/layouts/PathologistLayout";
import PathologistForm from "@/components/pathologist/PathologistForm";
import PathologistDashboard from "@/pages/pathologistPages/PathologistDashboard";
import PathologistsPatients from "@/pages/pathologistPages/PathologistPatients";
import PathologistTests from "@/pages/pathologistPages/PathologistTests";
import PathologistAppointments from "@/pages/pathologistPages/PathologistAppointments";
import PathologistSettings from "@/pages/pathologistPages/PathologistSettings";
import FirstLogin from "@/pages/login/FirstLogin";
import Tests from "@/pages/adminPages/pathology/Tests";
import TestDetails from "@/components/patient/Pathology/TestsDetails";
import DoctorList from "@/pages/patientPages/AppointmentDoctors";

import PatientProfiler from "@/components/patient/Profile/PatientProfile";
import Medications from "@/components/patient/Dashboard/Info/Medications";
import LabTests from "@/components/patient/Dashboard/Info/LabTests";
import Appointments from "@/components/patient/Dashboard/Info/Appointments";
import Dashboard from "@/components/patient/Dashboard/Info/Dashboard";
import AppointmentBooking from "@/components/patient/Appointments/AppointmentBooking";
import LabTestsPage from "@/pages/adminPages/LabTestsPage";
import CreateTest from "@/components/pathologist/appointments/CreateReport";
import InPatientDetails from "@/components/doctor/Patients/InPatientsDetails";
import DischargePatient from "@/components/doctor/Patients/DischargePatient";
const AppRouter = () => {
  const patientUser = {
    name: "John Doe",
    avatar: "https://example.com/patient-avatar.jpg",
    bio: "Looking for quality healthcare services.",
    email: "john.doe@example.com",
    phone: "+1 555-555-5555",
    address: "123 Main Street, Anytown USA",
    medicalHistory: "John has a history of high blood pressure and diabetes.",
    blood: "A+",
    ill: "Diabetes",
    appointments: [
      {
        date: "2023-04-15",
        doctor: "Dr. Jane Smith",
        reason: "Annual Check-up",
      },
      {
        date: "2023-05-01",
        doctor: "Dr. Michael Johnson",
        reason: "Follow-up appointment",
      },
    ],
  };
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<DashboardPage />} />
            <Route path="/admin/departments" element={<DepartmentsPage />} />
            <Route path="/admin/doctors" element={<DoctorsPage />} />
            <Route path="/admin/pathologists" element={<PathologistsPage />} />
            <Route path="/admin/tests" element={<Tests />} />
            <Route path="/admin/testdetails" element={<TestDetails />} />
            <Route path="/admin/patients" element={<PatientsPage />} />
            <Route path="/admin/wards" element={<WardsPage />} />
            <Route path="/admin/revenue" element={<RevenuePage />} />
            <Route path="/admin/labtests" element={<LabTestsPage />} />
          </Route>
        </Route>
        <Route path="/">
          <Route element={<DoctorLayout />}>
            <Route path="/doctor" element={<DoctorDashboard />} />
            <Route path="/doctor/patients" element={<DoctorPatients />} />
            <Route path="/doctor/patients/view" element={<PatientView />} />
            <Route path="/doctor/inpatientdetails" element={<InPatientDetails />} />
            <Route path="/doctor/dischargepatient" element={<DischargePatient />} />
            <Route path="/doctor/appointments" element={<DoctorAppointments />} />
            <Route path="/doctor/surgeries" element={<DoctorSurgeries />} />
            <Route path="/doctor/pathology" element={<DoctorPathology />} />
            <Route path="/doctor/settings" element={<DoctorSettings />} />
          </Route>
        </Route>
        <Route path="/">
          <Route element={<PatientLayout />}>
            <Route path="/patient" element={<PatientDashboard />} />
            <Route path="/patient/doctors" element={<PatientDoctors />} />
            <Route path="/patient/appointments" element={<PatientAppointments />} />
            <Route path="/patient/adoctors" element={<DoctorList />} />
            <Route
              path="/patient/profile"
              element={<PatientProfiler patient={patientUser} />}
            />
            <Route path="/patient/chats" element={<ChatInterface />} />
            <Route path="/patient/pathology" element={<PathologyPage />} />
            <Route path="/patient/packages" element={<PatientHealth />} />
            <Route path="/patient/appointmentdetails" element={<AppointmentDetails />} />
            <Route path="/patient/medications" element={<Medications />} />
            <Route path="/patient/labtests" element={<LabTests />} />
            <Route path="/patient/appointmenthistory" element={<Appointments />} />
            <Route path="/patient/testdetails" element={<TestDetails />} />
          </Route>
        </Route>
        <Route path="/">
          <Route element={<PathologistLayout />}>
            <Route path="/pathologist" element={<PathologistDashboard />} />
            <Route
              path="/pathologist/appointments"
              element={<PathologistAppointments />}
            />
            <Route path="/pathologist/patients" element={<PathologistsPatients />} />
            <Route path="/pathologist/pathology" element={<PathologistTests />} />
            <Route path="/pathologist/settings" element={<PathologistSettings />} />
            <Route path="/pathologist/createtest" element={<CreateTest />} />
          </Route>
        </Route>

        <Route path="/in" element={<Initial />} />
        <Route path="/ind" element={<DoctorForm />} />
        <Route path="/inp" element={<PathologistForm />} />
        <Route path="/patient" element={<PatientLayout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/resetask" element={<ResetAsk />} />
        <Route path="/doctor" element={<DoctorLayout />} />

        <Route path="/staff/reset" element={<FirstLogin />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
