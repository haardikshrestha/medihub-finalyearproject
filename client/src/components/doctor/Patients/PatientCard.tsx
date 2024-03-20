import React from 'react';

interface ProfileCardProps {
  name: string;
  details: { field: string; details: string }[];
}

const PatientCard: React.FC<ProfileCardProps> = ({ name, details }) => {
  return (
    <div className="flex">
      <div className="bg-blue-500 text-white p-4 rounded-l-lg flex flex-col items-center">
        <div className="w-16 h-16 bg-white rounded-full mb-2"></div>
        <h2 className="text-sm">{name}</h2>
        <h3 className="text-4xl font-bold">{name}</h3>
        <h3 className="text-4xl font-bold">{name}</h3>
      </div>
      <div className="bg-white p-4 rounded-r-lg flex-grow">
        {details.map((detail, index) => (
          <div key={index} className="flex mb-2">
            <h4 className="w-24 font-bold">{detail.field}</h4>
            <p>{detail.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientCard;