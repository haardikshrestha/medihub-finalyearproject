import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import AdminLayout from "@/layouts/AdminLayout";
import ProtectedRoute from "@/layouts/ProtectedRoute";

import Signup from "@/pages/signup/Signup";
import Login from "@/pages/login/Login";
import ResetPassword from "@/pages/login/ResetPassword";
import ResetAsk from "@/pages/login/ResetAsk";
import Table from "@/pages/dashboard/Table";
import OTP from "@/pages/signup/OTP";
import Card from "@/components/Card";
import Form from "@/components/doctor/Form";

// lazy import components
const PostList = lazy(() => import("@/pages/posts/list"));
const CreatePost = lazy(() => import("@/pages/posts/create"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <OTP />,
    // children: [
    //   {
    //     path: "/",
    //     element: <AdminLayout />,
    //     children: [
    //       {
    //         index: true,
    //         element: <div className="flex flex-col gap-10">
            
            
            
    //         <Form />
    //       </div>,
    //       },
    //       {
    //         path: "posts",
    //         element: (
    //           <Suspense fallback={<div>Loading...</div>}>
    //             <PostList />
    //           </Suspense>
    //         ),
    //       },
    //       {
    //         path: "posts/create",
    //         element: (
    //           <Suspense fallback={<div>Loading...</div>}>
    //             <CreatePost />
    //           </Suspense>
    //         ),
    //       },
    //     ],
    //   },
    // ],
  },

  {
    path: '/signup',
    element: <Signup></Signup>
  },
  {
    path: '/login',
    element: <Login></Login>
  },
  {
    path: '/reset',
    element: <ResetPassword></ResetPassword>
  },
  {
    path: '/resetask',
    element: <ResetAsk></ResetAsk>
  },
  {
    path: '/otp',
    element: <OTP></OTP>
  },
  
]);

export default router;
