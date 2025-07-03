import { createBrowserRouter, Navigate } from "react-router-dom";
import ViewAdmin from "@/components/view-admin";
import ViewUser from "@/components/view-user";
import AppLayout from "@/components/app-layout";
import NotFound from "@/components/not-found";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="user" replace /> },
      { path: "admin", element: <ViewAdmin /> },
      { path: "user", element: <ViewUser /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);
