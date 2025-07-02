import { TagsApi, type CreateTagBody, type Tag } from "@/api/tags";
import { useSelectedCallStore } from "@/stores/use-selected-call-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useTagsMutations() {
  const queryClient = useQueryClient();
  const updateSelectedCall = useSelectedCallStore(
    (state) => state.updateSelectedCall
  );

  const createTag = useMutation({
    mutationKey: ["create_tag"],
    mutationFn: async (tag: CreateTagBody) => {
      return await TagsApi.createTag(tag);
    },
    onSuccess: async (newTag) => {
      queryClient.setQueryData<Tag[]>(["get_tags"], (old) => [
        newTag,
        ...(old || []),
      ]);
    },
  });

  const updateTag = useMutation({
    mutationKey: ["update_tag"],
    mutationFn: async ({ id, tag }: { id: string; tag: CreateTagBody }) => {
      return await TagsApi.updateTag(id, tag);
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["get_tags"] }),
        queryClient.refetchQueries({ queryKey: ["get_calls"] }),
      ]);
      updateSelectedCall();
    },
  });

  const deleteTag = useMutation({
    mutationKey: ["delete_tag"],
    mutationFn: async (id: string) => {
      return await TagsApi.deleteTag(id);
    },
    onSuccess: async () => {},
  });

  return { createTag, updateTag, deleteTag };
}

export default useTagsMutations;
