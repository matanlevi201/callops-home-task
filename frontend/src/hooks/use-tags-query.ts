import { TagsApi, type Tag } from "@/api/tags";
import { useQuery } from "@tanstack/react-query";

function useTagsQuery() {
  const tagsQuery = useQuery<Tag[]>({
    queryKey: ["get_tags"],
    queryFn: async () => {
      const data = await TagsApi.getTags();
      return data ?? [];
    },
  });

  return tagsQuery;
}

export default useTagsQuery;
