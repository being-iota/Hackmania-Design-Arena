import React from 'react';
import { Coffee, Clock, Heart, Sparkles, Play, Pause } from 'lucide-react';
import { useMindful } from '../../context/MindfulContext';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  channel: string;
}

interface MindfulRecommendationsProps {
  videos: Video[];
  onVideoSelect: (video: Video) => void;
}

const MindfulRecommendations: React.FC<MindfulRecommendationsProps> = ({ videos, onVideoSelect }) => {
  const { watchTime, videosWatched } = useMindful();

  // Get dynamic title based on watch time
  const getDynamicTitle = () => {
    if (watchTime < 600) return "Keep the momentum going";
    if (watchTime < 1200) return "Still enjoying? Stay mindful";
    if (watchTime < 1800) return "Time for a quick break?";
    return "Videos for a mindful pause";
  };

  // Get break card message based on watch time and videos watched
  const getBreakCardMessage = () => {
    if (videosWatched >= 4) {
      return "You've watched several videos. Time for a mindful moment?";
    }
    if (watchTime >= 1800) {
      return "You've been watching for a while. Care for a break?";
    }
    return "Take a deep breath and stretch. Here are some calming videos to help you reset.";
  };

  // Get mindful playlist suggestions based on watch time
  const getMindfulPlaylists = () => {
    if (watchTime < 1200) {
      return [
        { title: "Quick Mindful Moments", duration: "5-10 min", icon: <Play className="text-green-500" size={16} /> },
        { title: "Focus Boosters", duration: "10-15 min", icon: <Sparkles className="text-purple-500" size={16} /> }
      ];
    }
    return [
      { title: "Deep Breathing", duration: "5 min", icon: <Pause className="text-blue-500" size={16} /> },
      { title: "Mindful Stretching", duration: "10 min", icon: <Heart className="text-red-500" size={16} /> },
      { title: "Calm Focus", duration: "15 min", icon: <Sparkles className="text-purple-500" size={16} /> }
    ];
  };

  return (
    <div className="space-y-6 p-4">
      {/* Dynamic Title Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {getDynamicTitle()}
        </h2>
        <div className="flex items-center space-x-2">
          <Clock className="text-gray-500" size={18} />
          <span className="text-sm text-gray-500">
            {Math.floor(watchTime / 60)}m
          </span>
        </div>
      </div>

      {/* Break Card - Shows after 20 minutes */}
      {watchTime >= 1200 && (
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-4 animate-fadeIn">
          <div className="flex items-center space-x-3 mb-3">
            <Coffee className="text-blue-500" size={20} />
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
              Mindful Moment
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            {getBreakCardMessage()}
          </p>
          <div className="flex space-x-2">
            <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Take a Break
            </button>
            <button className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Video Recommendations */}
      <div className="grid gap-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="flex space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            onClick={() => onVideoSelect(video)}
          >
            <div className="relative w-40 h-24 rounded-lg overflow-hidden">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                {video.duration}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
                {video.title}
              </h3>
              <p className="text-xs text-gray-500 mt-1">{video.channel}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Heart className="text-red-500" size={14} />
                <span className="text-xs text-gray-500">Recommended for you</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mindful Playlists */}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
          Mindful Playlists
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {getMindfulPlaylists().map((playlist, index) => (
            <button
              key={index}
              className="p-3 bg-white dark:bg-gray-800 rounded-lg text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center space-x-2 mb-1">
                {playlist.icon}
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  {playlist.title}
                </h4>
              </div>
              <p className="text-xs text-gray-500">
                {playlist.duration}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MindfulRecommendations; 