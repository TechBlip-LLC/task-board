import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2, GripVertical } from 'lucide-react';
import { Task } from '../types/task';
import { useTaskStore } from '../store/taskStore';
import { TaskBadge } from './TaskBadge';
import { formatDate } from '../utils/date';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const deleteTask = useTaskStore((state) => state.deleteTask);
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

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 group hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-start gap-2">
        <div
          {...attributes}
          {...listeners}
          className="mt-1 cursor-move opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <GripVertical size={16} className="text-gray-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-medium text-gray-900 truncate">{task.title}</h3>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={16} />
            </button>
          </div>
          {task.description && (
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{task.description}</p>
          )}
          <div className="mt-3 flex items-center justify-between">
            <TaskBadge status={task.status} />
            <time className="text-xs text-gray-500" dateTime={task.createdAt.toISOString()}>
              {formatDate(task.createdAt)}
            </time>
          </div>
        </div>
      </div>
    </div>
  );
}