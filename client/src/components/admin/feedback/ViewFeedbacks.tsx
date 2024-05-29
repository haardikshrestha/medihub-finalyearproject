import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Feedback {
  _id: string;
  feedbackText: string;
  createdAt: string;
}

const AdminFeedbackView: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get<Feedback[]>('http://localhost:5173/getfeedback');
        setFeedbacks(response.data);
      } catch (error) {
        setErrorMessage('Error fetching feedbacks. Please try again later.');
      }
    };
    fetchFeedbacks();
  }, []);

  return (
    <div className="container">
      <h1 className="text-xl font-bold mb-6">Patient Feedbacks</h1>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {feedbacks.map((feedback) => (
              <tr key={feedback._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{feedback.feedbackText}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {new Date(feedback.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminFeedbackView;
