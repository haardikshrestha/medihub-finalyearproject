import "./AppointmentCard.css";

const AppointmentCard = () => {
  return (
    <div className="border rounded-xl" style={{ height: "330px" }}>
      <p className="flex justify-center font-bold ml-2 mt-5 mb-2">
        Today's appointments:
      </p>
      <div
        className="appointment-container px-4 py-2"
        style={{ overflowY: "auto", height: "84.2%" }}
      >
        <div className="mt-4 appointment-card flex items-center p-4 bg-white rounded-xl mb-4 border">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
              <img
                src="src\assets\pfp.png"
                alt=""
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">Appointment 2</h3>
              <p className="text-gray-600">11:00 AM - 12:00 PM</p>
              <p className="text-gray-600">With Dr. Jane Smith</p>
            </div>
          </div>
        <div className="bg-gray-200 border mt-4 h-28 rounded-xl"></div>
        {/* Add more appointment divs here */}
      </div>
    </div>
  );
};

export default AppointmentCard;
