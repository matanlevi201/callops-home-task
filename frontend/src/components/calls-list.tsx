import CallsListItem from "@/components/calls-list-item";
import useCallsQuery from "@/hooks/use-calls-query";
import Loader from "@/components/loader";

function CallsList() {
  console.log("CallList");
  const { data: calls, isError, isPending } = useCallsQuery();

  if (isPending) return <Loader />;
  if (isError) return;

  return (
    <div className="space-y-2">
      {calls.map((call, i) => (
        <CallsListItem key={call.id + i} call={call} />
      ))}
    </div>
  );
}

export default CallsList;
