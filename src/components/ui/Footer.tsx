import { Code2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <p>
            Copyright © 2025 Ed Bates (TECHBLIP LLC)
          </p>
          <p className="text-xs">
            This software is released under the MIT License. See the LICENSE file for details
          </p>
        </div>
      </div>
    </footer>
  );
}