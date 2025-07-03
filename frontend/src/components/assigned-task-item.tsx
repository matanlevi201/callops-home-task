import type { Task, TaskStatus } from "@/api/tasks";
import { Badge } from "./ui/badge";
import TaskStatusInput from "./task-status-input";
import Loader from "./loader";
import type { SuggestedTask } from "@/api/suggested-tasks";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";

interface AssignedTaskItemProps {
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
        status: TaskStatus;
      },
      unknown
    >;
    variables?: { id: string };
    isPending: boolean;
  };
}

// Type guard to check if task is a SuggestedTask
const isSuggestedTask = (task: Task | SuggestedTask): task is SuggestedTask => {
  return "tags" in task;
};

function AssignedTaskItem({ task, updateTask }: AssignedTaskItemProps) {
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
            await updateTask.mutateAsync({ id: task.id, status });
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
