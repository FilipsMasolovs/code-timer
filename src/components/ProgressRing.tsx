interface ProgressRingProps {
    progress: number;
    size?: number;
    strokeWidth?: number;
    children?: React.ReactNode;
    className?: string;
  }
  
  export const ProgressRing = ({
    progress,
    size = 300,
    strokeWidth = 6,
    children,
    className = 'stroke-blue-500',
  }: ProgressRingProps) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;
  
    return (
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            className="stroke-gray-200 dark:stroke-gray-700 transition-colors"
            fill="none"
            strokeWidth={strokeWidth}
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          {/* Progress circle */}
          <circle
            className={`${className} transition-all duration-200`}
            fill="none"
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={offset}
            strokeLinecap="round"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      </div>
    );
  };
  