import React from 'react';

interface AttendanceProps {
  attended: number;
  total: number;
}

const Attendance: React.FC<AttendanceProps> = ({ attended, total }) => {
  const attendancePercentage = Math.round((attended / total) * 100);
  const notAttendedPercentage = 100 - attendancePercentage;

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-bold mb-2">Attendance</h2>
      <p className="text-sm mb-4">
        Attended meetings: {attended} <br />
        Total meetings: {total}
      </p>
      <div className="relative w-32 h-32">
        <div className="absolute inset-0 rounded-full bg-green-200 text-green-700 flex items-center justify-center text-3xl font-bold">
          {attendancePercentage}%
        </div>
        <div
          className="overflow-hidden rounded-full bg-green-500"
          style={{
            transform: `rotate(-90deg)`,
            transformOrigin: '50% 50%',
          }}
        >
          <div
            className="h-32 w-16 bg-green-500"
            style={{
              transform: `rotate(${(attendancePercentage / 100) * 360}deg)`,
              transformOrigin: '100% 50%',
            }}
          />
        </div>
      </div>
      <div className="flex mt-4">
        <div className="flex items-center mr-4">
          <div className="w-4 h-4 rounded-full bg-green-500 mr-2" />
          <span className="text-sm">Attended</span>
          <span className="text-sm font-bold ml-1">{attendancePercentage}%</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-gray-400 mr-2" />
          <span className="text-sm">Not Attended</span>
          <span className="text-sm font-bold ml-1">{notAttendedPercentage}%</span>
        </div>
      </div>
    </div>
  );
};

export default Attendance;