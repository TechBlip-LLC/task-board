import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();
  
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-colors duration-200
        hover:bg-gray-100 dark:hover:bg-gray-800
        text-gray-600 dark:text-gray-400"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon size={20} className="hover:text-blue-600 transition-colors" />
      ) : (
        <Sun size={20} className="hover:text-yellow-400 transition-colors" />
      )}
    </button>
  );
}