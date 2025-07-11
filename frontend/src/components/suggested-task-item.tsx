import type { SuggestedTask } from "@/api/suggested-tasks";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import useCallsMutations from "@/hooks/use-calls-mutations";
import Loader from "@/components/loader";

interface SuggestedTaskItemProps {
  suggestedTask: SuggestedTask;
  isAssigned: boolean;
  callId: string;
}

function SuggestedTaskItem({
  callId,
  suggestedTask,
  isAssigned = false,
}: SuggestedTaskItemProps) {
  const { addCallSuggestedTask } = useCallsMutations();
  return (
    <div
      key={suggestedTask.id}
      className="py-2 px-4 border rounded-sm bg-gradient-to-r from-purple-50 to-purple-25 hover:shadow-md transition-all duration-200 "
    >
      <div className="flex flex-col gap-4 sm:gap-0 sm:items-center justify-between sm:flex-row">
        <div className="flex flex-col gap-1">
          {suggestedTask.description}
          <div className="flex flex-wrap gap-1">
            {suggestedTask.tags.map((tag) => (
              <Badge key={tag.id} variant="outline">
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>
        {isAssigned ? (
          <Button
            size="sm"
            variant="secondary"
            disabled={true}
            className="px-4 py-2 h-9"
          >
            Assigned
          </Button>
        ) : (
          <Button
            size="sm"
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-4 py-2 h-9"
            onClick={async () =>
              await addCallSuggestedTask.mutateAsync({
                id: callId,
                suggestedTaskId: suggestedTask.id,
              })
            }
            disabled={addCallSuggestedTask.isPending}
          >
            {addCallSuggestedTask.isPending ? (
              <Loader />
            ) : (
              <PlusIcon className="h-3 w-3 mr-1" />
            )}
            Add
          </Button>
        )}
      </div>
    </div>
  );
}

export default SuggestedTaskItem;
