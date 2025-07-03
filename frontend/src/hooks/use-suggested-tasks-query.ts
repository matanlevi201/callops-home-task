import { SuggestedTasksApi, type SuggestedTask } from "@/api/suggested-tasks";
import { useQuery } from "@tanstack/react-query";

function useSuggestedTasksQuery() {
  const suggestedTasksQuery = useQuery<SuggestedTask[]>({
    queryKey: ["get_suggested_tasks"],
    queryFn: async () => {
      const data = await SuggestedTasksApi.getSuggestedTasks();
      return data ?? [];
    },
  });

  return suggestedTasksQuery;
}

export default useSuggestedTasksQuery;
