import { useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Timer as TimerIcon } from 'lucide-react';
import { usePomodoroStore } from '../../store/pomodoroStore';
import { useTaskStore } from '../../store/taskStore';
import { formatTime } from '../../utils/time';
import { playNotification } from '../../utils/sound';
import { Button } from '../ui/Button';

export function PomodoroTimer() {
  const { 
    timeLeft, 
    isRunning, 
    soundEnabled,
    activeTaskId,
    startTimer, 
    pauseTimer, 
    resetTimer, 
    tick,
    toggleSound 
  } = usePomodoroStore();

  const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);
  const activeTask = useTaskStore((state) => 
    state.tasks.find(task => task.id === activeTaskId)
  );

  useEffect(() => {
    let interval: number;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(tick, 1000);
    } else if (timeLeft === 0 && isRunning) {
      if (soundEnabled) {
        playNotification();
      }
      if (activeTaskId) {
        updateTaskStatus(activeTaskId, 'done');
      }
      resetTimer();
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, tick, soundEnabled, activeTaskId, updateTaskStatus, resetTimer]);

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg ring-1 ring-gray-900/5 transition-all duration-200">
        {activeTask ? (
          <div className="text-sm text-gray-600 dark:text-gray-300 hidden sm:block">
            <span className="text-gray-400 dark:text-gray-500">Working on:</span>{' '}
            <span className="font-medium">{activeTask.title}</span>
          </div>
        ) : (
          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <TimerIcon size={16} />
            <span>Pomodoro Timer</span>
          </div>
        )}
        
        <div className="flex items-center gap-3">
          <div className={`text-3xl font-mono font-bold min-w-[100px] text-center tabular-nums
            transition-colors duration-200
            ${timeLeft < 300 
              ? 'text-red-600 dark:text-red-400' 
              : isRunning 
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-700 dark:text-gray-200'
            }`}>
            {formatTime(timeLeft)}
          </div>
          
          <div className="flex gap-1.5">
            <button
              onClick={() => isRunning ? pauseTimer() : startTimer()}
              className={`p-2 rounded-full transition-all duration-200
                ${isRunning
                  ? 'bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-400 dark:hover:bg-blue-900'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600'
                }`}
              aria-label={isRunning ? 'Pause timer' : 'Start timer'}
            >
              {isRunning ? <Pause size={18} /> : <Play size={18} />}
            </button>
            
            <button
              onClick={resetTimer}
              className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-200
                dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
              disabled={timeLeft === 25 * 60}
              aria-label="Reset timer"
            >
              <RotateCcw size={18} />
            </button>
            
            <button
              onClick={toggleSound}
              className={`p-2 rounded-full transition-all duration-200
                ${soundEnabled
                  ? 'bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-400 dark:hover:bg-green-900'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600'
                }`}
              aria-label={soundEnabled ? 'Disable sound' : 'Enable sound'}
            >
              {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Test Sound Button */}
      <Button
        variant="secondary"
        onClick={playNotification}
        className="text-sm"
      >
        Test Sound
      </Button>
    </div>
  );
}