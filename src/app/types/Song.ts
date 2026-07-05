export interface Song {
  id: string;
  title: string;
  artist: string;
  albumCover: string;
  musicPath: string;
  albumName?: string;
  year?: number;
}