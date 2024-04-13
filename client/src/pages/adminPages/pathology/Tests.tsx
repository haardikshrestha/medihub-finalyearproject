import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LabTest {
  id: number;
  title: string;
  photoUrl?: string;
  details: string;
  price: number;
}

const Tests: React.FC = () => {
  // Define data for lab tests (replace with actual data)
  const [labTests, setLabTests] = useState<LabTest[]>([
    {
      id: 1,
      title: 'Test 1',
      details: 'Details of Test 1',
      price: 50, // Example price
    },
    {
      id: 2,
      title: 'Test 2',
      photoUrl: 'test2.jpg',
      details: 'Details of Test 2',
      price: 75, // Example price
    },
    // Add more test data as needed
  ]);

  const navigate = useNavigate();

  // Lab Test Card Component
  const LabTestCard: React.FC<{ test: LabTest }> = ({ test }) => {
    const { id, photoUrl, title, details, price } = test;

    const handleShowDetails = (selectedId: number) => {
      navigate(`/admin/testdetails?id=${selectedId}`);
    };

    return (
      <div className="border border-gray-200 rounded-md p-4">
        {test.id === 0 && ( // Check for "Add New Test" card
          <>
            <h2 className="text-md font-semibold mb-2">Add New Test</h2>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              onClick={() => navigate('/admin/create-test')} // Navigate to create test page
            >
              Create Test
            </button>
          </>
        )}
        {test.id !== 0 && ( // Existing test cards
          <>
            <img
              src={photoUrl || 'placeholder.jpg'} // Use placeholder image if photoUrl is not provided
              alt={title}
              className="w-32 h-32 object-cover rounded-md mb-2"
            />
            <h2 className="text-md font-semibold mb-2">{title}</h2>
            <p className="text-gray-600 mb-2">{`Price: $${price.toFixed(2)}`}</p>
            <button
              className="bg-[#91BF77] text-white px-4 py-2 rounded-md hover:bg-[#7da466] transition-colors"
              onClick={() => handleShowDetails(id)} // Pass id to handleShowDetails
            >
              Show Details
            </button>
            <span className="hidden">{id}</span> {/* Hidden id */}
          </>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-xl font-semibold mb-8">Available Lab Tests</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Add a new "Add New Test" card with id 0 and default values */}
        <LabTestCard key={0} test={{ id: 0, title: '', details: '', price: 0 }} />
        {labTests.map((test) => (
          <LabTestCard key={test.id} test={test} />
        ))}
      </div>
    </div>
  );
};

export default Tests;
