import React from 'react';

const LabTests: React.FC = () => {
  const testResults = [
    {
      patientName: 'John Doe',
      doctorName: 'Dr. Jane Smith',
      testType: 'Blood Test',
      date: new Date('2024-04-05'),
      comments: 'Crticial',
    },
    {
      patientName: 'Jane Doe',
      doctorName: 'Dr. Michael Brown',
      testType: 'X-Ray',
      date: new Date('2024-04-10'),
      comments: 'Minor',
    },
  ];

  return (
    <div className="">
      <h2 className="text-xl font-medium text-gray-700 mb-4">Your Lab Test History</h2>
      <table className="w-full table-auto min-w-max">
        <thead>
          <tr className="text-left bg-gray-100 border-b border-gray-200 font-medium">
            <th className="p-4">Doctor</th>
            <th className="p-4">Test Type</th>
            <th className="p-4">Date</th>
            <th className="p-4">Comments</th>
            <th className="p-4 text-center">Download</th>
          </tr>
        </thead>
        <tbody>
          {testResults.map((result) => (
            <tr key={result.date.toString()} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-4">{result.doctorName}</td>
              <td className="p-4">{result.testType}</td>
              <td className="p-4">{result.date.toLocaleDateString()}</td> {/* Format date for readability */}
              <td className="p-4">{result.comments}</td>
              <td className="p-4 text-center">
                <button className="px-2 py-1 rounded-md bg-blue-100 text-blue-600 font-bold hover:bg-blue-200">
                  Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LabTests;
