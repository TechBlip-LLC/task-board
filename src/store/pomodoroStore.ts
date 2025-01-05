import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PomodoroState {
  timeLeft: number;
  isRunning: boolean;
  activeTaskId: string | null;
  soundEnabled: boolean;
}

interface PomodoroStore extends PomodoroState {
  startTimer: (taskId?: string) => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  tick: () => void;
  toggleSound: () => void;
  clearActiveTask: () => void;
}

const POMODORO_TIME = 25 * 60;

export const usePomodoroStore = create<PomodoroStore>()(
  persist(
    (set) => ({
      timeLeft: POMODORO_TIME,
      isRunning: false,
      activeTaskId: null,
      soundEnabled: true,
      startTimer: (taskId) => set((state) => ({ 
        isRunning: true,
        activeTaskId: taskId || state.activeTaskId
      })),
      pauseTimer: () => set({ isRunning: false }),
      resetTimer: () => set({ 
        timeLeft: POMODORO_TIME, 
        isRunning: false 
      }),
      tick: () => set((state) => ({ 
        timeLeft: Math.max(0, state.timeLeft - 1) 
      })),
      toggleSound: () => set((state) => ({ 
        soundEnabled: !state.soundEnabled 
      })),
      clearActiveTask: () => set({ activeTaskId: null }),
    }),
    {
      name: 'pomodoro-storage',
      partialize: (state) => ({ 
        soundEnabled: state.soundEnabled,
        activeTaskId: state.activeTaskId
      }),
    }
  )
);