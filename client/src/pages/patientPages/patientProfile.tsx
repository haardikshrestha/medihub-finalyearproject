// PatientProfile.js
import React from "react";
import styled from "styled-components";

const ProfileCard = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  h2 {
    font-size: 24px;
    color: #333;
    margin: 0;
  }

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    margin-left: 20px;
  }
`;

const ProfileDetails = styled.div`
  p {
    font-size: 16px;
    color: #555;
    margin-bottom: 10px;
  }
`;

const PatientProfile = () => {
  return (
    <div>
      <ProfileCard>
        <ProfileHeader>
          <h2>Patient Profile</h2>
          <img src="/src/assets/pfp.png" alt="Profile" />
        </ProfileHeader>
        <ProfileDetails>
          <p>
            <strong>Name:</strong> John Doe
          </p>
          <p>
            <strong>Email:</strong> john.doe@example.com
          </p>
          <p>
            <strong>Phone:</strong> (123) 456-7890
          </p>
          <p>
            <strong>DOB:</strong> January 1, 1990
          </p>
          {/* Add more profile details as needed */}
        </ProfileDetails>
      </ProfileCard>
      <button className="bg-lime-500 text-white p-3 rounded-xl">Change Password</button>
    </div>
  );
};

export default PatientProfile;
