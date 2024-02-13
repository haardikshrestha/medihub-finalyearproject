import axios from "axios";
import { useSearchParams,  } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const InitialForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");


  const handleregister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);

      // Extract values from form data
      const firstName = formData.get('first_name') as string;
      const lastName = formData.get('last_name') as string;
      const gender = formData.get('gender') as string;
      const dob = formData.get('dob') as string;
      const chronicIllness = formData.get('chronic_illness') as string;
      const address = formData.get('address') as string;
      const bloodGroup = formData.get('blood_group') as string;

      // Check for required fields
      if (!firstName || !lastName || !gender || !dob || !bloodGroup) {
        alert("Please fill in all required fields.");
        return;
      }

      const response = await axios.post("http://localhost:5173/patientsinfo", {
        email,
        firstName,
        lastName,
        gender,
        dateofbirth: dob,
        chronicillness: chronicIllness,
        address,
        bloodgroup: bloodGroup,
      });

      if (response.status === 201) {
        alert("Patient registered successfully");
        navigate(`/patient?email=${email}`);
      } else {
        alert("Failed to register patient");
      }
    } catch (error) {
      console.error("Error registering patient:", error);

      // Display a generic error message for unexpected errors
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-lime-300"
      style={{ backdropFilter: "blur(20px)" }}
    >
      <form
        className="bg-white shadow-md rounded-lg p-8 max-w-screen-md w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 mb-4"
        onSubmit={handleregister}
      >
        <h2 className="text-2xl font-bold mb-4 col-span-2 text-gray-800">
          Patient Information
        </h2>

        <div className="mb-4">
          <label htmlFor="first_name" className="block text-sm font-medium text-gray-600">
            First Name
          </label>
          <input
            type="text"
            name="first_name"
            id="first_name"
            className="mt-1 p-2.5 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            placeholder="John"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="last_name" className="block text-sm font-medium text-gray-600">
            Last Name
          </label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            className="mt-1 p-2.5 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Doe"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="gender" className="block text-sm font-medium text-gray-600">
            Gender
          </label>
          <select
            name="gender"
            id="gender"
            className="mt-1 p-2.5 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="dob" className="block text-sm font-medium text-gray-600">
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            id="dob"
            className="mt-1 p-2.5 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="chronic_illness"
            className="block text-sm font-medium text-gray-600"
          >
            Chronic Illness
          </label>
          <input
            type="text"
            name="chronic_illness"
            id="chronic_illness"
            className="mt-1 p-2.5 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-600"
          >
            Address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            className="mt-1 p-2.5 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="blood_group"
            className="block text-sm font-medium text-gray-600"
          >
            Blood Group
          </label>
          <select
            name="blood_group"
            id="blood_group"
            className="mt-1 p-2.5 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>

        <button
          type="submit"
          className="col-span-2 w-2/4 bg-lime-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 mx-auto block"
                 
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default InitialForm;
