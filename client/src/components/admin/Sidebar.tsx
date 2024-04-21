import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
    localStorage.removeItem("email");
    localStorage.removeItem("role")
  }
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <ul className="menu p-4 w-56 bg-base-100 text-base-content">
        <div className="mb-4 flex items-center">
          <img src="/src/assets/logo-images/logo-l.png" alt="Logo" className="w-3/4 h-auto object-cover mx-auto px-3 pb-3" />
        </div>
        <li className="mb-2">
          <Link to="/admin" className="flex items-center hover:text-gray-600 text-sm">
            Dashboard
          </Link>
        </li>
        <li className="mb-2">
          <details>
            <summary className="flex items-center hover:text-gray-600 text-sm">Patients</summary>
            <ul>
              <li>
                <Link to="/admin/inpatients" className="flex items-center hover:text-gray-600 text-sm ml-5 mt-2">
                  In Patients
                </Link>
              </li>
              <li>
                <Link to="/admin/outpatients" className="flex items-center hover:text-gray-600 text-sm ml-5">
                  Out Patients
                </Link>
              </li>
              <li>
                <Link to="/admin/admission" className="flex items-center hover:text-gray-600 text-sm ml-5">
                  Admission
                </Link>
              </li>
            </ul>
          </details>
        </li>
        <li className="mb-2">
          <Link to="/admin/doctors" className="flex items-center hover:text-gray-600 text-sm">
            Doctors
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/admin/pathologists" className="flex items-center hover:text-gray-600 text-sm">
            Pathologists
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/admin/departments" className="flex items-center hover:text-gray-600 text-sm">
            Departments
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/admin/wards" className="flex items-center hover:text-gray-600 text-sm">
            Wards
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/admin/revenue" className="flex items-center hover:text-gray-600 text-sm">
            Revenue
          </Link>
        </li>
        {/* logout button at the bottom */}
        <div className="absolute bottom-0 w-full left-0 p-4">
          <button onClick={handleLogout} className="btn border-none bg-error w-full text-center text-white">
            
            Logout
          </button>
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;