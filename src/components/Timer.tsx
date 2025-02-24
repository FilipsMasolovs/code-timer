/* eslint-disable @typescript-eslint/no-unused-expressions */
'use client';

import { useEffect, useState } from 'react';
import { useTimer } from '@/hooks/useTimer';
import { useTheme } from '@/contexts/ThemeContext';
import { SettingsModal } from './SettingsModal';
import { TimerDisplay } from './TimerDisplay';

export const Timer = () => {
  const {
    timeLeft,
    totalTime,
    isActive,
    timerState,
    settings,
    startTimer,
    pauseTimer,
    resetTimer,
    updateSettings,
  } = useTimer();
  const { theme, toggleTheme } = useTheme();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        isActive ? pauseTimer() : startTimer();
      } else if (e.code === 'KeyR') {
        resetTimer();
      } else if (e.code === 'KeyS') {
        setIsSettingsOpen(true);
      } else if (e.code === 'KeyD') {
        toggleTheme();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isActive, startTimer, pauseTimer, resetTimer, toggleTheme]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 mx-4 bg-white rounded-2xl shadow-lg dark:bg-gray-800 transition-all">
        <div className="text-center">
          <TimerDisplay
            timeLeft={timeLeft}
            totalTime={totalTime}
            timerState={timerState}
          />

          <div className="space-x-4 mt-8 mb-8">
            <button
              onClick={isActive ? pauseTimer : startTimer}
              className="px-8 py-3 text-lg font-medium rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            >
              {isActive ? 'Pause' : 'Start'}
            </button>
            <button
              onClick={resetTimer}
              className="px-8 py-3 text-lg font-medium rounded-lg bg-gray-500 text-white hover:bg-gray-600 transition-colors"
            >
              Reset
            </button>
          </div>

          <div className="flex justify-center space-x-6 text-sm">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
            >
              Settings (S)
            </button>
            <button
              onClick={toggleTheme}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
            >
              {theme === 'dark' ? 'Light Mode (D)' : 'Dark Mode (D)'}
            </button>
          </div>
        </div>
      </div>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSave={updateSettings}
      />
    </div>
  );
};


