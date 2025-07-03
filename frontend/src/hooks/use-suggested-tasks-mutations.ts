import {
  SuggestedTasksApi,
  type CreateSuggestedTaskBody,
  type SuggestedTask,
} from "@/api/suggested-tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useSuggestedTasksMutations() {
  const queryClient = useQueryClient();

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

  return { createSuggestedTask };
}

export default useSuggestedTasksMutations;
