import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { createBrowserRouter } from "react-router-dom";

import AdminLayout from "@/layouts/AdminLayout";
import PatientLayout from "@/layouts/PatientLayout";
import ProtectedRoute from "@/layouts/ProtectedRoute";
import Signup from "@/pages/signup/Signup";
import Login from "@/pages/login/Login";
import ResetPassword from "@/pages/login/ResetPassword";
import ResetAsk from "@/pages/login/ResetAsk";
import OTP from "@/pages/signup/OTP";

const AppRouter = ()=>{
  return(
    <Router>
      <Routes>
        <Route>
          {/* <Route element = {<ProtectedRoute/>} path = "/" > */}
                <Route element = {<AdminLayout/>} path = "/admin" ></Route>
                <Route element = {<PatientLayout/>} path = "/patient" ></Route>

          {/* </Route> */}
          <Route element = {<Signup/>} path = "/signup" ></Route>
          <Route element = {<Login/>} path = "/login" ></Route>
          <Route element = {<OTP/>} path = "/otp" ></Route>
          <Route element = {<ResetPassword/>} path = "/reset" ></Route>
          <Route element = {<ResetAsk/>} path = "/resetask" ></Route>


        </Route>
      </Routes>
    </Router>


  )
}


export default AppRouter;
