import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { TaskStatus } from '../../types/task';
import { TaskCard } from './TaskCard';
import { useTaskStore } from '../../store/taskStore';

const columnStyles: Record<TaskStatus, { bg: string; border: string; shadow: string }> = {
  'todo': {
    bg: 'bg-gray-50 dark:bg-gray-800/50',
    border: 'border-gray-200 dark:border-gray-700',
    shadow: 'shadow-gray-200/50 dark:shadow-gray-900/50'
  },
  'in-progress': {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800',
    shadow: 'shadow-blue-200/50 dark:shadow-blue-900/50'
  },
  'done': {
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-200 dark:border-green-800',
    shadow: 'shadow-green-200/50 dark:shadow-green-900/50'
  }
};

interface TaskColumnProps {
  status: TaskStatus;
  title: string;
}

export function TaskColumn({ status, title }: TaskColumnProps) {
  const tasks = useTaskStore((state) => 
    state.tasks.filter((task) => task.status === status)
  );
  const { setNodeRef, isOver } = useDroppable({ id: status });
  const styles = columnStyles[status];

  return (
    <div 
      className={`flex flex-col flex-shrink-0 w-full sm:w-[350px] rounded-lg p-3 sm:p-4 
        border ${styles.bg} ${styles.border} shadow-sm
        transition-all duration-200 hover:shadow-md ${styles.shadow}
        ${isOver ? 'ring-2 ring-blue-400 ring-opacity-50 scale-[1.02]' : ''}`}
    >
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h2 className="font-semibold text-gray-700 dark:text-gray-200">{title}</h2>
        <span className="px-2 py-1 text-xs font-medium bg-white dark:bg-gray-800 rounded-full text-gray-500 dark:text-gray-400 shadow-sm">
          {tasks.length}
        </span>
      </div>
      
      <div ref={setNodeRef} className="flex-1">
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2 sm:space-y-3">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
            {tasks.length === 0 && (
              <div className="text-sm text-gray-500 dark:text-gray-400 text-center py-8 sm:py-12 px-3 sm:px-4 border-2 border-dashed rounded-lg border-gray-200 dark:border-gray-700">
                Drop tasks here
              </div>
            )}
          </div>
        </SortableContext>
      </div>
    </div>
  );
}