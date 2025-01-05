import { DndContext, DragEndEvent, closestCorners } from '@dnd-kit/core';
import { ListChecks } from 'lucide-react';
import { TaskColumn } from './components/task/TaskColumn';
import { AddTaskForm } from './components/AddTaskForm';
import { Header } from './components/Header';
import { Footer } from './components/ui/Footer';
import { useTaskStore } from './store/taskStore';
import { useThemeStore } from './store/themeStore';
import { TaskStatus } from './types/task';

const columns: { status: TaskStatus; title: string }[] = [
  { status: 'todo', title: 'To Do' },
  { status: 'in-progress', title: 'In Progress' },
  { status: 'done', title: 'Done' },
];

export default function App() {
  const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);
  const theme = useThemeStore((state) => state.theme);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      updateTaskStatus(active.id as string, over.id as TaskStatus);
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200 flex flex-col">
        <Header />

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 overflow-hidden">
          <AddTaskForm />
          
          <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
              {columns.map(({ status, title }) => (
                <TaskColumn key={status} status={status} title={title} />
              ))}
            </div>
          </DndContext>

          <div className="mt-6 sm:mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            <p className="flex items-center justify-center gap-2">
              <ListChecks className="h-4 w-4" />
              Drag and drop tasks between columns to update their status
            </p>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}