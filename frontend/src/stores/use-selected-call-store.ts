import type { Call } from "@/api/calls";
import { create } from "zustand";

interface SelectedCallStoreState {
  selectedCall: null | Call;
  unselectCall: () => void;
  setSelectedCall: (call: Call) => void;
}

export const useSelectedCallStore = create<SelectedCallStoreState>((set) => ({
  selectedCall: null,
  unselectCall: () => set(() => ({ selectedCall: null })),
  setSelectedCall: (call) => set(() => ({ selectedCall: call })),
}));
