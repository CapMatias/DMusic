interface iTunesSearchResult {
  results: iTunesTrack[];
}

interface iTunesTrack {
  trackId: number;
  artistName: string;
  trackName: string;
  artworkUrl100: string;
}

class FastItunesService {
  private readonly baseURL = 'https://itunes.apple.com/search';
  private coverCache = new Map<string, string>();

  async getAlbumCover(artist: string, track: string): Promise<string | null> {
    const cacheKey = `${artist.toLowerCase()}|${track.toLowerCase()}`;

    if (this.coverCache.has(cacheKey)) {
      return this.coverCache.get(cacheKey)!;
    }

    try {
      const cleanArtist = this.cleanTerm(artist);
      const cleanTrack = this.cleanTerm(track);

      const searchQuery = encodeURIComponent(`${cleanArtist} ${cleanTrack}`);
      const url = `${this.baseURL}?term=${searchQuery}&media=music&entity=song&limit=5`;

      const response = await fetch(url);
      if (!response.ok) return null;

      const data: iTunesSearchResult = await response.json();

      if (data.results && data.results.length > 0) {
        let found = data.results.find(t =>
          t.artworkUrl100 &&
          t.trackName.toLowerCase().includes(cleanTrack) &&
          t.artistName.toLowerCase().includes(cleanArtist)
        );

        if (!found) {
          found = data.results.find(t => t.artworkUrl100);
        }

        if (found) {
          const artwork = found.artworkUrl100.replace('100x100bb', '300x300bb');
          this.coverCache.set(cacheKey, artwork);
          return artwork;
        }
      }

      return null;
    } catch {
      return null;
    }
  }

  private cleanTerm(term: string): string {
    return term
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  clearCache(): void {
    this.coverCache.clear();
  }

  clearFailedCache(): void {}

  getCacheSize(): number {
    return this.coverCache.size;
  }
}

export const fastItunesService = new FastItunesService();
