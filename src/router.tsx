import { createBrowserRouter } from "react-router-dom";
import { Dashboard, Login } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  }
]);

export default router;
