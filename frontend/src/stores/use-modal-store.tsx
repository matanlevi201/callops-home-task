import { create } from "zustand";

export type ModalMap = {
  ["none"]: null;
  ["create:call"]: undefined;
  ["update:tag"]: { id: string; name: string };
  ["create:manual:task"]: { callId: string; description: string };
  ["update:suggested:task"]: {
    id: string;
    description: string;
    tags: string[];
  };
};

type ModalName = keyof ModalMap;

type ModalSettings = {
  [K in ModalName]: { name: K; props: ModalMap[K] };
}[ModalName];

interface ModalState {
  settings: ModalSettings;
  setActiveModal: <K extends ModalName>(name: K, props: ModalMap[K]) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  settings: { name: "none", props: null },
  setActiveModal: (name, props) =>
    set(() => ({ settings: { name, props } as ModalSettings })),
  closeModal: () => set(() => ({ settings: { name: "none", props: null } })),
}));
