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
import CreateMatch from "../pages/private/CreateMatch.jsx";
import MatchesList from "../pages/private/MatchList.jsx";
import EditMatch from "../pages/private/EditMatch.jsx";
import PlayingXi from "../pages/private/PlayingXi.jsx";
import MatchToss from "../pages/private/MatchToss.jsx";
import CompleteMatch from "../pages/private/CompleteMatch.jsx";
import ScoreManagement from "../pages/private/ScoreManagement.jsx";
import CommentaryManagement from "../pages/private/CommentaryManagement.jsx";

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
      {
        path: "matches/create",
        element: <CreateMatch />,
      },
      {
        path: "matches",
        element: <MatchesList />,
      },
      {
        path: "matches/:id/edit",
        element: <EditMatch />,
      },
      {
        path: "matches/:id/playing-xi",
        element: <PlayingXi />,
      },
      {
        path: "matches/:id/toss",
        element: <MatchToss />,
      },
      {
        path: "matches/:id/complete",
        element: <CompleteMatch />,
      },
      {
        path: "matches/:id/scores",
        element: <ScoreManagement />,
      },
      {
        path: "matches/:id/commentary",

        element: <CommentaryManagement />,
      },
    ],
  },
]);

export default router;
