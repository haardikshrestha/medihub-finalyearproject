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
import PatientsPage from "@/pages/adminPages/patient/PatientsPage";
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
import InPatientDetails from "@/components/doctor/Patients/InPatientsDetails";
import DischargePatient from "@/components/doctor/Patients/DischargePatient";
import AdmissionPage from "@/pages/adminPages/patient/AdmissionPage";
import InPatientsPage from "@/pages/adminPages/patient/InPatientsPage";
import ViewTestHistory from "@/pages/patientPages/Pathology/ViewTestHistory";
import CreateTestPage from "@/pages/pathologistPages/CreateTestPage";
import DoctorDetails from "@/pages/patientPages/Doctors/DoctorDetails";
import DoctorProfile from "@/components/doctor/Profile/DoctorProfile";
import AppointmentHistory from "@/components/patient/Appointments/AppointmentHistory";
import BedBookingComponent from "@/components/patient/Appointments/BedBooking";
import WardBookingComponent from "@/components/patient/Appointments/Wards";
import ViewEditPatients from "@/components/admin/crud/Patients/ViewEditPatients";
import ViewEditDoctor from "@/components/admin/crud/Doctor/ViewEditDoctor";
import CreateWard from "@/components/admin/crud/Ward/CreateWard";
import PatientSettingsPage from "@/pages/patientPages/PatientSettingsPage";
import PathologistProfile from "@/components/pathologist/profile/PathologistProfile";
import TestResultsView from "@/pages/pathologistPages/TestResultsView";
import PatientDiagnosis from "@/pages/patientPages/Diagnosis/patientDiagnosis";
import DiagnosisCard from "@/pages/doctorPages/DiagnosisDoctor";
import AddSurgery from "@/components/admin/crud/Surgery/AddSurgery";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/resetask" element={<ResetAsk />} />
        <Route path="/staff/reset" element={<FirstLogin />} />
        {/* <Route element={<ProtectedRoute />}> */}
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<DashboardPage />} />
            <Route path="/admin/departments" element={<DepartmentsPage />} />
            <Route path="/admin/doctors" element={<DoctorsPage />} />
            <Route path="/admin/pathologists" element={<PathologistsPage />} />
            <Route path="/admin/tests" element={<Tests />} />
            <Route path="/admin/testdetails" element={<TestDetails />} />
            <Route path="/admin/outpatients" element={<PatientsPage />} />
            <Route path="/admin/inpatients" element={<InPatientsPage />} />
            <Route path="/admin/admission" element={<AdmissionPage />} />
            <Route path="/admin/wards" element={<WardsPage />} />
            <Route path="/admin/createwards" element={<CreateWard />} />
            <Route path="/admin/revenue" element={<RevenuePage />} />
            <Route path="/admin/labtests" element={<LabTestsPage />} />
            <Route path="/admin/vieweditpatients" element={<ViewEditPatients />} />
            <Route path="/admin/vieweditdoctors" element={<ViewEditDoctor />} />
            <Route path="/admin/surgery" element={<AddSurgery />} />
          </Route>

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
            <Route path="/doctor/profile" element={<DoctorProfile />} />
            <Route path="/doctor/diagnosis" element={<DiagnosisCard />} />
          </Route>

          <Route element={<PatientLayout />}>
            <Route path="/patient" element={<PatientDashboard />} />
            <Route path="/patient/doctors" element={<PatientDoctors />} />
            <Route path="/patient/appointments" element={<PatientAppointments />} />
            <Route path="/patient/adoctors" element={<DoctorList />} />
            <Route path="/patient/profile" element={<PatientProfiler />} />
            <Route path="/patient/settings" element={<PatientSettingsPage />} />
            <Route path="/patient/chats" element={<ChatInterface />} />
            <Route path="/patient/pathology" element={<PathologyPage />} />
            <Route path="/patient/packages" element={<PatientHealth />} />
            <Route path="/patient/appointmentdetails" element={<AppointmentDetails />} />
            <Route path="/patient/medications" element={<Medications />} />
            <Route path="/patient/labtests" element={<LabTests />} />
            <Route path="/patient/appointmenthistory" element={<AppointmentHistory />} />
            <Route path="/patient/testdetails" element={<TestDetails />} />
            <Route path="/patient/testhistory" element={<ViewTestHistory />} />
            <Route path="/patient/doctordetails" element={<DoctorDetails />} />
            <Route path="/patient/bedbooking" element={<BedBookingComponent />} />
            <Route path="/patient/wards" element={<WardBookingComponent />} />
            <Route path="/patient/notifications" element={<WardBookingComponent />} />
            <Route path="/patient/diagnosis" element={<PatientDiagnosis />} />
          </Route>

          <Route element={<PathologistLayout />}>
            <Route path="/pathologist" element={<PathologistDashboard />} />
            <Route path="/pathologist/appointments" element={<PathologistAppointments />} />
            <Route path="/pathologist/pathology" element={<PathologistTests />} />
            <Route path="/pathologist/settings" element={<PathologistSettings />} />
            <Route path="/pathologist/createtest" element={<CreateTestPage />} />
            <Route path="/pathologist/profile" element={<PathologistProfile />} />
            <Route path="/pathologist/test-results" element={<TestResultsView />} />
          </Route>

          <Route path="/in" element={<Initial />} />
          <Route path="/ind" element={<DoctorForm />} />
          <Route path="/inp" element={<PathologistForm />} />
        
      </Routes>
    </Router>
  );
};

export default AppRouter;
