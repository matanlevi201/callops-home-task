import { useModalStore } from "@/stores/use-modal-store";
import ModalCreateCall from "@/components/modal-create-call";
import ModalUpdateTag from "@/components/modal-update-tag";
import ModalCreateManualTask from "@/components/modal-create-manual-task";
import ModalUpdateSuggestedTask from "@/components/modal-update-suggested-task";

export function ModalManager() {
  const settings = useModalStore((state) => state.settings);

  switch (settings.name) {
    case "create:call":
      return <ModalCreateCall open={true} />;
    case "update:tag":
      return <ModalUpdateTag open={true} props={settings.props} />;
    case "create:manual:task":
      return <ModalCreateManualTask open={true} props={settings.props} />;
    case "update:suggested:task":
      return <ModalUpdateSuggestedTask open={true} props={settings.props} />;
    default:
      return;
  }
}
