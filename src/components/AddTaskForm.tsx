import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from './ui/Button';
import { TaskModal } from './task/modal/TaskModal';

export function AddTaskForm() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6">
      <Button onClick={() => setIsOpen(true)}>
        <Plus size={16} className="mr-2" />
        Add New Task
      </Button>

      <TaskModal 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}