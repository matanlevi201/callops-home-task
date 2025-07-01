import { CallsApi, type Call } from "@/api/calls";
import { useQuery } from "@tanstack/react-query";

function useCallsQuery() {
  const callsQuery = useQuery<Call[]>({
    queryKey: ["get_calls"],
    queryFn: async () => {
      const data = await CallsApi.getCalls();
      return data ?? [];
    },
  });

  return callsQuery;
}

export default useCallsQuery;
