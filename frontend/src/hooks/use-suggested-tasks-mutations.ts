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

  return { createSuggestedTask, updateSuggestedTask };
}

export default useSuggestedTasksMutations;
