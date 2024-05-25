import { TbHome, TbCalendar, TbListDetails, TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const PathologistSidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <ul className="menu p-4 w-52 bg-[#F2F2F2] text-base-content">
        <div className="mb-4 flex items-center">
          <img
            src="/src/assets/logo-images/logo-l.png"
            alt="Logo"
            className="w-3/4 h-auto object-cover mx-auto px-3 pb-3"
          />
        </div>
        <li className="mb-2">
          <Link
            to="/pathologist"
            className="flex items-center hover:text-gray-600 text-sm active:bg-gray-300"
          >
            <TbHome className="mr-2" />
            Dashboard
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/pathologist/appointments"
            className="flex items-center hover:text-gray-600 text-sm active:bg-gray-300"
          >
            <TbCalendar className="mr-2" />
            Appointments
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/pathologist/test-results"
            className="flex items-center hover:text-gray-600 text-sm active:bg-gray-300"
          >
            <TbListDetails className="mr-2" />
            Test Results
          </Link>
        </li>
        <div className="absolute bottom-0 w-full left-0 p-4">
          <button
            className="btn border-none bg-error w-full text-center text-white"
            onClick={handleLogout}
          >
            <TbLogout className="mr-2" />
            Logout
          </button>
        </div>
      </ul>
    </div>
  );
};

export default PathologistSidebar;
