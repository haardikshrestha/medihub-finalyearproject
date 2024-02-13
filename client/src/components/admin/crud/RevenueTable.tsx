import React, { useState } from "react";

interface Revenue {
  payerName: string;
  email: string;
  date: string;
  day: string;
  totalAmount: number;
}

const RevenueTable = () => {
  const [revenues, setRevenues] = useState<Revenue[]>([
    {
      payerName: "Harry Potter",
      email: "companyA@example.com",
      date: "2024-01-25",
      day: "Monday",
      totalAmount: 5000,
    },
    {
      payerName: "Hardik Shrestha",
      email: "companyA@example.com",
      date: "2024-01-25",
      day: "Monday",
      totalAmount: 5000,
    },
    {
      payerName: "Prekshya Dali",
      email: "companyA@example.com",
      date: "2024-01-25",
      day: "Monday",
      totalAmount: 5000,
    },
    {
      payerName: "Nidhip Shrestha",
      email: "companyA@example.com",
      date: "2024-01-25",
      day: "Monday",
      totalAmount: 5000,
    },
  ]);

  return (
    <div>
      <div className="flex justify-between mb-2">
        {/* Total Revenue Box */}
        <div className="flex items-center">
          <span className="text-gray-500 mr-2">Total Revenue:</span>
          <span className="font-bold">
            ${revenues.reduce((sum, revenue) => sum + revenue.totalAmount, 0)}
          </span>
        </div>

        <button
          onClick={() => window.open("https://esewa.com.np/", "_blank")}
          className="flex items-center text-white bg-lime-500 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-3 py-2.5"
          type="button"
        >
          <img
            src="/src/assets/esewa.png" // Adjust the path based on your project structure
            alt="Esewa Logo"
            className="w-6 h-6 mr-2"
          />
          <span>Check in esewa</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Payer Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Day
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Total Amount
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {revenues.map((revenue, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {revenue.payerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{revenue.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{revenue.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{revenue.day}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  Rs. {revenue.totalAmount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RevenueTable;
