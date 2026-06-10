"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ViewMode = "creative" | "recruiter";

interface AppState {
  mode: ViewMode;
  setMode: (mode: ViewMode) => void;
  introDone: boolean;
  finishIntro: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      mode: "creative",
      setMode: (mode) => set({ mode }),
      // intro plays once per page load, never persisted
      introDone: false,
      finishIntro: () => set({ introDone: true }),
    }),
    {
      name: "vk-portfolio",
      partialize: (state) => ({ mode: state.mode }),
    }
  )
);
