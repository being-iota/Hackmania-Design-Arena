import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, Share, Save, MessageSquare } from 'lucide-react';
import { useMindful } from '../context/MindfulContext';
import MindfulVideoPlayer from '../components/mindful/MindfulVideoPlayer';
import MindfulRecommendations from '../components/mindful/MindfulRecommendations';
import BreatherOverlay from '../components/mindful/BreatherOverlay';

// Sample video data with real video URLs
const videoData = [
  {
    id: 'BigBuckBunny',
    title: 'Big Buck Bunny - Sample Video',
    channel: 'Blender Foundation',
    views: '2.3M',
    timeAgo: '2 years ago',
    thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
    duration: '9:56'
  },
  {
    id: 'ElephantsDream',
    title: 'Elephants Dream - Sample Video',
    channel: 'Orange Open Movie Project',
    views: '1.5M',
    timeAgo: '3 years ago',
    thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',
    duration: '10:53'
  },
  {
    id: 'Sintel',
    title: 'Sintel - Sample Video',
    channel: 'Blender Foundation',
    views: '3.1M',
    timeAgo: '1 year ago',
    thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg',
    duration: '14:48'
  },
  {
    id: 'TearsOfSteel',
    title: 'Tears of Steel - Sample Video',
    channel: 'Blender Foundation',
    views: '1.8M',
    timeAgo: '4 years ago',
    thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg',
    duration: '12:14'
  }
];

const Watch: React.FC = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get('v') || videoData[0].id;
  const video = videoData.find(v => v.id === videoId) || videoData[0];
  
  const { shouldShowBreather, setShouldShowBreather } = useMindful();
  const [currentVideo, setCurrentVideo] = useState(video);

  const handleVideoSelect = (video: typeof videoData[0]) => {
    setCurrentVideo(video);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
              <MindfulVideoPlayer video={currentVideo} />
            </div>

            {/* Video Info */}
            <div className="mt-4">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                {currentVideo.title}
              </h1>
              <div className="flex items-center justify-between mt-2">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {currentVideo.channel}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {currentVideo.views} views • {currentVideo.timeAgo}
                  </p>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                    <ThumbsUp size={20} />
                    <span className="text-sm">3.4K</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                    <ThumbsDown size={20} />
                    <span className="text-sm">Dislike</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                    <Share size={20} />
                    <span className="text-sm">Share</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                    <Save size={20} />
                    <span className="text-sm">Save</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                This is a sample video from the Blender Foundation. The video demonstrates various 
                animation techniques and visual effects. Watch more videos like this on our channel!
              </p>
            </div>

            {/* Comments */}
            <div className="mt-6">
              <div className="flex items-center space-x-2 mb-4">
                <MessageSquare size={20} className="text-gray-700 dark:text-gray-300" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Comments • 342
                </span>
              </div>

              {/* Sample Comment */}
              <div className="flex space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                <div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      User123
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                      2 days ago
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Great video! The animation quality is amazing. Looking forward to more content like this.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <MindfulRecommendations
              videos={videoData}
              onVideoSelect={handleVideoSelect}
            />
          </div>
        </div>
      </div>

      {/* Breather Overlay */}
      {shouldShowBreather && (
        <BreatherOverlay onClose={() => setShouldShowBreather(false)} />
      )}
    </div>
  );
};

export default Watch;