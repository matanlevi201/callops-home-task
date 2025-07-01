import { useModalStore } from "@/stores/use-modal-store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import InputDefault from "@/components/input-default";
import InputTextarea from "@/components/input-textarea";
import useCallsMutations from "@/hooks/use-calls-mutations";
import z from "zod";
import { useForm } from "react-hook-form";
import Loader from "@/components/loader";

interface ModalCreateCallProps {
  open: boolean;
}

const createCallSchema = z.object({
  title: z.string().min(1, "Title is required."),
  description: z.string().optional(),
});

type CreateCallSchema = z.infer<typeof createCallSchema>;

function ModalCreateCall({ open }: ModalCreateCallProps) {
  const { closeModal } = useModalStore();
  const { createCall } = useCallsMutations();

  const form = useForm<CreateCallSchema>({
    resolver: zodResolver(createCallSchema),
    defaultValues: {
      title: "",
      description: undefined,
    },
  });

  const save = async (formValues: CreateCallSchema) => {
    await createCall.mutateAsync({
      title: formValues.title,
      description: formValues.description,
    });
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
              Create Call
            </DialogTitle>
          </div>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(save)}
            className="flex flex-col space-y-3"
          >
            <InputDefault
              label="Title"
              name="title"
              description="The call title"
              disabled={createCall.isPending}
            />
            <InputTextarea
              label="Description"
              name="description"
              description="The call description"
              disabled={createCall.isPending}
            />

            <Button
              type="submit"
              disabled={createCall.isPending}
              className="flex-1"
            >
              {createCall.isPending ? <Loader /> : <CheckIcon />}
              Create Call
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default ModalCreateCall;
