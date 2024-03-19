import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Surgery {
  _id: string;
  patientName: string;
  surgeryDate: string;
  surgeonName: string;
  assistantSurgeonName?: string;
  anesthesiaType?: string;
  procedure: string;
  notes?: string;
  complications?: string;
  medicationsPrescribed?: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }[];
  followUpDate?: string;
  followUpNotes?: string;
}

const SurgeryTable: React.FC = () => {
  const [surgeries, setSurgeries] = useState<Surgery[]>([]);

  useEffect(() => {
    const fetchSurgeries = async () => {
      try {
        const response = await axios.get('http://localhost:5173/getsurgeries'); // Assuming the API endpoint is '/api/surgeries'
        setSurgeries(response.data);
      } catch (error) {
        console.error('Error fetching surgeries:', error);
      }
    };

    fetchSurgeries();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Patient Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Surgeon Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Assistant Surgeon Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Anesthesia Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Procedure
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Notes
            </th>
            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Complications
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Follow-Up Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Follow-Up Notes
            </th> */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {surgeries.map((surgery) => (
            <tr key={surgery._id}>
              <td className="px-6 py-4 whitespace-nowrap">{surgery.patientName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{surgery.surgeonName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{surgery.assistantSurgeonName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{surgery.anesthesiaType}</td>
              <td className="px-6 py-4 whitespace-nowrap">{surgery.procedure}</td>
              <td className="px-6 py-4 whitespace-nowrap">{surgery.notes}</td>
              {/* <td className="px-6 py-4 whitespace-nowrap">{surgery.complications}</td>
              <td className="px-6 py-4 whitespace-nowrap">{surgery.followUpDate}</td>
              <td className="px-6 py-4 whitespace-nowrap">{surgery.followUpNotes}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SurgeryTable;


