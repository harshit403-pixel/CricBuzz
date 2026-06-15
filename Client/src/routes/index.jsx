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
import CreateTeam from "../pages/private/CreateTeam.jsx";
import TeamsList from "../pages/private/TeamLIst.jsx";
import EditTeam from "../pages/private/EditTeam.jsx";
import PlayersList from "../pages/private/PlayersList.jsx";
import CreatePlayer from "../pages/private/CreatePlayer.jsx";
import EditPlayer from "../pages/private/EditPlayer.jsx";
import ManageTeamSquad from "../pages/private/ManageTeamSqaud.jsx";

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
          allowedRoles={[ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SCORER]}
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
      {
        path: "teams",
        element: <TeamsList />,
      },
      {
        path: "teams/create",
        element: <CreateTeam />,
      },
      {
        path: "teams/:id/edit",
        element: <EditTeam />,
      },
      {
        path: "players",
        element: <PlayersList />,
      },
      {
        path: "players/create",
        element: <CreatePlayer />,
      },
      {
        path: "players/:id/edit",
        element: <EditPlayer />,
      },
      {
        path: "teams/:id/squad",
        element: <ManageTeamSquad />,
      },
    ],
  },
]);

export default router;
