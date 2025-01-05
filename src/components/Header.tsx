import { Layout } from 'lucide-react';
import { useTaskStore } from '../store/taskStore';
import { PomodoroTimer } from './pomodoro/PomodoroTimer';
import { ThemeToggle } from './ui/ThemeToggle';

export function Header() {
  const taskCount = useTaskStore((state) => state.tasks.length);
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Layout className="h-6 w-6 text-blue-600 dark:text-blue-500" />
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">EBA Task Board</h1>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{today}</span>
            </div>
            <div className="flex items-center gap-3 sm:hidden">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {taskCount} {taskCount === 1 ? 'task' : 'tasks'}
              </div>
              <ThemeToggle />
            </div>
          </div>
          
          <div className="flex-1 flex items-center justify-between sm:justify-end gap-4">
            <PomodoroTimer />
            <div className="hidden sm:flex items-center gap-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {taskCount} {taskCount === 1 ? 'task' : 'tasks'}
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}