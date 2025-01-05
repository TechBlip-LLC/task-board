import { useState } from 'react';
import { CalendarClock, Type, AlignLeft } from 'lucide-react';
import { Button } from '../../ui/Button';
import { FormInput } from './FormInput';
import { FormTextarea } from './FormTextarea';

interface TaskFormProps {
  onSubmit: (title: string, description: string) => void;
  onCancel: () => void;
}

export function TaskForm({ onSubmit, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim().length < 3) {
      setError('Title must be at least 3 characters long');
      return;
    }
    onSubmit(title.trim(), description.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        <FormInput
          label="Title"
          icon={<Type size={16} />}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError('');
          }}
          error={error}
          placeholder="What needs to be done?"
          autoFocus
          required
        />
        
        <FormTextarea
          label="Description"
          icon={<AlignLeft size={16} />}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add more details about this task..."
          rows={3}
        />

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <CalendarClock size={16} />
          <span>Created {new Date().toLocaleDateString()}</span>
        </div>
      </div>
      
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!title.trim()}
        >
          Create Task
        </Button>
      </div>
    </form>
  );
}