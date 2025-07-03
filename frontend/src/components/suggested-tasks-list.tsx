import useSuggestedTasksQuery from "@/hooks/use-suggested-tasks-query";
import Loader from "./loader";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import { Badge } from "./ui/badge";

function SuggestedSasksList() {
  const { data: suggestedTasks, isPending, isError } = useSuggestedTasksQuery();
  if (isPending) return <Loader />;
  if (isError) return;
  return (
    <div className="space-y-2 mb-4 ">
      {suggestedTasks.map((suggestedTask) => (
        <div
          key={suggestedTask.id}
          className="py-2 px-4 border rounded-sm bg-gradient-to-r from-purple-50 to-purple-25 hover:shadow-md transition-all duration-200 "
        >
          <div className="flex items-center justify-between">
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

            <Button
              size="sm"
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-4 py-2 h-9"
            >
              <PlusIcon className="h-3 w-3 mr-1" />
              Add
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SuggestedSasksList;
