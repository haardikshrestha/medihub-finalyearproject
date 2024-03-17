import React, { useState } from 'react';
import { FaFilePdf, FaClock, FaCalendarAlt, FaPlus } from 'react-icons/fa';
import LabTestForm from './LabTestForm';

interface Test {
  id: string;
  name: string;
  date: string;
  status: 'completed' | 'pending' | 'scheduled';
  pdfUrl?: string;
}

const PathologyPage: React.FC = () => {
  const [tests, setTests] = useState<Test[]>([
    {
      id: '2',
      name: 'Blood Test',
      date: '2023-05-01',
      status: 'completed',
      pdfUrl: 'https://example.com/blood-test.pdf',
    },
    {
      id: '1',
      name: 'X-Ray',
      date: '2023-05-05',
      status: 'pending',
    },
    {
      id: '3',
      name: 'MRI Scan',
      date: '2023-05-10',
      status: 'scheduled',
    },
  ]);

  const [showForm, setShowForm] = useState<boolean>(false);

  const completedTests = tests.filter((test) => test.status === 'completed');
  const pendingTests = tests.filter((test) => test.status === 'pending');
  const scheduledTests = tests.filter((test) => test.status === 'scheduled');

  const handleAddTestClick = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col justify-center items-center w-1/3 mr-4">
          <h2 className="text-lg mb-2 text-green-500">Completed</h2>
          <p className="text-3xl font-bold">{completedTests.length}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col justify-center items-center w-1/3 mr-4">
          <h2 className="text-lg mb-2 text-yellow-500">Pending</h2>
          <p className="text-3xl font-bold">{pendingTests.length}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col justify-center items-center w-1/3">
          <h2 className="text-lg mb-2 text-blue-500">Scheduled</h2>
          <p className="text-3xl font-bold">{scheduledTests.length}</p>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-lg mb-4 ">Completed Tests</h2>
        <div className="grid grid-cols-3 gap-8">
          {completedTests.map((test) => (
            <div key={test.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2">{test.name}</h3>
              <p className="text-gray-600 mb-4">Date: {test.date}</p>
              {test.pdfUrl && (
                <a href={test.pdfUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                  <FaFilePdf className="text-red-500 mr-2" />
                  View PDF
                </a>
              )}
            </div>
          ))}
          {pendingTests.map((test) => (
            <div key={test.id} className="bg-gray-200 border border-gray-200 rounded-lg p-6 relative">
              <div className="absolute inset-0 bg-gray-600 opacity-25 rounded-lg"></div>
              <h3 className="text-lg font-bold mb-2">{test.name}</h3>
              <p className="text-gray-600 mb-4">Date: {test.date}</p>
              <div className="flex items-center text-gray-600">
                <FaClock className="mr-2" />
                Pending
              </div>
            </div>
          ))}
          {scheduledTests.map((test) => (
            <div key={test.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2">{test.name}</h3>
              <p className="text-gray-600 mb-4">Date: {test.date}</p>
              <div className="flex items-center text-gray-600">
                <FaCalendarAlt className="mr-2" />
                Scheduled
              </div>
            </div>
          ))}
          <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col justify-center items-center">
            <button onClick={handleAddTestClick} className="text-blue-500 hover:text-blue-700">
              <FaPlus className="text-xl mb-2" />
              Add / Schedule New Lab Test
            </button>
          </div>
        </div>
      </div>
      {showForm && <LabTestForm onClose={handleFormClose} />}
    </div>
  );
};

export default PathologyPage;
