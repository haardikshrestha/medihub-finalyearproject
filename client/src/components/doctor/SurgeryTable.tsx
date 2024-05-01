import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUserInjured,
  FaUserMd,
  FaSyringe,
  FaNotesMedical,
  FaCalendarAlt,
  FaClipboardCheck,
  FaPlusCircle,
  FaEdit,
} from "react-icons/fa";

interface Surgery {
  _id: string;
  patientName: string;
  surgeryDate: string;
  surgeonName: string;
  procedure: string;
  notes?: string;
  complications?: string;
  followUpDate?: string;
  followUpNotes?: string;
}

const SurgeryTable: React.FC = () => {
  const [surgeries, setSurgeries] = useState<Surgery[]>([]);

  useEffect(() => {
    const fetchSurgeries = async () => {
      try {
        const response = await axios.get("http://localhost:5173/getsurgeries");
        setSurgeries(response.data);
      } catch (error) {
        console.error("Error fetching surgeries:", error);
      }
    };
    fetchSurgeries();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-[#91BF77] to-[#75a559] px-6 py-4 text-white flex items-center justify-between">
        <h2 className="text-2xl font-bold">Surgeries</h2>
        <FaSyringe size={24} />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  <FaUserInjured className="mr-2" /> Patient
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  <FaUserMd className="mr-2" /> Surgeon
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  <FaNotesMedical className="mr-2" /> Procedure
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  <FaClipboardCheck className="mr-2" /> Notes
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2" /> Follow-Up
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">Actions</div>
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {surgeries.map((surgery) => (
              <tr key={surgery._id} className="hover:bg-gray-100 transition duration-300">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {surgery.patientName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {surgery.surgeonName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {surgery.procedure}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {surgery.notes}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {surgery.followUpDate && (
                    <div>
                      <span className="font-medium">{surgery.followUpDate}</span>
                      {surgery.followUpNotes && (
                        <p className="text-gray-500 mt-1">{surgery.followUpNotes}</p>
                      )}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 flex items-center space-x-2">
                  <div className="flex rounded-full bg-green-200 p-2">
                    <FaPlusCircle className="text-green-500 hover:text-green-700 cursor-pointer transition-colors text-lg" />
                  </div>
                  <div className="flex rounded-full bg-blue-200 p-2">
                    <FaEdit className="text-blue-500 hover:text-blue-700 cursor-pointer transition-colors text-lg" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SurgeryTable;
