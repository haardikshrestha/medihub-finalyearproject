import React from "react";

interface StatsCardProps {
  color: string;
  title: string;
  number: string | number;
  percentage?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ color, title, number, percentage }) => {
  return (
    <div className={`bg-white border-gray-200 border p-5 rounded-xl w-48 h-[9rem] mt-5`}>
      <div className="text-sm mb-4 flex justify-center">{title}</div>
      <div className="flex items-center">
        <div className={`bg-${color}-500 text-white font-bold rounded-full w-16 h-16 flex items-center justify-center mr-2 ml-4`}>
          {number}
        </div>
        {percentage && (
          <div>
            <div className={`text-${color}-500 ml-2`}>{percentage}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
