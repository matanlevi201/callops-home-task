import type { Task, TaskStatus } from "@/api/tasks";
import { Badge } from "./ui/badge";
import TaskStatusInput from "./task-status-input";
import Loader from "./loader";
import type { SuggestedTask } from "@/api/suggested-tasks";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";
import { isSuggestedTask } from "@/api/calls";

interface AssignedTaskItemProps {
  callId: string;
  task: Task | SuggestedTask;
  updateTask: {
    mutateAsync: UseMutateAsyncFunction<
      {
        id: string;
        status: TaskStatus;
        updatedAt: string;
      },
      Error,
      {
        id: string;
        callId: string;
        status: TaskStatus;
      },
      unknown
    >;
    variables?: { id: string };
    isPending: boolean;
  };
}

function AssignedTaskItem({ callId, task, updateTask }: AssignedTaskItemProps) {
  return (
    <div className="py-2 px-4 border rounded-sm flex items-center justify-between bg-gradient-to-r from-white to-gray-50">
      <div className="flex flex-col gap-1">
        {task.description}
        {isSuggestedTask(task) && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {task.tags.map((tag) => (
              <Badge key={tag.id} variant="secondary">
                {tag.name}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <TaskStatusInput
          selectedStatus={task.status}
          onSelect={async (status: TaskStatus) => {
            await updateTask.mutateAsync({ callId, id: task.id, status });
          }}
        />
        {updateTask.variables?.id === task.id && updateTask.isPending && (
          <Loader />
        )}
      </div>
    </div>
  );
}

export default AssignedTaskItem;
