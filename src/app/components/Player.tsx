import React, { useState, useRef, useEffect } from 'react';
import { SimpleBackgroundVideo } from './SimpleBackgroundVideo';
import { useMusicStore } from '../store/musicStore';

interface PlayerProps {
  youtubeId: string;
  onPlayingChange?: (isPlaying: boolean) => void;
}

export function Player({ youtubeId, onPlayingChange }: PlayerProps) {
  const { isPlaying, setIsPlaying } = useMusicStore();
  const [isReady, setIsReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef<any>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      
      (window as any).onYouTubeIframeAPIReady = () => {
        initializePlayer();
      };
    } else {
      initializePlayer();
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy?.();
      }
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [youtubeId]);

  const initializePlayer = () => {
    if (playerRef.current) {
      playerRef.current.destroy();
    }

    playerRef.current = new (window as any).YT.Player('youtube-audio-player', {
      height: '0',
      width: '0',
      videoId: youtubeId,
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        iv_load_policy: 3,
        cc_load_policy: 0,
        playsinline: 1
      },
      events: {
        onReady: () => {
          setIsReady(true);
          if (isPlaying && playerRef.current?.playVideo) {
            playerRef.current.playVideo();
          }
          
          if (playerRef.current?.getDuration) {
            setDuration(playerRef.current.getDuration());
          }

          timerRef.current = setInterval(() => {
            if (playerRef.current?.getCurrentTime) {
              setCurrentTime(playerRef.current.getCurrentTime());
            }
          }, 1000);
        },
        onStateChange: (event: any) => {
          const isCurrentlyPlaying = event.data === (window as any).YT.PlayerState.PLAYING;
          if (isCurrentlyPlaying !== isPlaying) {
            setIsPlaying(isCurrentlyPlaying);
            onPlayingChange?.(isCurrentlyPlaying);
          }
        }
      }
    });
  };

  const handleTogglePlay = () => {
    if (!isReady || !playerRef.current) return;

    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error controlling YouTube player:', error);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (playerRef.current?.seekTo) {
      playerRef.current.seekTo(time, true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <div id="youtube-audio-player" style={{ display: 'none' }} />
      <SimpleBackgroundVideo youtubeId={youtubeId} isPlaying={isPlaying} />

      <div className="flex flex-col items-center gap-6 relative" style={{ zIndex: 100 }}>
        <div className="flex items-center gap-8">
          <button
            className="group relative flex items-center justify-center w-12 h-12 
                       text-white/80 hover:text-white transition-all duration-200 
                       transform hover:scale-110 active:scale-95"
            disabled
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
            </svg>
          </button>

          <button
            onClick={handleTogglePlay}
            disabled={!isReady}
            className={`group relative flex items-center justify-center w-20 h-20 
                       bg-white rounded-full shadow-2xl hover:shadow-3xl 
                       transition-all duration-300 transform hover:scale-105 active:scale-95
                       ${!isReady ? 'opacity-50 cursor-not-allowed' : ''}`}
            style={{
              boxShadow: `
                0 12px 40px rgba(255,255,255,0.3),
                0 4px 16px rgba(0,0,0,0.1),
                inset 0 1px 3px rgba(255,255,255,0.2)
              `
            }}
          >
            {!isReady ? (
              <svg 
                className="w-8 h-8 text-black animate-spin" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : !isPlaying ? (
              <svg 
                className="w-8 h-8 text-black ml-1 group-hover:text-gray-800 transition-colors" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z"/>
              </svg>
            ) : (
              <svg 
                className="w-8 h-8 text-black group-hover:text-gray-800 transition-colors" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            )}
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 
                            transition-opacity duration-300"></div>
          </button>

          <button
            className="group relative flex items-center justify-center w-12 h-12 
                       text-white/80 hover:text-white transition-all duration-200 
                       transform hover:scale-110 active:scale-95"
            disabled
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
            </svg>
          </button>
        </div>

        <div className="w-64 flex flex-col items-center gap-2">
          <div className="flex justify-between w-full text-[10px] font-light text-gray-400 px-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max={duration || 0} 
            value={currentTime} 
            onChange={handleSeek}
            className="w-full h-1 bg-gray-600 rounded-full appearance-none cursor-pointer accent-white"
            style={{
              background: `linear-gradient(to right, white ${ (currentTime/duration)*100 }%, #4b5563 ${ (currentTime/duration)*100 }%)`
            }}
          />
        </div>

        <p className="text-sm text-gray-400 font-light tracking-wide relative" style={{ zIndex: 100 }}>
          {!isReady ? 'Carregando...' : isPlaying ? 'Tocou Agora' : 'Toque para reproduzir'}
        </p>
      </div>
    </>
  );
}
