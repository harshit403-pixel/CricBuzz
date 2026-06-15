import { NavLink } from "react-router-dom";
import { ROUTES } from "../../constants/route.js";

function Sidebar() {
  const links = [
    {
      label: "Dashboard",
      path: ROUTES.ADMIN,
    },
    {
      label: "Series",
      path: ROUTES.SERIES,
    },
    {
      label: "Teams",  
      path: ROUTES.TEAMS,
    },
    {
      label: "Players",
      path: ROUTES.PLAYERS,
    },
    {
      label: "Matches",
      path: ROUTES.MATCHES,
    },
    {
      label: "Commentary",
      path: ROUTES.COMMENTARY,
    },
    {
      label: "Scoring",
      path: ROUTES.SCORING,
    },
  ];

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-900">
      <div className="border-b border-slate-800 p-6">
        <h1 className="text-xl font-bold text-emerald-400">
          CricBuzz Admin
        </h1>
      </div>

      <nav className="flex flex-col gap-2 p-4">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `rounded-lg px-4 py-3 transition ${
                isActive
                  ? "bg-emerald-500 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;