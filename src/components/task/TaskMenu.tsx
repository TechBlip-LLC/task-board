import { MoreVertical } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/Button';

interface TaskMenuProps {
  onDelete: () => void;
}

export function TaskMenu({ onDelete }: TaskMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
      >
        <MoreVertical size={16} className="text-gray-500" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <Button
              variant="danger"
              onClick={() => {
                onDelete();
                setIsOpen(false);
              }}
              className="w-full justify-start rounded-none"
            >
              Delete Task
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}