import React, { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Clock, ThumbsUp, Film } from 'lucide-react';
import { useMindful } from '../context/MindfulContext';
import SessionStats from '../components/mindful/SessionStats';

// Use the same video data as Watch page for consistency
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

const categories = [
  'All',
  'Trending',
  'Music',
  'Gaming',
  'Live',
  'News',
  'Sports',
  'Learning',
  'Podcasts',
  'Recently uploaded',
  'Watched',
];

const Home: React.FC = () => {
  const { isMindfulModeEnabled, watchTime } = useMindful();
  const showMindfulSuggestions = isMindfulModeEnabled && watchTime > 900;
  // Get searchQuery from Outlet context
  const { searchQuery = '' } = useOutletContext<{ searchQuery?: string }>() || {};
  const filteredVideos = videoData.filter(
    v =>
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.channel.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Categories/Chips */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Recommended</h1>
      {filteredVideos.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-16 text-lg">No results found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredVideos.map((video) => (
            <Link
              key={video.id}
              to={`/watch?v=${video.id}`}
              className="group block rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow hover:shadow-lg transition-all"
            >
              <div className="relative w-full aspect-video bg-black">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded">
                  {video.duration}
                </span>
              </div>
              <div className="p-3">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-2 mb-1">
                  {video.title}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">{video.channel}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {video.views} views • {video.timeAgo}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;