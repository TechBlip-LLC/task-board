import { create } from 'zustand';
import { Task, TaskStatus } from '../types/task';

interface TaskStore {
  tasks: Task[];
  addTask: (title: string, description: string) => void;
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  deleteTask: (taskId: string) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask: (title, description) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          id: crypto.randomUUID(),
          title,
          description,
          status: 'todo',
          createdAt: new Date(),
        },
      ],
    })),
  updateTaskStatus: (taskId, status) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, status } : task
      ),
    })),
  deleteTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    })),
}));