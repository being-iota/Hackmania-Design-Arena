import React, { useState, useEffect } from 'react';
import { X, Coffee, Sun, Moon } from 'lucide-react';
import { useMindful } from '../../context/MindfulContext';

const BreatherOverlay: React.FC = () => {
  const { setShouldShowBreather, lastBreakTime } = useMindful();
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening'>('morning');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setTimeOfDay('morning');
    else if (hour >= 12 && hour < 17) setTimeOfDay('afternoon');
    else setTimeOfDay('evening');

    const breathTimer = setInterval(() => {
      setBreathPhase(prev => {
        switch (prev) {
          case 'inhale': return 'hold';
          case 'hold': return 'exhale';
          case 'exhale': return 'inhale';
        }
      });
    }, 4000);

    return () => clearInterval(breathTimer);
  }, []);

  const getBreathMessage = () => {
    switch (breathPhase) {
      case 'inhale': return 'Breathe in...';
      case 'hold': return 'Hold...';
      case 'exhale': return 'Breathe out...';
    }
  };

  const getTimeMessage = () => {
    const minutesSinceBreak = Math.floor((Date.now() - lastBreakTime) / 60000);
    return `You've been watching for ${minutesSinceBreak} minutes`;
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-md w-full mx-4 relative">
        {/* Close button */}
        <button
          onClick={() => setShouldShowBreather(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Time of day icon */}
        <div className="flex justify-center mb-6">
          {timeOfDay === 'morning' ? (
            <Sun className="text-yellow-500" size={48} />
          ) : timeOfDay === 'afternoon' ? (
            <Sun className="text-orange-500" size={48} />
          ) : (
            <Moon className="text-indigo-500" size={48} />
          )}
        </div>

        {/* Breathing circle */}
        <div className="relative w-48 h-48 mx-auto mb-8">
          <div 
            className={`absolute inset-0 rounded-full border-4 transition-all duration-4000 ease-in-out ${
              breathPhase === 'inhale' 
                ? 'border-blue-500 scale-100' 
                : breathPhase === 'hold'
                ? 'border-blue-400 scale-110'
                : 'border-blue-300 scale-90'
            }`}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-medium text-gray-700 dark:text-gray-300">
              {getBreathMessage()}
            </span>
          </div>
        </div>

        {/* Time message */}
        <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
          {getTimeMessage()}
        </p>

        {/* Break suggestion */}
        <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400">
          <Coffee size={20} />
          <span>Time for a mindful break</span>
        </div>
      </div>
    </div>
  );
};

export default BreatherOverlay;