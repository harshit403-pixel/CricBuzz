import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout as logoutApi } from "../features/auth/api/auth.api";
import { logout } from "../slices/userSlice";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, name, role } = useSelector(
    (state) => state.user,
  );

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

  return (
    <nav className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-6 py-4 text-white">
      <h1 className="text-xl font-bold text-emerald-400">
        CricBuzz
      </h1>

      {isAuthenticated && (
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-medium">{name}</p>
            <p className="text-xs text-slate-400">{role}</p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;