import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { privateRoutes, publicRoutes } from "./routes";
import { useCookies } from "react-cookie";

const App = () => {
  const [cookies] = useCookies();
  const isLogged = cookies["isLogged"];
  const router = createBrowserRouter([
    isLogged ? privateRoutes() : {},
    ...publicRoutes(),
  ]);
  return <RouterProvider router={router} />;
};

export default App;
