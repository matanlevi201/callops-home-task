import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ClipboardListIcon,
  LightbulbIcon,
  PhoneIcon,
  PlusIcon,
  TagsIcon,
} from "lucide-react";
import { format } from "date-fns";
import { isSuggestedTask, type Call } from "@/api/calls";
import { Badge } from "@/components/ui/badge";
import CallTagsInput from "@/components/call-tags-input";
import useCallsMutations from "@/hooks/use-calls-mutations";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/stores/use-modal-store";
import useTasksMutations from "@/hooks/use-tasks-mutations";
import AssignedTaskItem from "@/components/assigned-task-item";
import SuggestedTaskItem from "@/components/suggested-task-item";
import { useMemo } from "react";
import useSuggestedTasksQuery from "@/hooks/use-suggested-tasks-query";
import useSuggestedTasksMutations from "@/hooks/use-suggested-tasks-mutations";

function CallOverview({ call }: { call: Call }) {
  const { addCallTag, removeCallTag } = useCallsMutations();
  const { updateTask } = useTasksMutations();
  const { updateSuggestedTaskStatus } = useSuggestedTasksMutations();
  const setActiveModal = useModalStore((state) => state.setActiveModal);
  const { data: suggestedTasks = [], isPending } = useSuggestedTasksQuery();

  const selectedTags = call.callTags.reduce((acc, tag) => {
    acc[tag.id] = true;
    return acc;
  }, {} as Record<string, boolean>);

  const suggestedTasksMap = useMemo(() => {
    return call.suggestedTasks.reduce((acc, suggestedTask) => {
      acc[suggestedTask.id] = true;
      return acc;
    }, {} as Record<string, boolean>);
  }, [call.suggestedTasks]);

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
            <CardTitle className="flex items-center gap-3">
              <div className="w-10 h-10 b bg-accent rounded-lg flex items-center justify-center">
                <TagsIcon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <span className="text-gray-900">Tags</span>
                <p className="text-sm text-gray-500 font-normal mt-1">
                  Assigned tags
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap justify-start">
              {call.callTags.map((tag) => (
                <Badge key={tag.id} variant="secondary" className="px-3">
                  {tag.name}
                </Badge>
              ))}

              <CallTagsInput selectedTags={selectedTags} onSelect={onSelect} />
              {(addCallTag.isPending || removeCallTag.isPending) && <Loader />}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-sm shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-10 h-10 b bg-accent rounded-lg flex items-center justify-center">
                <ClipboardListIcon className="h-5 w-5 " />
              </div>
              <div className="flex-1">
                <span className="text-gray-900">Assigned Tasks</span>
                <p className="text-sm text-gray-500 font-normal mt-1">
                  {call.tasks.length + call.suggestedTasks.length} Assigned
                  tasks
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              {[...call.tasks, ...call.suggestedTasks].map((task) => (
                <AssignedTaskItem
                  key={task.id}
                  callId={call.id}
                  task={task}
                  updateTask={
                    isSuggestedTask(task)
                      ? updateSuggestedTaskStatus
                      : updateTask
                  }
                />
              ))}
            </div>

            <Button
              variant="outline"
              className="w-full border-dashed bg-accent border-foreground/15 hover:border-foreground"
              onClick={() =>
                setActiveModal("create:manual:task", {
                  callId: call.id,
                  description: "",
                })
              }
            >
              <PlusIcon /> Add Manual Task
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-sm shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-10 h-10 b  bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <LightbulbIcon className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <span className="text-gray-900">Suggested tasks</span>
                <p className="text-sm text-gray-500 font-normal mt-1">
                  Powered by admin
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4 ">
              {isPending ? (
                <Loader />
              ) : (
                suggestedTasks.map((suggestedTask) => (
                  <SuggestedTaskItem
                    key={suggestedTask.id}
                    callId={call.id}
                    suggestedTask={suggestedTask}
                    isAssigned={suggestedTasksMap[suggestedTask.id]}
                  />
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default CallOverview;
