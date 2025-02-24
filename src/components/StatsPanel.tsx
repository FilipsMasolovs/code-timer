import { SessionStats } from '@/types';

interface StatsPanelProps {
  stats: SessionStats;
}

export const StatsPanel = ({ stats }: StatsPanelProps) => {
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mt-6 w-80">
      <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
        Statistics
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Sessions
          </p>
          <p className="text-xl font-mono font-semibold text-gray-800 dark:text-gray-100">
            {stats.totalSessions}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Today&apos;s Sessions
          </p>
          <p className="text-xl font-mono font-semibold text-gray-800 dark:text-gray-100">
            {stats.todaySessions}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Current Streak
          </p>
          <p className="text-xl font-mono font-semibold text-gray-800 dark:text-gray-100">
            {stats.currentStreak} days
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Time</p>
          <p className="text-xl font-mono font-semibold text-gray-800 dark:text-gray-100">
            {formatTime(stats.totalWorkTime)}
          </p>
        </div>
      </div>
    </div>
  );
};
