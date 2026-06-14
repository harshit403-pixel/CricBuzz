import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import AdminHome from "./pages/private/AdminHome";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/public/Home";
import Login from "./pages/public/Login.jsx";
import Signup from "./pages/public/Signup.jsx";

let router = createBrowserRouter([
  // PUBLIC routes
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Signup />,
      },
    ],
  },

  // PROTECTED routes
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminHome />,
      },
    ],
  },
]);

export default router;
