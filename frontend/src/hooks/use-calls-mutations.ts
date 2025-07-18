import { CallsApi, type Call, type CreateCallBody } from "@/api/calls";
import { useSelectedCallStore } from "@/stores/use-selected-call-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Tag } from "@/api/tags";
import type { SuggestedTask } from "@/api/suggested-tasks";

function useCallsMutations() {
  const queryClient = useQueryClient();
  const setSelectedCall = useSelectedCallStore(
    (state) => state.setSelectedCall
  );
  const selectedCall = useSelectedCallStore((state) => state.selectedCall);

  const createCall = useMutation({
    mutationKey: ["create_call"],
    mutationFn: async (call: CreateCallBody) => {
      return await CallsApi.createCall(call);
    },
    onSuccess: async (newCall) => {
      queryClient.setQueryData<Call[]>(["get_calls"], (old) => [
        newCall,
        ...(old || []),
      ]);
      setSelectedCall(newCall);
    },
  });

  const addCallTag = useMutation({
    mutationKey: ["add_call_tag"],
    mutationFn: async ({ id, tagId }: { id: string; tagId: string }) => {
      const updatedAt = await CallsApi.addTagCall(id, tagId);
      return { tagId, updatedAt };
    },
    onSuccess: ({ tagId, updatedAt }) => {
      const tags = queryClient.getQueryData<Tag[]>(["get_tags"]) ?? [];
      const addedTag = tags.find((tag) => tag.id === tagId);
      if (!addedTag || !selectedCall) return;
      const updatedCall = {
        ...selectedCall,
        updatedAt,
        callTags: [...selectedCall.callTags, addedTag],
      };
      setSelectedCall(updatedCall);
      queryClient.setQueryData<Call[]>(["get_calls"], (old) => {
        const prevCalls = (old ?? []).filter(
          (call) => call.id !== updatedCall.id
        );
        return [updatedCall, ...prevCalls];
      });
    },
  });

  const removeCallTag = useMutation({
    mutationKey: ["remove_call_tag"],
    mutationFn: async ({ id, tagId }: { id: string; tagId: string }) => {
      const updatedAt = await CallsApi.removeCallTag(id, tagId);
      return { tagId, updatedAt };
    },
    onSuccess: ({ tagId, updatedAt }) => {
      const tags = queryClient.getQueryData<Tag[]>(["get_tags"]) ?? [];
      const removedTag = tags.find((tag) => tag.id === tagId);
      if (!removedTag || !selectedCall) return;
      const updatedCall = {
        ...selectedCall,
        updatedAt: new Date(updatedAt),
        callTags: selectedCall.callTags.filter(
          (callTag) => callTag.id !== tagId
        ),
      };
      setSelectedCall(updatedCall);
      queryClient.setQueryData<Call[]>(["get_calls"], (old) => {
        const prevCalls = (old ?? []).filter(
          (call) => call.id !== updatedCall.id
        );
        return [updatedCall, ...prevCalls];
      });
    },
  });

  const deleteCall = useMutation({
    mutationKey: ["delete_call"],
    mutationFn: async (id: string) => {
      return await CallsApi.deleteCall(id);
    },
    onSuccess: async () => {},
  });

  const addCallSuggestedTask = useMutation({
    mutationKey: ["add_call_suggested_task"],
    mutationFn: async ({
      id,
      suggestedTaskId,
    }: {
      id: string;
      suggestedTaskId: string;
    }) => {
      const updatedAt = await CallsApi.addCallSuggestedTask(
        id,
        suggestedTaskId
      );
      return { suggestedTaskId, updatedAt };
    },
    onSuccess: ({ suggestedTaskId, updatedAt }) => {
      const suggestedTasks =
        queryClient.getQueryData<SuggestedTask[]>(["get_suggested_tasks"]) ??
        [];
      const addedSuggestedTask = suggestedTasks.find(
        (suggestedTask) => suggestedTask.id === suggestedTaskId
      );
      if (!addedSuggestedTask || !selectedCall) return;
      const updatedCall = {
        ...selectedCall,
        updatedAt: new Date(updatedAt),
        suggestedTasks: [addedSuggestedTask, ...selectedCall.suggestedTasks],
      };
      setSelectedCall(updatedCall);
      queryClient.setQueryData<Call[]>(["get_calls"], (old) => {
        const prevCalls = (old ?? []).filter(
          (call) => call.id !== updatedCall.id
        );
        return [updatedCall, ...prevCalls];
      });
    },
  });

  return {
    createCall,
    addCallTag,
    removeCallTag,
    deleteCall,
    addCallSuggestedTask,
  };
}

export default useCallsMutations;
