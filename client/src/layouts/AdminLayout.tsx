import { Link, Outlet } from "react-router-dom";

import { logout } from "@/app/authSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/app/store";
import Card from "@/components/admin/Card";
import UserTable from "@/components/admin/UserTable";
import DoctorTable from "@/components/admin/DoctorTable";
import PathologistTable from "@/components/admin/PathologistTable";
import Header from "@/components/common/Header";
import CreateDoctor from "@/components/admin/CreateDoctor";
import CreatePathologist from "@/components/admin/CreatePathologist";
import { ProfileCard } from "@/components/patient/LabCard";
import DepartmentsTable from "@/components/admin/DepartmentsTable";
import WardTable from "@/components/admin/WardTable";
import CreateDepartment from "@/components/admin/CreateDepartment";
import CreateWard from "@/components/admin/CreateWard";


const AdminLayout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handlelogout = () => {
    navigate("/login");
  };
  return (
    <div >
      <div className="drawer drawer-mobile">
      
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content bg-gray-100 p-8">
          <div>
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex flex-row justify-between">
            <Card number="2" title="Patients" imageUrl="src/assets/admin-images/patient.png" />
            <Card number="7" title="Doctors" imageUrl="src/assets/admin-images/doctor.png" />
            <Card number="4" title="Pathologists" imageUrl="src/assets/admin-images/pathologist.png" />
            <Card number="10" title="Departments" imageUrl="src/assets/admin-images/department.png" />
            <Card number="6" title="Wards" imageUrl="src/assets/admin-images/ward.png" />
          </div>

          <div className="mt-10">
            <UserTable />
          </div>
          <div className="mt-10">
            <DoctorTable />
            <CreateDoctor />
          </div>
          <div className="mt-10">
            <PathologistTable />
            <CreatePathologist />
          </div>
          <div className="mt-10">
            <DepartmentsTable />
            <CreateDepartment/>
          </div>
          <div className="mt-10">
            <WardTable />
            <CreateWard/>
          </div>
          
          <main>
            <Outlet />
          </main>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            <img
              src="src\assets\logo-l.png"
              alt=""
              className="w-2/3 h-auto object-cover mx-auto px-3 pb-3"
            />
            <li>
              <Link to="/admin">Dashboard</Link>
            </li>
            <li>
              <Link to="/admin/patients">Patients</Link>
            </li>
            <li>
              <Link to="/admin/doctor">Doctors</Link>
            </li>
            <li>
              <Link to="/admin/pathologists">Pathologists</Link>
            </li>
            <li>
              <Link to="/admin/departments">Departments</Link>
            </li>
            <li>
              <Link to="/admin/wards">Wards</Link>
            </li>
            {/* logout button at bottom */}
            <div className="absolute bottom-0 w-full left-0 p-4">
              <button
                className="btn border-none  bg-error w-full text-center text-white"
                onClick={handlelogout}
              >
                Logout
              </button>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
