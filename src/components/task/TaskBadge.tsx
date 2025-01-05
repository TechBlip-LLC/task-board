import { TaskStatus } from '../../types/task';

const badgeStyles: Record<TaskStatus, { bg: string; text: string }> = {
  'todo': {
    bg: 'bg-gray-100 dark:bg-gray-800',
    text: 'text-gray-700 dark:text-gray-300'
  },
  'in-progress': {
    bg: 'bg-blue-100 dark:bg-blue-900/50',
    text: 'text-blue-700 dark:text-blue-300'
  },
  'done': {
    bg: 'bg-green-100 dark:bg-green-900/50',
    text: 'text-green-700 dark:text-green-300'
  }
};

interface TaskBadgeProps {
  status: TaskStatus;
}

export function TaskBadge({ status }: TaskBadgeProps) {
  const label = status === 'in-progress' ? 'In Progress' : 
                status === 'todo' ? 'To Do' : 'Done';
  const styles = badgeStyles[status];
  
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
      ${styles.bg} ${styles.text} transition-colors duration-200`}>
      {label}
    </span>
  );
}