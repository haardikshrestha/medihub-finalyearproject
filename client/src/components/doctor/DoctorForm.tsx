import axios from "axios";
import { useSearchParams,  } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const DoctorForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const doctorpage = () => {
    navigate(`/doctor?email=${email}`);
  }

  const handleregister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
          Doctor Information
        </h2>

        
      </form>
    </div>
  );
};

export default DoctorForm;
