import { type Call } from "@/api/calls";
import { Card, CardContent } from "@/components/ui/card";
import { useSelectedCallStore } from "@/stores/use-selected-call-store";
import { PhoneIcon } from "lucide-react";
import { format } from "date-fns";

function CallsListItem({ call }: { call: Call }) {
  const selectedCall = useSelectedCallStore((state) => state.selectedCall);
  const setSelectedCall = useSelectedCallStore(
    (state) => state.setSelectedCall
  );
  return (
    <Card
      key={call.id}
      className={`p-0 rounded-sm shadow-none cursor-pointer transition-colors ${
        selectedCall?.id === call.id
          ? "ring-2 ring-primary"
          : "hover:bg-gray-50"
      }`}
      onClick={() => setSelectedCall(call)}
    >
      <CardContent className="p-3">
        <div className="flex items-center gap-2">
          <PhoneIcon className="h-4 w-4 text-gray-500" />
          <span className="font-medium">{call.title}</span>
        </div>
        <p className="text-sm text-gray-600 mt-1 truncate">
          {call.description || "No description"}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          {format(call.updatedAt, "d.M.yyyy 'at' HH:mm:ss")}
        </p>
      </CardContent>
    </Card>
  );
}

export default CallsListItem;
