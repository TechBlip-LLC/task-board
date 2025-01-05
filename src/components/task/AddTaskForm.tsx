import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useTaskStore } from '../../store/taskStore';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';

export function AddTaskForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const addTask = useTaskStore((state) => state.addTask);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim().length < 3) {
      setError('Title must be at least 3 characters long');
      return;
    }
    addTask(title.trim(), description.trim());
    setTitle('');
    setDescription('');
    setError('');
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} className="mb-6">
        <Plus size={16} className="mr-2" />
        Add New Task
      </Button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">Create New Task</h3>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-gray-500 transition-colors"
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="space-y-4">
        <Input
          label="Title"
          required
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError('');
          }}
          error={error}
          placeholder="Enter task title"
          autoFocus
        />
        
        <Textarea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description (optional)"
          rows={3}
        />
        
        <div className="flex justify-end gap-2 pt-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button type="submit">
            Create Task
          </Button>
        </div>
      </div>
    </form>
  );
}