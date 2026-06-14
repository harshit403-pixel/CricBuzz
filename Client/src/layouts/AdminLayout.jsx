import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "../shared/components/ui/Sidebar";

import { logout as logoutApi } from "../features/auth/api/auth.api";
import { logout } from "../slices/userSlice";

function AdminLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { name, role } = useSelector((state) => state.user);

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
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold">
              CricBuzz Admin
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-medium">{name}</p>
              <p className="text-xs text-slate-400">{role}</p>
            </div>

            <button
              onClick={handleLogout}
              className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;