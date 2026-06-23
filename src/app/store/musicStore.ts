import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Song } from '../types/Song';
import { localAlbumService } from '../services/localAlbumService';
import Fuse from 'fuse.js';

interface MusicState {
  songs: Song[];
  selectedSong: Song | null;
  isPlaying: boolean;
  currentIndex: number;
  searchQuery: string;
  loading: boolean;
  error: string | null;
  
  setSongs: (songs: Song[]) => void;
  setSelectedSong: (song: Song | null) => void;
  setIsPlaying: (playing: boolean) => void;
  setCurrentIndex: (index: number) => void;
  setSearchQuery: (query: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchSongs: (query: string) => Promise<void>;
}

export const useMusicStore = create<MusicState>()(
  persist(
    (set, get) => ({
      songs: [],
      selectedSong: null,
      isPlaying: false,
      currentIndex: 0,
      searchQuery: '',
      loading: false,
      error: null,

      setSongs: (songs) => set({ songs }),
      setSelectedSong: (selectedSong) => set({ selectedSong }),
      setIsPlaying: (isPlaying) => set({ isPlaying }),
      setCurrentIndex: (currentIndex) => set({ currentIndex }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),

      fetchSongs: async (query) => {
        set({ loading: true, error: null, searchQuery: query });
        try {
          await new Promise(resolve => setTimeout(resolve, 50));
          
          if (!query.trim()) {
            const songsData = await localAlbumService.getTrendingSongs();
            set({ 
              songs: songsData, 
              currentIndex: Math.floor(songsData.length / 2),
              loading: false 
            });
          } else {
            const allSongs = await localAlbumService.getTrendingSongs();
            const searchSongs = await localAlbumService.searchSongs(query);
            
            const fuse = new Fuse(searchSongs.length > 0 ? searchSongs : allSongs, {
              keys: ['artist', 'title', 'albumName'],
              threshold: 0.3,
            });
            
            const results = fuse.search(query).map(result => result.item);
            const finalSongs = results.length > 0 ? results : searchSongs;

            set({ 
              songs: finalSongs, 
              currentIndex: Math.floor(finalSongs.length / 2),
              loading: false 
            });
          }
        } catch (err) {
          set({ error: 'Falha ao carregar músicas', songs: [], currentIndex: 0, loading: false });
        }
      },
    }),
    {
      name: 'music-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        selectedSong: state.selectedSong, 
        isPlaying: state.isPlaying,
        searchQuery: state.searchQuery 
      }),
    }
  )
);
