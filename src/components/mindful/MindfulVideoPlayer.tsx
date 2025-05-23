import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, Clock } from 'lucide-react';
import { useMindful } from '../../context/MindfulContext';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  channel: string;
  views: string;
  timeAgo: string;
}

interface MindfulVideoPlayerProps {
  video: Video;
}

const MindfulVideoPlayer: React.FC<MindfulVideoPlayerProps> = ({ video }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const { incrementVideosWatched } = useMindful();

  // Sample video URL - replace with actual video URL in production
  const videoUrl = `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/${video.id}.mp4`;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleEnded = () => {
      incrementVideosWatched();
      setIsPlaying(false);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, [incrementVideosWatched]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      className="relative w-full h-full group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-cover"
        poster={video.thumbnail}
        onClick={togglePlay}
      />

      {/* Video Info Overlay */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent">
        <h1 className="text-white text-lg font-medium">{video.title}</h1>
        <div className="flex items-center text-white/80 text-sm mt-1">
          <span>{video.views} views</span>
          <span className="mx-2">•</span>
          <span>{video.timeAgo}</span>
        </div>
      </div>

      {/* Controls Overlay */}
      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          {/* Progress Bar */}
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-white text-sm">{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-1 bg-white/30 rounded-full appearance-none cursor-pointer"
            />
            <span className="text-white text-sm">{formatTime(duration)}</span>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={togglePlay} className="text-white hover:text-white/80">
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
              <button onClick={toggleMute} className="text-white hover:text-white/80">
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
              </button>
              <div className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="text-white hover:text-white/80">
                <Settings size={24} />
              </button>
              <button className="text-white hover:text-white/80">
                <Maximize size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MindfulVideoPlayer; 