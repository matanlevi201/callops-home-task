import type { Call } from "@/api/calls";
import { queryClient } from "@/main";
import { create } from "zustand";

interface SelectedCallStoreState {
  selectedCall: null | Call;
  unselectCall: () => void;
  setSelectedCall: (call: Call) => void;
  updateSelectedCall: () => void;
}

export const useSelectedCallStore = create<SelectedCallStoreState>((set) => ({
  selectedCall: null,
  unselectCall: () => set(() => ({ selectedCall: null })),
  setSelectedCall: (call) => set(() => ({ selectedCall: call })),
  updateSelectedCall: () =>
    set((state) => {
      const calls = queryClient.getQueryData<Call[]>(["get_calls"]);
      const updatedSelectedCall = calls?.find(
        (call) => call.id === state.selectedCall?.id
      );
      return { selectedCall: updatedSelectedCall ?? state.selectedCall };
    }),
}));
