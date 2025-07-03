import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = location.pathname === "/admin";

  const toggleMode = () => {
    navigate(isAdmin ? "/user" : "/admin");
  };

  console.log("AppLayout");

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="border-b">
        <div className="container max-w-7xl mx-auto flex items-center h-16 px-4">
          <div className="h-full text-sidebar-primary-foreground flex mr-2 items-center justify-center rounded-lg">
            <img src="/callops.svg" className="size-10" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-semibold text-md mb-1">
              Call<span className="text-callops-gradient">Ops</span>
            </span>
            <span className="text-xs text-foreground/50">
              Calls operations platform!
            </span>
          </div>
          <Button
            variant="outline"
            onClick={toggleMode}
            className="ml-auto hover:bg-primary/90 hover:text-white"
          >
            Switch to {isAdmin ? "User" : "Admin"} Mode
          </Button>
        </div>
      </div>
      <main className="flex flex-1 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
