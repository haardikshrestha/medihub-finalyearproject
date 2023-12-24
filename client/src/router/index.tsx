import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import AdminLayout from "@/layouts/AdminLayout";
import ProtectedRoute from "@/layouts/ProtectedRoute";

import Signup from "@/pages/signup/Signup";
import Login from "@/pages/login/Login";
import Home from "@/pages/home/Home";

// lazy import components
const PostList = lazy(() => import("@/pages/posts/list"));
const CreatePost = lazy(() => import("@/pages/posts/create"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <h1>Dashboard</h1>,
          },
          {
            path: "posts",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <PostList />
              </Suspense>
            ),
          },
          {
            path: "posts/create",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <CreatePost />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },

  {
    path: '/signup',
    element: <Signup></Signup>
  },
  {
    path: '/login',
    element: <Login></Login>
  },
  
]);

export default router;
