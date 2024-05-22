import React, { useState, useEffect } from "react";

const Gender: React.FC = () => {
  const [genderData, setGenderData] = useState<{
    male: number;
    female: number;
    other: number;
    total: number;
  }>({
    male: 0,
    female: 0,
    other: 0,
    total: 0,
  });

  const calculatePercentage = (value: number) => {
    return (value / genderData.total) * 100;
  };

  useEffect(() => {
    // Fetch gender data from your API endpoint
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5173/genderCounter");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setGenderData(data);
      } catch (error) {
        console.error("Error fetching gender data:", error);
      }
    };

    fetchData();
  }, []);

  const male = genderData.male;
  const female = genderData.female;
  const other = genderData.other;

  return (
    <div className="flex flex-col items-center w-48 rounded-xl p-6 bg-white">
      <h2 className="text-lg font-bold mb-2">Patients</h2>
      <div className="relative w-32 h-32 mt-2">
        <svg viewBox="0 0 36 36" className="absolute transform ">
          <circle
            cx="18"
            cy="18"
            r="15.91549430918954"
            fill="transparent"
            strokeWidth="4"
            stroke="#CCCCCC"
            strokeLinecap="round"
          />
          {/* Male circle */}
          {male > 0 && (
            <circle
              cx="18"
              cy="18"
              r="15.91549430918954"
              fill="transparent"
              strokeWidth="4"
              stroke="#1E90FF"
              strokeDasharray={`${calculatePercentage(male)} 100`}
              strokeLinecap="round"
            />
          )}
          {/* Female circle */}
          {female > 0 && (
            <circle
              cx="18"
              cy="18"
              r="15.91549430918954"
              fill="transparent"
              strokeWidth="4"
              stroke="#FF69B4"
              strokeDasharray={`${calculatePercentage(genderData.female)} 100`}
              strokeLinecap="round"
              transform={`rotate(${calculatePercentage(genderData.male) * 3.6} 18 18)`}
            />
          )}
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="12"
            fill="#000000"
          >
            {genderData.total}
          </text>
        </svg>
      </div>
      <div className="">
        <div className="flex mt-6">
          <div className="w-4 h-4 rounded-full bg-blue-500 mr-2" />
          <span className="text-sm">Male</span>
          <span className="text-sm font-bold ml-1">
            {Math.round(calculatePercentage(genderData.male))}%
          </span>
        </div>
        <div className="flex mt-2">
          <div className="w-4 h-4 rounded-full bg-pink-500 mr-2" />
          <span className="text-sm">Female</span>
          <span className="text-sm font-bold ml-1">
            {Math.round(calculatePercentage(genderData.female))}%
          </span>
        </div>
        <div className="flex mt-2">
          <div className="w-4 h-4 rounded-full bg-[#CCCCCC] mr-2" />
          <span className="text-sm">Others</span>
          <span className="text-sm font-bold ml-1">
            {Math.round(calculatePercentage(genderData.other))}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default Gender;
