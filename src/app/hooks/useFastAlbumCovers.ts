import { useState, useEffect, useRef, useCallback } from 'react';
import { Song } from '../types/Song';
import { fastItunesService } from '../services/fastItunesService';

interface UseFastAlbumCoversProps {
  songs: Song[];
  centerIndex: number;
  preloadRadius?: number;
}

interface UseFastAlbumCoversReturn {
  getCover: (song: Song) => string | null;
  isLoading: (songId: string) => boolean;
  loadedCount: number;
  totalSongs: number;
  loadingProgress: number;
}

export function useFastAlbumCovers({
  songs,
  centerIndex,
  preloadRadius = 5
}: UseFastAlbumCoversProps): UseFastAlbumCoversReturn {
  
  const [covers, setCovers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const attemptedRef = useRef<Set<string>>(new Set());
  
  useEffect(() => {
    if (songs.length === 0) return;

    const toLoad: Song[] = [];

    if (songs[centerIndex]) {
      toLoad.push(songs[centerIndex]);
    }

    for (let r = 1; r <= preloadRadius; r++) {
      if (centerIndex - r >= 0 && songs[centerIndex - r]) {
        toLoad.push(songs[centerIndex - r]);
      }
      if (centerIndex + r < songs.length && songs[centerIndex + r]) {
        toLoad.push(songs[centerIndex + r]);
      }
    }

    let cancelled = false;

    const load = async () => {
      for (const song of toLoad) {
        if (cancelled) return;
        const key = `${song.artist}|${song.title}`;
        if (covers[key] || attemptedRef.current.has(key)) continue;

        attemptedRef.current.add(key);
        setLoading(prev => ({ ...prev, [song.id]: true }));

        try {
          const url = await fastItunesService.getAlbumCover(song.artist, song.title);
          if (!cancelled && url) {
            setCovers(prev => ({ ...prev, [key]: url }));
          }
        } catch {
          // ignore
        } finally {
          if (!cancelled) {
            setLoading(prev => {
              const next = { ...prev };
              delete next[song.id];
              return next;
            });
          }
        }
      }
    };

    load();

    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [songs, centerIndex, preloadRadius]);

  // Load ALL remaining songs in background
  useEffect(() => {
    if (songs.length === 0) return;

    let cancelled = false;

    const timer = setTimeout(async () => {
      const remaining = songs.filter(s => {
        const key = `${s.artist}|${s.title}`;
        return !covers[key] && !attemptedRef.current.has(key);
      });

      for (const song of remaining) {
        if (cancelled) return;
        const key = `${song.artist}|${song.title}`;
        if (covers[key] || attemptedRef.current.has(key)) continue;

        attemptedRef.current.add(key);
        setLoading(prev => ({ ...prev, [song.id]: true }));

        try {
          const url = await fastItunesService.getAlbumCover(song.artist, song.title);
          if (!cancelled && url) {
            setCovers(prev => ({ ...prev, [key]: url }));
          }
        } catch {
          // ignore
        } finally {
          if (!cancelled) {
            setLoading(prev => {
              const next = { ...prev };
              delete next[song.id];
              return next;
            });
          }
        }
      }
    }, 1500);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [songs]);

  const getCover = useCallback((song: Song): string | null => {
    return covers[`${song.artist}|${song.title}`] || null;
  }, [covers]);

  const isLoading = useCallback((songId: string): boolean => {
    return !!loading[songId];
  }, [loading]);

  const loadedCount = Object.keys(covers).length;
  const totalSongs = songs.length;
  const loadingProgress = totalSongs > 0 ? (loadedCount / totalSongs) * 100 : 0;

  return {
    getCover,
    isLoading,
    loadedCount,
    totalSongs,
    loadingProgress
  };
}
