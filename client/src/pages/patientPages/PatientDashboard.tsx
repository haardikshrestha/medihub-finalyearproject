import React from "react";
import { MdAccessTime, MdFitnessCenter, MdLocalHospital, MdFlag } from "react-icons/md";
import PatientProfile from "./patientProfile";
import PatientProfiler from "@/components/patient/Profile/PatientProfile";
import PatientDashboard from "@/components/patient/Dashboard/TestDashboard";

const PatientDetails: React.FC = () => {
  const patientUser = {
    name: 'John Doe',
    avatar: 'https://example.com/patient-avatar.jpg',
    bio: 'Looking for quality healthcare services.',
    email: 'john.doe@example.com',
    phone: '+1 555-555-5555',
    address: '123 Main Street, Anytown USA',
    medicalHistory: 'John has a history of high blood pressure and diabetes.',
    appointments: [
      {
        date: '2023-04-15',
        doctor: 'Dr. Jane Smith',
        reason: 'Annual Check-up',
      },
      {
        date: '2023-05-01',
        doctor: 'Dr. Michael Johnson',
        reason: 'Follow-up appointment',
      },
    ],
  };

  const patientData = {
    name: 'John Doe',
    avatar: 'https://example.com/patient-avatar.jpg',
    upcomingAppointments: [
      {
        date: '2023-04-15',
        doctor: 'Dr. Jane Smith',
        reason: 'Annual Check-up',
      },
      {
        date: '2023-05-01',
        doctor: 'Dr. Michael Johnson',
        reason: 'Follow-up appointment',
      },
    ],
    prescriptions: [
      {
        name: 'Lisinopril',
        dosage: '10mg once daily',
        instructions: 'Take with food',
      },
      {
        name: 'Metformin',
        dosage: '500mg twice daily',
        instructions: 'Take with meals',
      },
    ],
    medicalRecords: [
      {
        date: '2023-03-01',
        description: 'Annual physical exam',
        doctor: 'Dr. Jane Smith',
      },
      {
        date: '2023-02-15',
        description: 'Follow-up visit for high blood pressure',
        doctor: 'Dr. Michael Johnson',
      },
    ],
    primaryCarePhysician: {
      name: 'Dr. Jane Smith',
      specialty: 'Family Medicine',
      phone: '+1 555-555-5555',
      email: 'jane.smith@hospital.com',
    },
  };

  return (
    <>
      <PatientProfiler patient={patientUser}/>
    </>
  );
};

export default PatientDetails;
