import { Link, Outlet } from "react-router-dom";

import { logout } from "@/app/authSlice";

import PatientHeader from "@/components/patient/PatientHeader";
import PatientSidebar from "@/components/patient/PatientSidebar";


const DoctorLayout = () => {
  
  return (
    <div>
      <PatientHeader/>
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content bg-white  rounded-2xl p-8 mr-4 mt-16">
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
          <main>
            <Outlet />
          </main>
        </div>
        
        <PatientSidebar />
      </div>
    </div>
  );
};

export default DoctorLayout;
