import { Card, CardContent, CardTitle } from "@/components/ui/card";
import TagsAddInput from "./tags-add-input";
import TagsTable from "./tags-table";
import useSuggestedTasksQuery from "@/hooks/use-suggested-tasks-query";
import Loader from "./loader";
import SuggestedTasksTable from "./suggested-tasks-table";

function ViewAdmin() {
  console.log("ViewAdmin");
  const { data: suggestedTasks, isPending, isError } = useSuggestedTasksQuery();

  if (isPending) return <Loader />;
  if (isError) return;

  return (
    <div className="container max-w-7xl mx-auto flex-1 flex gap-6 p-6 items-start flex-col lg:flex-row">
      <Card className="rounded-sm w-full shadow-none">
        <CardContent className="space-y-4">
          <CardTitle className="text-2xl">Tags</CardTitle>
          <TagsAddInput />
          <TagsTable />
        </CardContent>
      </Card>

      <Card className="rounded-sm w-full shadow-none">
        <CardContent className="space-y-4">
          <CardTitle className="text-2xl">Suggested Tasks</CardTitle>
          <SuggestedTasksTable suggestedTasks={suggestedTasks} />
        </CardContent>
      </Card>
    </div>
  );
}

export default ViewAdmin;
