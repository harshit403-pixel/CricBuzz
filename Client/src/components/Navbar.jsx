import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  return (
    <nav className="py-5 px-10 w-full flex items-center justify-between bg-neutral-300">
      <div className="flex gap-10">
        <NavLink
          className={({ isActive }) =>
            isActive ? "underline text-red-100" : ""
          }
          to={"/"}
        >
          Home
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? "underline text-red-100" : ""
          }
          to={"/login"}
        >
          Login
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? "underline text-red-100" : ""
          }
          to={"/admin"}
        >
          Admin
        </NavLink>
      </div>

      <div className="h-10 w-10 rounded-full overflow-hidden bg-white">
        <img
          className="object-fit h-full w-full"
          src={
            user.picture ||
            "https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1"
          }
        />
      </div>
    </nav>
  );
};

export default Navbar;
