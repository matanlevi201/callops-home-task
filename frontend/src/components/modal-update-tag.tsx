import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModalStore, type ModalMap } from "@/stores/use-modal-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useTagsMutations from "@/hooks/use-tags-mutations";
import InputDefault from "@/components/input-default";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Loader from "@/components/loader";
import { CheckIcon } from "lucide-react";
import { z } from "zod";

interface ModalUpdateTagProps {
  open: boolean;
  props: ModalMap["update:tag"];
}

const updateTagSchema = z.object({
  name: z.string().min(1, "Name is required."),
});

type UpdateTagSchema = z.infer<typeof updateTagSchema>;

function ModalUpdateTag({ open, props }: ModalUpdateTagProps) {
  const { closeModal } = useModalStore();
  const { updateTag } = useTagsMutations();

  const form = useForm<UpdateTagSchema>({
    resolver: zodResolver(updateTagSchema),
    defaultValues: {
      name: props.name,
    },
  });

  const save = async (formValues: UpdateTagSchema) => {
    await updateTag.mutateAsync({
      id: props.id,
      tag: { name: formValues.name },
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
              Update Tag
            </DialogTitle>
          </div>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(save)}
            className="flex flex-col space-y-3"
          >
            <InputDefault
              label="Name"
              name="name"
              description="The tag name"
              disabled={updateTag.isPending}
            />

            <Button
              type="submit"
              disabled={updateTag.isPending}
              className="flex-1"
            >
              {updateTag.isPending ? <Loader /> : <CheckIcon />}
              Update Tag
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default ModalUpdateTag;
