import React from 'react';
import { useMindful } from '../../context/MindfulContext';
import { formatDistanceToNow } from 'date-fns';
import { Activity, Brain, Coffee } from 'lucide-react';

const SessionStats: React.FC = () => {
  const { sessionStats, isMindfulModeEnabled } = useMindful();
  
  if (!isMindfulModeEnabled) return null;

  const lastBreakTimeAgo = sessionStats.lastBreakTime
    ? formatDistanceToNow(sessionStats.lastBreakTime, { addSuffix: true })
    : 'No breaks yet';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mx-4 mb-4">
      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
        Session Insights
      </h3>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-1">
            <Activity size={16} className="text-blue-600 dark:text-blue-400" />
          </div>
          <span className="text-lg font-medium text-gray-900 dark:text-white">
            {sessionStats.totalMinutes}m
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Total Time
          </span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-1">
            <Coffee size={16} className="text-green-600 dark:text-green-400" />
          </div>
          <span className="text-lg font-medium text-gray-900 dark:text-white">
            {sessionStats.mindfulBreaks}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Breaks Taken
          </span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-1">
            <Brain size={16} className="text-purple-600 dark:text-purple-400" />
          </div>
          <span className="text-lg font-medium text-gray-900 dark:text-white">
            {Math.round((sessionStats.mindfulBreaks / Math.max(sessionStats.totalMinutes, 1)) * 100)}%
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Mindful Score
          </span>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Last break: {lastBreakTimeAgo}
        </p>
      </div>
    </div>
  );
};

export default SessionStats;