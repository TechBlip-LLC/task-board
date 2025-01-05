import { Dialog } from '@headlessui/react';
import { X, ListPlus, Sparkles } from 'lucide-react';
import { TaskForm } from './TaskForm';
import { useTaskStore } from '../../../store/taskStore';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TaskModal({ isOpen, onClose }: TaskModalProps) {
  const addTask = useTaskStore((state) => state.addTask);

  const handleSubmit = (title: string, description: string) => {
    addTask(title, description);
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 backdrop-blur-sm transition-opacity" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-lg w-full">
          <div className="relative transform overflow-hidden rounded-xl bg-white shadow-2xl transition-all">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2">
              <div className="relative">
                <div className="absolute -inset-3 animate-pulse rounded-full bg-blue-500/20" />
                <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-3 shadow-lg ring-4 ring-white">
                  <ListPlus size={24} className="text-white" />
                </div>
              </div>
            </div>
            
            <div className="px-8 pt-8 pb-6">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <Dialog.Title className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                    New Task
                    <Sparkles size={20} className="text-blue-500" />
                  </Dialog.Title>
                  <Dialog.Description className="mt-1 text-sm text-gray-500">
                    Add a new task to your board
                  </Dialog.Description>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500 transition-colors p-1 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
              
              <TaskForm onSubmit={handleSubmit} onCancel={onClose} />
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}