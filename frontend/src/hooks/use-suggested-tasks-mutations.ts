import type { Call } from "@/api/calls";
import {
  SuggestedTasksApi,
  type CreateSuggestedTaskBody,
  type SuggestedTask,
} from "@/api/suggested-tasks";
import type { TaskStatus } from "@/api/tasks";
import { useSelectedCallStore } from "@/stores/use-selected-call-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useSuggestedTasksMutations() {
  const queryClient = useQueryClient();
  const setSelectedCall = useSelectedCallStore(
    (state) => state.setSelectedCall
  );
  const selectedCall = useSelectedCallStore((state) => state.selectedCall);

  const createSuggestedTask = useMutation({
    mutationKey: ["create_suggested_task"],
    mutationFn: async (suggestedTaskBody: CreateSuggestedTaskBody) => {
      return await SuggestedTasksApi.createSuggestedTask(suggestedTaskBody);
    },
    onSuccess: async (suggestedTask) => {
      queryClient.setQueryData<SuggestedTask[]>(
        ["get_suggested_tasks"],
        (old) => [suggestedTask, ...(old || [])]
      );
    },
  });

  const updateSuggestedTask = useMutation({
    mutationKey: ["update_suggested_task"],
    mutationFn: async ({
      id,
      suggestedTaskBody,
    }: {
      id: string;
      suggestedTaskBody: Partial<CreateSuggestedTaskBody>;
    }) => {
      return await SuggestedTasksApi.updateSuggestedTask(id, suggestedTaskBody);
    },
    onSuccess: async (updatedSuggestedTask) => {
      queryClient.setQueryData<SuggestedTask[]>(
        ["get_suggested_tasks"],
        (old) =>
          (old || []).map((tag) =>
            tag.id === updatedSuggestedTask.id
              ? { ...updatedSuggestedTask }
              : tag
          )
      );
    },
  });

  const updateSuggestedTaskStatus = useMutation({
    mutationKey: ["update_suggested_task_status"],
    mutationFn: async ({
      callId,
      id,
      status,
    }: {
      callId: string;
      id: string;
      status: TaskStatus;
    }) => {
      const updatedAt = await SuggestedTasksApi.updateSuggestedTaskStatus(
        id,
        callId,
        status
      );
      return { id, status, updatedAt };
    },
    onSuccess: async ({ id, status, updatedAt }) => {
      const suggestedTasks = queryClient.getQueryData<SuggestedTask[]>([
        "get_suggested_tasks",
      ]);
      if (!suggestedTasks || !selectedCall) return;
      const suggestedTask = selectedCall.suggestedTasks.find(
        (task) => task.id === id
      );
      const restTasks = selectedCall.suggestedTasks.filter(
        (task) => task.id !== id
      );
      if (!suggestedTask) return;
      const updatedCall = {
        ...selectedCall,
        updatedAt: new Date(updatedAt),
        suggestedTask: [...restTasks, { ...suggestedTask, status }],
      };
      setSelectedCall(updatedCall);
      queryClient.setQueryData<Call[]>(["get_calls"], (old) => [
        updatedCall,
        ...(old || []).filter((call) => call.id !== selectedCall.id),
      ]);
    },
  });

  return {
    createSuggestedTask,
    updateSuggestedTask,
    updateSuggestedTaskStatus,
  };
}

export default useSuggestedTasksMutations;
