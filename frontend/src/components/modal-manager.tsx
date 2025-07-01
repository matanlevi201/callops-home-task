import { useModalStore } from "@/stores/use-modal-store";
import ModalCreateCall from "@/components/modal-create-call";

export function ModalManager() {
  const { settings } = useModalStore();

  switch (settings.name) {
    case "create:call":
      return <ModalCreateCall open={true} />;
    default:
      return;
  }
}
