import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PhoneIcon, XCircleIcon } from "lucide-react";
import { format } from "date-fns";
import type { Call } from "@/api/calls";
import { Badge } from "@/components/ui/badge";
import CallTagsInput from "@/components/call-tags-input";
import useCallsMutations from "@/hooks/use-calls-mutations";
import Loader from "@/components/loader";

function CallOverview({ call }: { call: Call }) {
  console.log("CallOverview");
  const { addCallTag, removeCallTag } = useCallsMutations();

  const selectedTags = call.callTags.reduce((acc, tag) => {
    acc[tag.id] = true;
    return acc;
  }, {} as Record<string, boolean>);

  const onSelect = async (tagId: string) => {
    if (selectedTags[tagId]) {
      await removeCallTag.mutateAsync({ id: call.id, tagId });
      selectedTags[tagId] = false;
    } else {
      await addCallTag.mutateAsync({ id: call.id, tagId });
      selectedTags[tagId] = true;
    }
  };

  if (call) {
    const formatted = format(call.updatedAt, "d.M.yyyy 'at' HH:mm:ss");
    return (
      <div className="space-y-6">
        <Card className="border-0 rounded-sm gap-0">
          <CardHeader className="pb-0">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="w-10 h-10 bg-callops-gradient rounded-lg flex items-center justify-center">
                <PhoneIcon className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <span className="text-gray-900">{call.title}</span>
                <p className="text-sm text-gray-500 font-normal mt-1">
                  {formatted}
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <blockquote className="mt-6 border-l-2 pl-6 text-muted-foreground">
              {call.description ? call.description : "-- No Description"}
            </blockquote>
          </CardContent>
        </Card>
        <Card className="rounded-sm shadow-none">
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 justify-start">
              {call.callTags.map((tag) => (
                <Badge key={tag.id} variant="secondary" className="px-3">
                  {tag.name} <XCircleIcon />
                </Badge>
              ))}

              <CallTagsInput selectedTags={selectedTags} onSelect={onSelect} />
              {(addCallTag.isPending || removeCallTag.isPending) && <Loader />}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default CallOverview;
