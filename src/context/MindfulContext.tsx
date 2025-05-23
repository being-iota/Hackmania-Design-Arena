import React, { createContext, useContext, useState, useEffect } from 'react';

interface MindfulContextType {
  isMindfulModeEnabled: boolean;
  toggleMindfulMode: () => void;
  shouldShowBreather: boolean;
  setShouldShowBreather: (show: boolean) => void;
  watchTime: number;
  resetWatchTime: () => void;
  lastBreakTime: number;
  setLastBreakTime: (time: number) => void;
  videosWatched: number;
  incrementVideosWatched: () => void;
  sessionStats: {
    totalMinutes: number;
    mindfulBreaks: number;
    lastBreakTime: number | null;
  };
  addMindfulBreak: () => void;
  getSessionColor: () => string;
  shouldShowVisualCue: boolean;
}

const MindfulContext = createContext<MindfulContextType | undefined>(undefined);

export const MindfulProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMindfulModeEnabled, setIsMindfulModeEnabled] = useState(false);
  const [shouldShowBreather, setShouldShowBreather] = useState(false);
  const [watchTime, setWatchTime] = useState(0);
  const [lastBreakTime, setLastBreakTime] = useState(Date.now());
  const [videosWatched, setVideosWatched] = useState(0);
  const [sessionStats, setSessionStats] = useState({
    totalMinutes: 0,
    mindfulBreaks: 0,
    lastBreakTime: null as number | null,
  });

  // Load mindful mode preference from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('mindfulMode');
    if (savedMode) {
      setIsMindfulModeEnabled(savedMode === 'true');
    }
  }, []);

  // Save mindful mode preference to localStorage
  useEffect(() => {
    localStorage.setItem('mindfulMode', isMindfulModeEnabled.toString());
  }, [isMindfulModeEnabled]);

  // Track watch time and session stats
  useEffect(() => {
    if (!isMindfulModeEnabled) return;

    const timer = setInterval(() => {
      setWatchTime(prev => prev + 1);
      setSessionStats(prev => ({
        ...prev,
        totalMinutes: Math.floor((prev.totalMinutes * 60 + 1) / 60),
      }));

      // Show breather every 20 minutes
      if (watchTime > 0 && watchTime % 1200 === 0) {
        setShouldShowBreather(true);
        setLastBreakTime(Date.now());
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isMindfulModeEnabled, watchTime]);

  // Check if we should show a breather based on videos watched
  useEffect(() => {
    if (videosWatched > 0 && videosWatched % 4 === 0 && isMindfulModeEnabled) {
      setShouldShowBreather(true);
    }
  }, [videosWatched, isMindfulModeEnabled]);

  const toggleMindfulMode = () => {
    setIsMindfulModeEnabled(prev => !prev);
    if (!isMindfulModeEnabled) {
      setWatchTime(0);
      setLastBreakTime(Date.now());
      setVideosWatched(0);
      setSessionStats({
        totalMinutes: 0,
        mindfulBreaks: 0,
        lastBreakTime: null,
      });
    }
  };

  const resetWatchTime = () => {
    setWatchTime(0);
    setLastBreakTime(Date.now());
  };

  const incrementVideosWatched = () => {
    setVideosWatched(prev => prev + 1);
  };

  const addMindfulBreak = () => {
    setSessionStats(prev => ({
      ...prev,
      mindfulBreaks: prev.mindfulBreaks + 1,
      lastBreakTime: Date.now(),
    }));
  };

  const getSessionColor = () => {
    if (watchTime < 600) return 'from-green-500 to-emerald-500'; // 0-10 minutes
    if (watchTime < 1200) return 'from-yellow-500 to-orange-500'; // 10-20 minutes
    if (watchTime < 1800) return 'from-orange-500 to-red-500'; // 20-30 minutes
    return 'from-red-500 to-pink-500'; // 30+ minutes
  };

  const shouldShowVisualCue = watchTime > 1800 || videosWatched > 3;

  return (
    <MindfulContext.Provider
      value={{
        isMindfulModeEnabled,
        toggleMindfulMode,
        shouldShowBreather,
        setShouldShowBreather,
        watchTime,
        resetWatchTime,
        lastBreakTime,
        setLastBreakTime,
        videosWatched,
        incrementVideosWatched,
        sessionStats,
        addMindfulBreak,
        getSessionColor,
        shouldShowVisualCue,
      }}
    >
      {children}
    </MindfulContext.Provider>
  );
};

export const useMindful = () => {
  const context = useContext(MindfulContext);
  if (context === undefined) {
    throw new Error('useMindful must be used within a MindfulProvider');
  }
  return context;
};