import React, { useState, useEffect } from 'react';
import { Clock, Coffee, Sun, Moon, Heart, Sparkles } from 'lucide-react';
import { useMindful } from '../../context/MindfulContext';

const SessionTimer: React.FC = () => {
  const { 
    watchTime, 
    videosWatched, 
    sessionStats,
    getSessionColor,
    shouldShowVisualCue 
  } = useMindful();
  const [showBreakPrompt, setShowBreakPrompt] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening'>('morning');
  const [showSessionStats, setShowSessionStats] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      // Update time of day
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) setTimeOfDay('morning');
      else if (hour >= 12 && hour < 17) setTimeOfDay('afternoon');
      else setTimeOfDay('evening');

      // Show break prompt every 20 minutes
      if (watchTime > 0 && watchTime % 1200 === 0) {
        setShowBreakPrompt(true);
        setTimeout(() => setShowBreakPrompt(false), 5000);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [watchTime]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours > 0 ? `${hours}h ` : ''}${minutes}m`;
  };

  const getTimeIcon = () => {
    switch (timeOfDay) {
      case 'morning': return <Sun className="text-yellow-500" size={16} />;
      case 'afternoon': return <Sun className="text-orange-500" size={16} />;
      case 'evening': return <Moon className="text-indigo-500" size={16} />;
    }
  };

  const getBreakMessage = () => {
    if (videosWatched >= 4) return "You've watched several videos. Time for a stretch?";
    if (watchTime >= 1800) return "You've been watching for a while. Care for a break?";
    return "Time for a mindful moment?";
  };

  return (
    <div className="fixed top-14 left-0 right-0 z-20">
      {/* Session progress bar */}
      <div 
        className={`h-0.5 bg-gradient-to-r ${getSessionColor()} transition-all duration-1000`}
        style={{ width: `${Math.min((watchTime / 3600) * 100, 100)}%` }} 
      />
      
      {/* Session info */}
      <div className="absolute top-2 right-4 flex items-center space-x-3">
        {/* Time indicator */}
        <div 
          className="flex items-center space-x-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm transition-all duration-300 hover:bg-white dark:hover:bg-gray-900 cursor-pointer"
          onClick={() => setShowSessionStats(!showSessionStats)}
        >
          {getTimeIcon()}
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {formatTime(watchTime)}
          </span>
        </div>

        {/* Videos watched indicator */}
        {videosWatched > 0 && (
          <div className="flex items-center space-x-1 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">
            <Heart className="text-red-500" size={14} />
            <span className="text-xs text-gray-700 dark:text-gray-300">
              {videosWatched}
            </span>
          </div>
        )}
      </div>

      {/* Break prompt */}
      {showBreakPrompt && (
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 animate-fadeIn">
          <Coffee className="text-blue-500" size={16} />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {getBreakMessage()}
          </span>
        </div>
      )}

      {/* Session stats popup */}
      {showSessionStats && (
        <div className="absolute top-12 right-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 w-64 animate-fadeIn">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-900 dark:text-white">Session Stats</h3>
            <Sparkles className="text-purple-500" size={16} />
          </div>
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
          </div>
        </div>
      )}

      {/* Visual cue for long sessions */}
      {shouldShowVisualCue && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent dark:from-black/5" />
        </div>
      )}
    </div>
  );
};

export default SessionTimer;