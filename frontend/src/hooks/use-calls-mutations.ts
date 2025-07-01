import { CallsApi, type CreateCallBody } from "@/api/calls";
import { useMutation } from "@tanstack/react-query";

function useCallsMutations() {
  const createCall = useMutation({
    mutationKey: ["create_call"],
    mutationFn: async (call: CreateCallBody) => {
      return await CallsApi.createCall(call);
    },
    onSuccess: async () => {},
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
