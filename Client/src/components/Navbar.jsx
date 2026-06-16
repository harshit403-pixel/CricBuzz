import { useDeferredValue, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CircleUserRound,
  LogOut,
  Search,
  Shield,
  Sparkles,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { useSearch } from "../features/search/hooks/useSearch";
import { logout as logoutApi } from "../features/auth/api/auth.api";
import { logout } from "../slices/userSlice";

const navItems = [
  { label: "Live Scores", to: "/" },
  { label: "Series", to: "/series" },
  { label: "Teams", to: "/teams" },
  { label: "Admin", to: "/admin" },
];

function Navbar() {
  const [searchValue, setSearchValue] = useState("");
  const deferredSearch = useDeferredValue(searchValue);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, name } = useSelector((state) => state.user);
  const { data, isFetching } = useSearch(deferredSearch);

  const searchResults = data?.data?.data || {
    players: [],
    teams: [],
    series: [],
  };

  const shouldShowSearch = deferredSearch.trim().length > 1;
  const hasResults =
    searchResults.players.length > 0 ||
    searchResults.teams.length > 0 ||
    searchResults.series.length > 0;

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(logout());
      navigate("/login");
    }
  };

  const linkClassName = ({ isActive }) =>
    `border-b-2 px-1 pb-3 text-sm font-medium transition ${
      isActive
        ? "border-blue-600 text-blue-600"
        : "border-transparent text-slate-600 hover:text-slate-900"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-[#f7f7f5]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-blue-600" />
            <span className="text-3xl font-semibold tracking-tight text-blue-600">
              CricBuzz
            </span>
          </Link>

          <nav className="hidden items-center gap-5 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === "/"}
                className={linkClassName}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end gap-3">
          <div className="relative hidden w-full max-w-xs sm:block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Search matches..."
              className="h-11 w-full rounded-full border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            {shouldShowSearch && (
              <div className="absolute right-0 left-0 top-[calc(100%+0.75rem)] rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_20px_45px_rgba(15,23,42,0.12)]">
                {isFetching ? (
                  <p className="text-sm text-slate-500">Searching...</p>
                ) : hasResults ? (
                  <div className="space-y-4">
                    {searchResults.series.length > 0 && (
                      <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                          Series
                        </p>
                        <div className="space-y-2">
                          {searchResults.series.map((series) => (
                            <Link
                              key={series._id}
                              to={`/series/${series._id}`}
                              onClick={() => setSearchValue("")}
                              className="block rounded-2xl border border-slate-100 px-3 py-2 text-sm text-slate-700 transition hover:border-blue-100 hover:bg-blue-50"
                            >
                              {series.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {searchResults.teams.length > 0 && (
                      <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                          Teams
                        </p>
                        <div className="space-y-2">
                          {searchResults.teams.map((team) => (
                            <Link
                              key={team._id}
                              to={`/teams/${team._id}`}
                              onClick={() => setSearchValue("")}
                              className="block rounded-2xl border border-slate-100 px-3 py-2 text-sm text-slate-700 transition hover:border-blue-100 hover:bg-blue-50"
                            >
                              {team.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {searchResults.players.length > 0 && (
                      <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                          Players
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {searchResults.players.map((player) => (
                            <span
                              key={player._id}
                              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600"
                            >
                              {player.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">
                    No public results found.
                  </p>
                )}
              </div>
            )}
          </div>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <Shield className="h-4 w-4" />
                Admin
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <LogOut className="h-4 w-4" />
                {name || "Logout"}
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50"
              aria-label="Open account"
            >
              <CircleUserRound className="h-5 w-5" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
