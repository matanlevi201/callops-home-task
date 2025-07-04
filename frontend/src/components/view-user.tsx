import CallsCreateBanner from "@/components/calls-create-banner";
import { useSelectedCallStore } from "@/stores/use-selected-call-store";
import CallOverview from "@/components/call-overview";
import { useIsMobile } from "@/hooks/use-mobile";
import AppSidebar from "@/components/app-sidebar";
import NewCallButton from "@/components/new-call-button";

function ViewUser() {
  const isMobile = useIsMobile();
  const selectedCall = useSelectedCallStore((state) => state.selectedCall);

  return (
    <div className="container max-w-7xl mx-auto flex gap-6 p-6 h-[calc(100vh-65px)]">
      {isMobile ? null : <AppSidebar />}
      <div className="flex flex-col">
        {isMobile && selectedCall && <NewCallButton />}
        <div className="w-full h-full overflow-auto">
          {selectedCall ? (
            <CallOverview call={selectedCall} />
          ) : (
            <CallsCreateBanner />
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewUser;
