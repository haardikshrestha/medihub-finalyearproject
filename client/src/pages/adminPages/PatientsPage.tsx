// PatientsPage.js
import InPatientForm from '@/components/admin/crud/Patients/InPatientForm';
import UserTable from '@/components/admin/crud/UserTable';
import React from 'react';

const PatientsPage = () => {
  return (
    <div>
      <UserTable/>
      <InPatientForm/>
    </div>
  );
};

export default PatientsPage;
