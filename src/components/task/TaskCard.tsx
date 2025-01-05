import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Timer } from 'lucide-react';
import { Task } from '../../types/task';
import { useTaskStore } from '../../store/taskStore';
import { usePomodoroStore } from '../../store/pomodoroStore';
import { TaskBadge } from './TaskBadge';
import { TaskMenu } from './TaskMenu';
import { formatDate } from '../../utils/date';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const { startTimer, activeTaskId } = usePomodoroStore();
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isActive = activeTaskId === task.id;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border 
        group hover:shadow-md transition-all duration-200
        ${isActive 
          ? 'border-blue-300 dark:border-blue-700 ring-2 ring-blue-100 dark:ring-blue-900' 
          : 'border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800'}`}
    >
      <div className="flex items-start gap-2">
        <div
          {...attributes}
          {...listeners}
          className="mt-1 cursor-move opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <GripVertical size={16} className="text-gray-400 dark:text-gray-500" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">
              {task.title}
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => startTimer(task.id)}
                className={`p-1 rounded-full transition-colors
                  ${isActive 
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50 hover:bg-blue-100 dark:hover:bg-blue-900' 
                    : 'text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                title={isActive ? 'Currently tracking' : 'Start timer for this task'}
              >
                <Timer size={16} />
              </button>
              <TaskMenu onDelete={() => deleteTask(task.id)} />
            </div>
          </div>
          {task.description && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2 hover:line-clamp-none">
              {task.description}
            </p>
          )}
          <div className="mt-3 flex items-center justify-between">
            <TaskBadge status={task.status} />
            <time 
              className="text-xs text-gray-500 dark:text-gray-400" 
              dateTime={task.createdAt.toISOString()}
              title={task.createdAt.toLocaleString()}
            >
              {formatDate(task.createdAt)}
            </time>
          </div>
        </div>
      </div>
    </div>
  );
}