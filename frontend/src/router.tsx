import { createBrowserRouter } from "react-router-dom";
import ViewAdmin from "@/components/view-admin";
import ViewUser from "@/components/view-user";
import AppLayout from "@/components/app-layout";
import NotFound from "@/components/not-found";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "admin", element: <ViewAdmin /> },
      { path: "user", element: <ViewUser /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);
