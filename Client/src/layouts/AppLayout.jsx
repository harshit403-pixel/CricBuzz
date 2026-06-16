import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import PublicFooter from "../components/PublicFooter";

function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f6f7f4] text-slate-900">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
}

export default AppLayout;
