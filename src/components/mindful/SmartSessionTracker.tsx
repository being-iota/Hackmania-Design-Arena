import React, { useState, useEffect } from 'react';
import { Clock, Heart, Sun, Moon, BarChart2 } from 'lucide-react';
import { useMindful } from '../../context/MindfulContext';

const SmartSessionTracker: React.FC = () => {
  const { watchTime, videosWatched, sessionStats } = useMindful();
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening'>('morning');
  const [showStats, setShowStats] = useState(false);

  // Update time of day
  useEffect(() => {
    const updateTimeOfDay = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) setTimeOfDay('morning');
      else if (hour >= 12 && hour < 17) setTimeOfDay('afternoon');
      else setTimeOfDay('evening');
    };

    updateTimeOfDay();
    const interval = setInterval(updateTimeOfDay, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  // Get progress bar color based on watch time
  const getProgressColor = () => {
    if (watchTime < 600) return 'from-green-500 to-emerald-500'; // 0-10 minutes
    if (watchTime < 1200) return 'from-yellow-500 to-orange-500'; // 10-20 minutes
    if (watchTime < 1800) return 'from-orange-500 to-red-500'; // 20-30 minutes
    return 'from-red-500 to-pink-500'; // 30+ minutes
  };

  // Format time
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours > 0 ? `${hours}h ` : ''}${minutes}m`;
  };

  // Get time icon based on time of day
  const getTimeIcon = () => {
    switch (timeOfDay) {
      case 'morning':
        return <Sun className="text-yellow-500" size={16} />;
      case 'afternoon':
        return <Sun className="text-orange-500" size={16} />;
      case 'evening':
        return <Moon className="text-indigo-500" size={16} />;
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Progress Bar */}
      <div 
        className={`h-1 bg-gradient-to-r ${getProgressColor()} transition-all duration-1000`}
        style={{ width: `${Math.min((watchTime / 3600) * 100, 100)}%` }}
      />

      {/* Session Info */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Time of Day */}
          <div className="flex items-center space-x-2">
            {getTimeIcon()}
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)}
            </span>
          </div>

          {/* Videos Watched */}
          <div className="flex items-center space-x-2">
            <Heart className="text-red-500" size={16} />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {videosWatched} videos
            </span>
          </div>
        </div>

        {/* Watch Time & Stats */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Clock className="text-blue-500" size={16} />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {formatTime(watchTime)}
            </span>
          </div>

          {/* Stats Button */}
          <button
            onClick={() => setShowStats(!showStats)}
            className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <BarChart2 className="text-purple-500" size={16} />
          </button>
        </div>
      </div>

      {/* Stats Popup */}
      {showStats && (
        <div className="absolute top-full right-4 mt-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 w-64 animate-fadeIn">
          <h3 className="font-medium text-gray-900 dark:text-white mb-3">Session Stats</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Total Time</span>
              <span className="text-gray-900 dark:text-white">{formatTime(watchTime)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Videos Watched</span>
              <span className="text-gray-900 dark:text-white">{videosWatched}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Mindful Breaks</span>
              <span className="text-gray-900 dark:text-white">{sessionStats.mindfulBreaks}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Last Break</span>
              <span className="text-gray-900 dark:text-white">
                {sessionStats.lastBreakTime 
                  ? formatTime(Math.floor((Date.now() - sessionStats.lastBreakTime) / 1000))
                  : 'None'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartSessionTracker; 