import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { TaskStatus } from '../types/task';
import { TaskCard } from './TaskCard';
import { useTaskStore } from '../store/taskStore';

const columnColors: Record<TaskStatus, string> = {
  'todo': 'bg-gray-50 border-gray-200',
  'in-progress': 'bg-blue-50 border-blue-200',
  'done': 'bg-green-50 border-green-200',
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

  return (
    <div className={`flex flex-col flex-1 min-w-[320px] rounded-lg p-4 border ${columnColors[status]} ${
      isOver ? 'ring-2 ring-blue-400 ring-opacity-50' : ''
    }`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-700">{title}</h2>
        <span className="text-sm text-gray-500">{tasks.length}</span>
      </div>
      <div ref={setNodeRef} className="flex-1">
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
            {tasks.length === 0 && (
              <div className="text-sm text-gray-500 text-center py-8">
                No tasks yet
              </div>
            )}
          </div>
        </SortableContext>
      </div>
    </div>
  );
}