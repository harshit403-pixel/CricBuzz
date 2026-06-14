import { createBrowserRouter } from "react-router-dom";

import AppLayout from "../layouts/AppLayout";
import AdminLayout from "../layouts/AdminLayout";

import Home from "../pages/public/Home";
import Login from "../pages/public/Login";
import Signup from "../pages/public/Signup";

import AdminHome from "../pages/private/AdminHome";
import SeriesList from "../pages/private/SeriesList";
import CreateSeries from "../pages/private/CreateSeries";
import EditSeries from "../pages/private/EditSeries";

import ProtectedRoute from "./ProtectedRoute";
import RoleProtectedRoute from "./RoleProtectedRoute";

import { ROLES } from "../shared/constants/roles.js";

const router = createBrowserRouter([
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

  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <RoleProtectedRoute
          allowedRoles={[
            ROLES.SUPER_ADMIN,
            ROLES.ADMIN,
            ROLES.SCORER,
          ]}
        >
          <AdminLayout />
        </RoleProtectedRoute>
      </ProtectedRoute>
    ),

    children: [
      {
        index: true,
        element: <AdminHome />,
      },

      {
        path: "series",
        element: <SeriesList />,
      },

      {
        path: "series/create",
        element: <CreateSeries />,
      },

      {
        path: "series/:id/edit",
        element: <EditSeries />,
      },
    ],
  },
]);

export default router;