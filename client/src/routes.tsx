import { Navigate } from "react-router-dom";
import Login from "./components/Login";
import RootLayout from "./RootLayout";
import Dashboard from "./components/Dashboard";

export function publicRoutes() {
  return [
    { path: "/login", element: <Login /> },
    { path: "*", element: <Navigate to="/login" replace /> },
  ];
}
export function privateRoutes() {
  return {
    element: <RootLayout />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/login", element: <Login /> },
      { path: "*", element: <Navigate to="/dashboard" replace /> },
    ],
  };
}
