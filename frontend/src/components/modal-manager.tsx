import { useModalStore } from "@/stores/use-modal-store";
import ModalCreateCall from "@/components/modal-create-call";
import ModalUpdateTag from "@/components/modal-update-tag";

export function ModalManager() {
  const settings = useModalStore((state) => state.settings);

  switch (settings.name) {
    case "create:call":
      return <ModalCreateCall open={true} />;
    case "update:tag":
      return <ModalUpdateTag open={true} props={settings.props} />;
    default:
      return;
  }
}
