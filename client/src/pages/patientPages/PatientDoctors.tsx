import React from "react";

const PatientDoctors = () => {
  const doctors = [
    {
      id: 1,
      name: "Dr. Ram Pandey",
      specialities: ["Cardiology"],
      image: "/src/assets/2.png",
    },
    {
      id: 2,
      name: "Dr. Harry Potter",
      specialities: ["Pediatrics"],
      image: "/src/assets/doc.png",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <label className="mb-5 text-sm font-medium text-gray-900 sr-only dark:text-white">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  "
          placeholder="Search Doctors"
          required
        />
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-lime-500 hover:bg-lime-600 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-4 py-2"
        >
          Search
        </button>
      </div>
      <main className="container mx-auto mt-4">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white p-6 rounded-lg shadow mb-6 text-center"
            >
              <img
                src={doctor.image}
                alt={`Dr. ${doctor.name}`}
                className="w-full h-32 object-cover mb-4 rounded-md"
              />
              <h2 className="text-xl font-medium mb-2 text-gray-800">{doctor.name}</h2>
              <p className="text-gray-600 text-sm mb-4">
                {doctor.specialities.join(", ")}
              </p>
              <button className="bg-lime-500 text-white rounded-full px-4 py-2 hover:bg-lime-600">
                View Profile
              </button>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default PatientDoctors;
