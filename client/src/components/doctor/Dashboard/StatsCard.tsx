import React from "react";

interface StatsCardProps {
  color: string;
  title: string;
  number: string | number | null;
}

const StatsCard: React.FC<StatsCardProps> = ({ color, title, number}) => {
  return (
    <div className={`bg-white border-gray-200 border p-5 rounded-xl w-48 h-[9rem] flex flex-col justify-center items-center`}>
      <div className="text-sm mb-4">{title}</div>
      <div className={`bg-${color}-500 text-white font-bold rounded-full w-16 h-16 flex items-center justify-center`}>
        {number !== null ? number.toString() : 'Loading...'}
      </div>
    </div>
  );
};

export default StatsCard;
