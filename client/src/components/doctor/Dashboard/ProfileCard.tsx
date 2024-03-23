import React from 'react';

interface ProfileCardProps {
  profileImage: string;
  name: string;
  description: string;
  commitment: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  profileImage,
  name,
  description,
  commitment,
}) => {
  return (
    <div className="bg-orange-100 rounded-lg p-6">
      <div className="flex items-center mb-4">
        <div className="w-24 h-24 rounded-full overflow-hidden mr-4">
          <img src={profileImage} alt={name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">{name}</h2>
          <p className="text-gray-600">Cardiology</p>
        </div>
      </div>
      <div>
        <p className="text-gray-700 mb-2">{description}</p>
        <p className="text-gray-700">{commitment}</p>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
        Profile
      </button>
    </div>
  );
};

export default ProfileCard;