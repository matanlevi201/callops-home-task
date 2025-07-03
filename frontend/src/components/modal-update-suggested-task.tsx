import { useModalStore, type ModalMap } from "@/stores/use-modal-store";
import SuggestedTaskForm from "@/components/suggested-task-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ModalUpdateSuggestedTaskProps {
  open: boolean;
  props: ModalMap["update:suggested:task"];
}

function ModalUpdateSuggestedTask({
  open,
  props,
}: ModalUpdateSuggestedTaskProps) {
  const { closeModal } = useModalStore();

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
              Update Task
            </DialogTitle>
          </div>
        </DialogHeader>

        <SuggestedTaskForm
          id={props.id}
          description={props.description}
          tagIds={props.tags}
        />
      </DialogContent>
    </Dialog>
  );
}

export default ModalUpdateSuggestedTask;
