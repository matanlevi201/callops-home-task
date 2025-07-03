import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import InputTextarea from "@/components/input-textarea";
import { Button } from "@/components/ui/button";
import InputTags from "@/components/input-tags";
import useTagsQuery from "@/hooks/use-tags-query";
import Loader from "@/components/loader";
import useSuggestedTasksMutations from "@/hooks/use-suggested-tasks-mutations";
import { CheckIcon } from "lucide-react";

const suggestedTaskFormSchema = z.object({
  description: z.string().min(3, "Description is too short."),
  tagIds: z.array(z.string()),
});

type SuggestedTaskFormSchema = z.infer<typeof suggestedTaskFormSchema>;

function SuggestedTaskForm() {
  const { data: tags = [], isPending, isError } = useTagsQuery();
  const { createSuggestedTask } = useSuggestedTasksMutations();
  const form = useForm<SuggestedTaskFormSchema>({
    resolver: zodResolver(suggestedTaskFormSchema),
    defaultValues: {
      description: "",
      tagIds: [],
    },
  });

  const submit = async (formValues: SuggestedTaskFormSchema) => {
    await createSuggestedTask.mutateAsync(formValues);
    form.reset();
  };

  if (isPending) return <Loader />;
  if (isError) return;

  const tagsOptions = tags.map((tag) => ({ value: tag.id, label: tag.name }));
  console.log("SuggestedTaskForm");
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submit)}
        className="flex flex-col space-y-3"
      >
        <InputTextarea
          label="Description"
          name="description"
          placeholder="The task description..."
          description="Please enter the task description"
          disabled={createSuggestedTask.isPending}
        />
        <InputTags
          name="tagIds"
          label="Tags"
          description="Choose a tags related to the task"
          tagsOptions={tagsOptions}
          disabled={createSuggestedTask.isPending}
        />

        <Button
          disabled={createSuggestedTask.isPending}
          type="submit"
          className="flex-1"
        >
          {createSuggestedTask.isPending ? <Loader /> : <CheckIcon />}
          Create Task
        </Button>
      </form>
    </Form>
  );
}

export default SuggestedTaskForm;
