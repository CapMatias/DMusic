import React, { useState, useRef, useEffect } from 'react';

interface PlayerProps {
  musicPath: string;
  onSongEnd?: () => void;
  autoPlay?: boolean;
}

export function Player({ musicPath, onSongEnd, autoPlay }: PlayerProps) {
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [displayTime, setDisplayTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef = useRef<number>(0);
  const lastUpdateRef = useRef(0);
  const onSongEndRef = useRef(onSongEnd);
  onSongEndRef.current = onSongEnd;
  const autoPlayRef = useRef(autoPlay);
  autoPlayRef.current = autoPlay;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    cancelAnimationFrame(rafRef.current);

    setIsReady(false);
    setIsPlaying(false);
    setDisplayTime(0);
    setDuration(0);

    const audio = new Audio(import.meta.env.BASE_URL + musicPath.replace(/^\//, ''));
    audio.preload = 'auto';
    audioRef.current = audio;

    const updateUI = () => {
      if (audio && !audio.paused) {
        const now = performance.now();
        if (now - lastUpdateRef.current > 250) {
          setDisplayTime(audio.currentTime);
          lastUpdateRef.current = now;
        }
        rafRef.current = requestAnimationFrame(updateUI);
      }
    };

    audio.addEventListener('canplay', () => {
      setIsReady(true);
      setDuration(audio.duration);
      if (autoPlayRef.current) {
        audio.play().then(() => {
          setIsPlaying(true);
          rafRef.current = requestAnimationFrame(updateUI);
        }).catch(() => {});
      }
    });

    audio.addEventListener('play', () => {
      setIsPlaying(true);
      rafRef.current = requestAnimationFrame(updateUI);
    });

    audio.addEventListener('pause', () => {
      setIsPlaying(false);
      cancelAnimationFrame(rafRef.current);
    });

    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setDisplayTime(0);
      cancelAnimationFrame(rafRef.current);
      onSongEndRef.current?.();
    });

    return () => {
      cancelAnimationFrame(rafRef.current);
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
      audioRef.current = null;
    };
  }, [musicPath]);

  const handleTogglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
    setDisplayTime(time);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center gap-4">
        <button className="w-8 h-8 text-white/80" disabled>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
        </button>

        <button
          onClick={handleTogglePlay}
          className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform"
        >
          {!isReady ? (
            <svg className="w-5 h-5 text-black animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
          ) : !isPlaying ? (
            <svg className="w-5 h-5 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          ) : (
            <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          )}
        </button>

        <button className="w-8 h-8 text-white/80" disabled>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
        </button>
      </div>

      <div className="w-40 md:w-52 flex flex-col items-center gap-0.5">
        <div className="flex justify-between w-full text-[9px] text-gray-400 px-1">
          <span>{formatTime(displayTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <input
          type="range"
          min="0"
          max={duration || 0}
          step="0.1"
          value={displayTime}
          onChange={handleSeek}
          className="w-full h-1 bg-gray-600 rounded-full appearance-none cursor-pointer accent-white"
          style={{ background: `linear-gradient(to right, white ${(displayTime/duration)*100}%, #4b5563 ${(displayTime/duration)*100}%)` }}
        />
      </div>

      <p className="text-[10px] text-gray-400">
        {!isReady ? 'Carregando...' : isPlaying ? 'Tocando' : 'Toque para ouvir'}
      </p>
    </div>
  );
}
