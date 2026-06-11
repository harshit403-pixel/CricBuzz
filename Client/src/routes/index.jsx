import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../components/pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Home</h1>,
  },
  {
    path:"/login",
    element: <LoginPage/>
  }
]);

export default router;