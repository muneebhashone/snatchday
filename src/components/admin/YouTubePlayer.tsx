"use client";

import { useState, useEffect } from 'react';

interface YouTubePlayerProps {
  youtubeUrl: string;
  className?: string;
}

export function YouTubePlayer({ youtubeUrl, className = "" }: YouTubePlayerProps) {
  const [showIframe, setShowIframe] = useState(false);
  const [videoId, setVideoId] = useState<string | null>(null);

  useEffect(() => {
    // Extract video ID from various YouTube URL formats
    const extractVideoId = (url: string): string | null => {
      // Regular expressions to match various YouTube URL formats
      const regexes = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\?\/]+)/,
        /youtube\.com\/watch\?.*v=([^&]+)/,
        /youtube\.com\/shorts\/([^&\?\/]+)/
      ];

      for (const regex of regexes) {
        const match = url.match(regex);
        if (match && match[1]) {
          return match[1];
        }
      }
      return null;
    };

    if (youtubeUrl) {
      const id = extractVideoId(youtubeUrl);
      setVideoId(id);
    }
  }, [youtubeUrl]);

  if (!videoId) {
    return <div className="text-sm text-red-500">Invalid YouTube URL</div>;
  }

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const iframeUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  return (
    <div className={`w-full mx-auto aspect-video relative ${className}`}>
      {showIframe ? (
        <iframe
          className="w-full h-full"
          src={iframeUrl}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      ) : (
        <div
          className="cursor-pointer w-full h-full"
          onClick={() => setShowIframe(true)}
        >
          <img
            src={thumbnailUrl}
            alt="Video thumbnail"
            className="w-full h-full object-cover rounded-md"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="bg-white bg-opacity-80 rounded-full p-4 shadow-lg text-black font-bold hover:bg-opacity-100 transition-all">
              ▶
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default YouTubePlayer; 