import { CallsApi, type Call, type CreateCallBody } from "@/api/calls";
import { useSelectedCallStore } from "@/stores/use-selected-call-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useCallsMutations() {
  const queryClient = useQueryClient();
  const setSelectedCall = useSelectedCallStore(
    (state) => state.setSelectedCall
  );

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

  const updateCall = useMutation({
    mutationKey: ["update_call"],
    mutationFn: async ({
      id,
      call,
    }: {
      id: string;
      call: Partial<CreateCallBody>;
    }) => {
      return await CallsApi.updateCall(id, call);
    },
    onSuccess: async () => {},
  });

  const deleteCall = useMutation({
    mutationKey: ["delete_call"],
    mutationFn: async (id: string) => {
      return await CallsApi.deleteCall(id);
    },
    onSuccess: async () => {},
  });

  return { createCall, updateCall, deleteCall };
}

export default useCallsMutations;
