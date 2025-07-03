import { useModalStore } from "@/stores/use-modal-store";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

function NewCallButton() {
  const isMobile = useIsMobile();
  const setActiveModal = useModalStore((state) => state.setActiveModal);
  return (
    <div className="flex flex-col items-center gap-2 my-2 p-2">
      <Button
        onClick={() => setActiveModal("create:call", undefined)}
        className="bg-callops-gradient w-full rounded-sm"
      >
        <PlusIcon /> Create New Call
      </Button>
      {isMobile && (
        <span className="text-muted-foreground text-sm text-center">
          Need to add a new call?
        </span>
      )}
    </div>
  );
}

export default NewCallButton;
