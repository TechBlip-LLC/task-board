import { TaskStatus } from '../types/task';

const badgeStyles: Record<TaskStatus, string> = {
  'todo': 'bg-gray-100 text-gray-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  'done': 'bg-green-100 text-green-800',
};

interface TaskBadgeProps {
  status: TaskStatus;
}

export function TaskBadge({ status }: TaskBadgeProps) {
  const label = status === 'in-progress' ? 'In Progress' : 
                status === 'todo' ? 'To Do' : 'Done';
  
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${badgeStyles[status]}`}>
      {label}
    </span>
  );
}