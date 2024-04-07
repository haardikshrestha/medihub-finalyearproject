import decode from 'jwt-decode';
import { useEffect } from 'react';

const PathologistDashboard = () => {
  const token = localStorage.getItem("token");

  const handleGetUserDetails = async () => {
    if (!token) {
      console.error("No token found in localStorage");
      return; // Handle missing token scenario
    }

  };

  useEffect(() => {
    handleGetUserDetails();
  }, []); 

  return (
    <>
      <div>
        Pathologist: 
      </div>
    </>
  );
};

export default PathologistDashboard;
