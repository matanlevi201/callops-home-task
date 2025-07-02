import type { Call } from "@/api/calls";
import { TasksApi, TaskStatus, type CreateTaskBody } from "@/api/tasks";
import { useSelectedCallStore } from "@/stores/use-selected-call-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useTasksMutations() {
  const queryClient = useQueryClient();
  const setSelectedCall = useSelectedCallStore(
    (state) => state.setSelectedCall
  );
  const selectedCall = useSelectedCallStore((state) => state.selectedCall);

  const createTask = useMutation({
    mutationKey: ["create_task"],
    mutationFn: async (createTaskBody: CreateTaskBody) => {
      return await TasksApi.createTask(createTaskBody);
    },
    onSuccess: async ({ newTask, updatedAt }) => {
      const calls = queryClient.getQueryData<Call[]>(["get_calls"]);
      if (!calls || !selectedCall) return;
      const updatedCall = {
        ...selectedCall,
        updatedAt: new Date(updatedAt),
        tasks: [...selectedCall.tasks, newTask],
      };
      setSelectedCall(updatedCall);
      queryClient.setQueryData<Call[]>(["get_calls"], (old) => [
        updatedCall,
        ...(old || []).filter((call) => call.id !== selectedCall.id),
      ]);
    },
  });

  const updateTask = useMutation({
    mutationKey: ["update_task"],
    mutationFn: async ({ id, status }: { id: string; status: TaskStatus }) => {
      const updatedAt = await TasksApi.updateTask(id, status);
      return { id, status, updatedAt };
    },
    onSuccess: async ({ id, status, updatedAt }) => {
      const calls = queryClient.getQueryData<Call[]>(["get_calls"]);
      if (!calls || !selectedCall) return;
      const task = selectedCall.tasks.find((task) => task.id === id);
      const restTasks = selectedCall.tasks.filter((task) => task.id !== id);
      if (!task) return;
      const updatedCall = {
        ...selectedCall,
        updatedAt: new Date(updatedAt),
        tasks: [...restTasks, { ...task, status }],
      };
      setSelectedCall(updatedCall);
      queryClient.setQueryData<Call[]>(["get_calls"], (old) => [
        updatedCall,
        ...(old || []).filter((call) => call.id !== selectedCall.id),
      ]);
    },
  });

  return { createTask, updateTask };
}

export default useTasksMutations;
