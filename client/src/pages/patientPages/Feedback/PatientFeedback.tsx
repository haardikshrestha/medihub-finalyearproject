import React, { useState, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';

const PatientFeedbackForm: React.FC = () => {
  const [feedbackText, setFeedbackText] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5173/feedback', { feedbackText });
      setSuccessMessage('Feedback submitted successfully!');
      setErrorMessage('');
      setFeedbackText('');
    } catch (error) {
      setErrorMessage('Error submitting feedback. Please try again later.');
      setSuccessMessage('');
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    if (id === 'feedbackText') setFeedbackText(value);
  };

  return (
    <div className="container mx-auto max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 mt-6">Give Feedback to the developers:</h1>
      {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="feedbackText" className="block text-gray-700 font-bold mb-2">
            Feedback
          </label>
          <textarea
            id="feedbackText"
            value={feedbackText}
            onChange={handleInputChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={4}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-[#91BF77] hover:bg-[#7da466] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300"
          >
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientFeedbackForm;