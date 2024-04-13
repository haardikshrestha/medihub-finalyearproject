import React from 'react';
import { MdLightbulb, MdWbSunny, MdNightlight } from 'react-icons/md'; // Import icons

const Medications: React.FC = () => {
  const medications = [
    { name: 'Metformin', dosage: '500mg', time: 'Morning'},
    { name: 'Atorvastatin', dosage: '20mg', time: 'Evening'},
    { name: 'Lisinopril', dosage: '10mg', time: 'Afternoon'},
  ];

  const getTimeIcon = (time: string) => {
    switch (time.toLowerCase()) {
      case 'morning':
        return <MdLightbulb className="w-5 h-5 text-yellow-500 mr-1" />;
      case 'afternoon':
        return <MdWbSunny className="w-5 h-5 text-orange-500 mr-1" />;
      case 'evening':
        return <MdNightlight className="w-5 h-5 text-blue-500 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white overflow-hidden">
      <h2 className="text-xl font-medium text-gray-700 p-4 border-b border-gray-200">Your Medications</h2>
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full table-auto min-w-max ">
          <thead>
            <tr className="text-left bg-gray-100 border-b border-gray-200 font-medium">
              <th className="p-4">Medication</th>
              <th className="p-4">Dosage</th>
              <th className="p-4">Time</th>
            </tr>
          </thead>
          <tbody>
            {medications.map((medication) => (
              <tr key={medication.name} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-4">{medication.name}</td>
                <td className="p-4">{medication.dosage}</td>
                <td className="p-4 flex items-center">{getTimeIcon(medication.time)}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Medications;
