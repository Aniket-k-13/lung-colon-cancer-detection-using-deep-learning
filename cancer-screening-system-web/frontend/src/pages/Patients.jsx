import React from 'react';
import PatientTable from '../components/PatientTable';

const Patients = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary">Patient Records</h1>
        <p className="text-slate-500 mt-2">Manage historical diagnosis logs and reports.</p>
      </div>
      
      <PatientTable />
    </div>
  );
};

export default Patients;