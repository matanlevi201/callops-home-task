import { Card, CardContent } from "./ui/card";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/stores/use-modal-store";

function CallsCreateBanner() {
  const setActiveModal = useModalStore((state) => state.setActiveModal);
  return (
    <Card className="w-full max-w-2xl rounded-sm mx-auto p-0">
      <CardContent className="flex flex-col items-center justify-center p-12 text-center">
        <img src="/callops.svg" className="size-24 mx-auto" />
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to CallOps
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Start managing your calls efficiently. Create your first call or
            select an existing one from the sidebar.
          </p>
        </div>
        <Button
          size="lg"
          onClick={() => setActiveModal("create:call", undefined)}
          className="bg-callops-gradient flex items-center"
        >
          <PlusIcon className="h-8 w-8 " />
          Create Call
        </Button>
        <div className="mt-8 text-sm text-gray-500">
          <p>Or select an existing call from the sidebar to continue working</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default CallsCreateBanner;
