import useTagsMutations from "@/hooks/use-tags-mutations";
import { useModalStore, type ModalMap } from "@/stores/use-modal-store";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { cn } from "@/lib/utils";
import { Form } from "@/components/ui/form";
import InputTextarea from "@/components/input-textarea";
import { Button } from "@/components/ui/button";
import Loader from "@/components/loader";
import { CheckIcon } from "lucide-react";
import { useForm } from "react-hook-form";

interface ModalCreateManualTaskProps {
  open: boolean;
  props: ModalMap["create:manual:task"];
}

const createManualTaskSchema = z.object({
  description: z
    .string()
    .min(5, "Description is too short. It must be at least 5 characters long."),
});

type CreateManualTaskSchema = z.infer<typeof createManualTaskSchema>;

function ModalCreateManualTask({ open, props }: ModalCreateManualTaskProps) {
  const { closeModal } = useModalStore();
  const { updateTag } = useTagsMutations();

  const form = useForm<CreateManualTaskSchema>({
    resolver: zodResolver(createManualTaskSchema),
    defaultValues: {
      description: props.description ?? "",
    },
  });

  const save = async (formValues: CreateManualTaskSchema) => {
    console.log(formValues);
    closeModal();
  };

  return (
    <Dialog open={open} onOpenChange={closeModal} modal={false}>
      <div
        className={cn(
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50"
        )}
      />
      <DialogContent className="flex flex-col">
        <DialogHeader className="text-left">
          <div className="flex items-center">
            <DialogTitle className="text-xl flex items-center">
              Create Manual Task
            </DialogTitle>
          </div>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(save)}
            className="flex flex-col space-y-3"
          >
            <InputTextarea
              label="Description"
              name="description"
              placeholder="The task description..."
              description="Please enter the task description"
              disabled={updateTag.isPending}
            />

            <Button
              type="submit"
              disabled={updateTag.isPending}
              className="flex-1"
            >
              {updateTag.isPending ? <Loader /> : <CheckIcon />}
              Create Manual Task
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default ModalCreateManualTask;
