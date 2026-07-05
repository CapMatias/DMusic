import React, { useEffect, useCallback } from 'react';
import { CoverFlow } from './components/CoverFlow';
import { SearchBar } from './components/SearchBar';
import { Player } from './components/Player';
import { NeuralBackground } from './components/NeuralBackground';
import { useMusicStore } from './store/musicStore';
import { localAlbumService } from './services/localAlbumService';
import { Song } from './types/Song';
import { toast } from 'sonner';

export default function App() {
  const { 
    songs, 
    selectedSong, 
    isPlaying, 
    currentIndex, 
    searchQuery, 
    loading, 
    error, 
    fetchSongs, 
    setSelectedSong, 
    setIsPlaying, 
    setCurrentIndex 
  } = useMusicStore();

  useEffect(() => {
    fetchSongs('');
  }, [fetchSongs]);

  useEffect(() => {
    if (songs.length > 0 && !selectedSong) {
      const middleIndex = Math.floor(songs.length / 2);
      const song = songs[middleIndex];
      setSelectedSong(song);
      setIsPlaying(true);
    }
  }, [songs, selectedSong, setSelectedSong, setIsPlaying]);

  const handleSearch = (query: string) => {
    fetchSongs(query);
  };

  const handleSongSelect = (song: any) => {
    setSelectedSong(song);
    setIsPlaying(false);
    const index = songs.findIndex(s => s.id === song.id);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  };

  const handlePlayingChange = (playing: boolean) => {
    setIsPlaying(playing);
  };

  const getCover = useCallback((song: Song): string | null => {
    return song.albumCover || null;
  }, []);

  const handleSongEnd = useCallback(() => {
    const state = useMusicStore.getState();
    const { songs, currentIndex } = state;
    if (songs.length === 0) return;
    const nextIndex = (currentIndex + 1) % songs.length;
    const nextSong = songs[nextIndex];
    state.setSelectedSong(nextSong);
    state.setCurrentIndex(nextIndex);
    state.setIsPlaying(true);
  }, []);

  const totalSongsCount = localAlbumService.getTotalSongCount();
  const displayText = searchQuery 
    ? `${songs.length} resultados para "${searchQuery}"`
    : `As melhores de 2018 de Daniel`;

  return (
    <div 
      className="h-screen text-white overflow-hidden relative"
      style={{
        background: 'transparent',
        zIndex: 1,
        position: 'relative',
        width: '100vw',
        height: '100vh',
        isolation: 'isolate',
        overflowX: 'hidden'
      }}
    >
      <NeuralBackground />
      
      <div className="relative flex items-center justify-between p-4 bg-black/20 backdrop-blur-md" style={{ zIndex: 500 }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full shadow-sm"></div>
          <span className="text-sm font-medium tracking-wide text-gray-300">iPod</span>
          <div className="w-4 h-2 ml-1">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-white/70">
              <path d="M2 17h20v2H2zm1.15-4.05L4 11.47l.85 1.48L6 12l-1.15-.95zM12 8l-6 6h12l-6-6z"/>
            </svg>
          </div>
        </div>
        <div className="text-sm font-medium text-gray-300">
          {loading ? 'Carregando...' : displayText}
        </div>
        <div className="flex items-center gap-1">
          <div className="w-6 h-3 bg-gradient-to-r from-green-400 to-green-500 rounded-sm shadow-sm"></div>
          <div className="text-xs text-gray-400">100%</div>
        </div>
      </div>
      
      <div className="relative p-4" style={{ zIndex: 450 }}>
        <SearchBar onSearch={handleSearch} />
      </div>
      
      <div className="relative flex-1 flex flex-col items-center justify-center px-4 md:px-8 pb-8 md:pb-8" style={{ zIndex: 200 }}>
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
            <span className="text-gray-300">Carregando músicas...</span>
          </div>
        ) : error ? (
            <div className="text-center text-red-400">
              <p>{error}</p>
              <button 
                onClick={() => {
                  toast.info('Tentando carregar músicas novamente...');
                  fetchSongs('');
                }}
                className="mt-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                Tentar Novamente
              </button>
            </div>

        ) : songs.length === 0 ? (
          <div className="text-center text-gray-400">
            <p>Nenhuma música encontrada para "{searchQuery}"</p>
            <button 
              onClick={() => fetchSongs('')}
              className="mt-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              Mostrar Todas as Músicas
            </button>
          </div>
        ) : (
          <>
            <CoverFlow 
              songs={songs} 
              onSongSelect={handleSongSelect}
              selectedSong={selectedSong}
              isPlaying={isPlaying}
              getCover={getCover}
            />
            
            {selectedSong && (
              <div className="mt-6 md:mt-6 text-center relative" style={{ zIndex: 250 }}>
                <div className="bg-transparent p-1 md:p-2">
                  <h2 className="text-lg md:text-xl font-light mb-1 md:mb-2 text-white drop-shadow-lg">
                    {selectedSong.title}
                  </h2>
                  <p className="text-sm md:text-base mb-1 font-light text-gray-300 drop-shadow-md">
                    {selectedSong.artist}
                  </p>
                  {selectedSong.albumName && (
                    <p className="text-xs md:text-sm mb-2 md:mb-4 font-light text-gray-400 drop-shadow-md">
                      do álbum {selectedSong.albumName} {selectedSong.year && `(${selectedSong.year})`}
                    </p>
                  )}
                   <Player 
                     musicPath={selectedSong.musicPath} 
                     onSongEnd={handleSongEnd}
                     autoPlay={isPlaying}
                   />

                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
