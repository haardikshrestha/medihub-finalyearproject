import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For API calls

interface Doctor {
  _id?: string; 
  name: string;
  expertise: string;
}

const DoctorList = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expertise, setExpertise] = useState<string>(''); // To store selected expertise

  useEffect(() => {
    const fetchDoctors = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get('/getdoctorsbyexpertise', {
          params: { expertise }, // Send expertise as a query parameter
        });

        if (response.status === 200) {
          setDoctors(response.data);
        } else {
          throw new Error('Unexpected API response');
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    if (expertise) {
      fetchDoctors(); // Fetch doctors only if expertise is selected
    }
  }, [expertise]); // Re-fetch on expertise change

  const handleExpertiseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setExpertise(event.target.value);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center mb-4">
        <label htmlFor="expertise" className="mr-2 text-gray-700">
          Filter by Expertise:
        </label>
        <select
          id="expertise"
          value={expertise}
          onChange={handleExpertiseChange}
          className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All</option>
          {/* Add options dynamically based on your backend data structure or a separate API call */}
          {/* <option value="Cardiology">Cardiology</option> */}
          {/* <option value="Dermatology">Dermatology</option>  */}
        </select>
      </div>

      {isLoading ? (
        <p className="text-center">Loading doctors...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : doctors.length > 0 ? (
        <div className="overflow-x-auto rounded-md shadow-md">
          <table className="w-full min-w-full leading-normal">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-5 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >
                  Expertise
                </th>
                {/* Add table headers for other doctor details if needed */}
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor._id || doctor.name} className="hover:bg-gray-100">
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    {doctor.name}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    {doctor.expertise}
                  </td>
                  {/* Add table cells for other doctor details if needed */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center">No doctors found with the selected expertise.</p>
      )}
    </div>
  );
}

export default DoctorList;
