import { Card, CardContent, CardTitle } from "./ui/card";
import CallsList from "@/components/calls-list";
import { useIsMobile } from "@/hooks/use-mobile";
import NewCallButton from "@/components/new-call-button";

function AppSidebar() {
  const isMobile = useIsMobile();
  return (
    <Card
      className="rounded-sm shadow-none h-full py-1"
      style={{ width: isMobile ? "300px" : "400px" }}
    >
      <CardContent className="overflow-auto h-full py-0 px-3 pt-3">
        {!isMobile && <CardTitle>Calls</CardTitle>}
        {!isMobile && <NewCallButton />}
        <CallsList />
      </CardContent>
    </Card>
  );
}

export default AppSidebar;
