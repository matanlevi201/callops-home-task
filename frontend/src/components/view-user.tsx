import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import CallsList from "@/components/calls-list";
import { useModalStore } from "@/stores/use-modal-store";
import CallsCreateBanner from "@/components/calls-create-banner";
import { useSelectedCallStore } from "@/stores/use-selected-call-store";
import CallOverview from "./call-overview";

function ViewUser() {
  console.log("ViewUser");
  const selectedCall = useSelectedCallStore((state) => state.selectedCall);
  const setActiveModal = useModalStore((state) => state.setActiveModal);

  return (
    <div className="container max-w-7xl mx-auto flex gap-6 p-6 h-[calc(100vh-64px)]">
      <Card className="w-[400px] rounded-sm shadow-none h-full">
        <CardContent className="overflow-auto h-full">
          <CardTitle>Calls</CardTitle>
          <Button
            onClick={() => setActiveModal("create:call", undefined)}
            className="bg-callops-gradient w-full rounded-sm my-4"
          >
            <PlusIcon /> Create New Call
          </Button>
          <CallsList />
        </CardContent>
      </Card>
      <div className="w-full h-full overflow-auto">
        {selectedCall ? (
          <CallOverview call={selectedCall} />
        ) : (
          <CallsCreateBanner />
        )}
      </div>
    </div>
  );
}

export default ViewUser;
