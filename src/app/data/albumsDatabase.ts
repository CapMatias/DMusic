export interface AlbumData {
  id: string;
  title: string;
  artist: string;
  musicPath: string;
  albumCover: string;
  albumName?: string;
  year?: number;
}

export const ALBUMS_DATABASE: AlbumData[] = [
  {
    id: '1',
    title: 'Black Coast - TRNDSTTR (Lucian Remix)',
    artist: 'Black Coast',
    musicPath: '/music/song1.mp3',
    albumCover: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/09/24/b8/0924b836-668e-bc9f-00fe-d8f5e5380f9d/0617465692550.jpg/300x300bb.jpg'
  },
  {
    id: '2',
    title: 'Bruno Mars - That s What I Like (Cabuizee Trap Remix)',
    artist: 'Bruno Mars',
    musicPath: '/music/song2.mp3',
    albumCover: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/e3/47/a0/e347a0cc-87ce-5d05-d560-176c7d48f66e/075679904119.jpg/300x300bb.jpg'
  },
  {
    id: '3',
    title: 'Cardi B, Bad Bunny & J Balvin - I Like It (BEAUZ Remix)',
    artist: 'Cardi B',
    musicPath: '/music/song3.mp3',
    albumCover: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/ca/58/e5/ca58e5e3-acb7-8ca3-6af9-ad63af3b71f1/075679873675.jpg/300x300bb.jpg'
  },
  {
    id: '4',
    title: 'Charlie Puth - Attention (Joe Slay Remix)',
    artist: 'Charlie Puth',
    musicPath: '/music/song4.mp3',
    albumCover: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/a8/e2/1b/a8e21b3b-9c8d-2974-2318-6bcd4c9d2370/075679884336.jpg/300x300bb.jpg'
  },
  {
    id: '5',
    title: 'Chemical Surf - Hey Hey Hey (Original Mix)',
    artist: 'Chemical Surf',
    musicPath: '/music/song5.mp3',
    albumCover: 'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/7a/7e/ce/7a7ecee3-6d04-4b0d-fc73-e2a8e0959681/cover.jpg/300x300bb.jpg'
  },
  {
    id: '6',
    title: 'Daft Punk - Harder, Better, Faster, Stronger (Far Out Remix)',
    artist: 'Daft Punk',
    musicPath: '/music/song6.mp3',
    albumCover: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/fd/4a/77/fd4a77db-0ebc-d043-41a2-f32fa1bb0fb4/dj.qrikkdwj.jpg/300x300bb.jpg'
  },
  {
    id: '7',
    title: 'Dillon Francis & DJ Snake - Get Low',
    artist: 'Dillon Francis',
    musicPath: '/music/song7.mp3',
    albumCover: 'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/36/93/33/36933300-8b4b-54e6-a769-86cf41224ae4/dj.wqaosoav.jpg/300x300bb.jpg'
  },
  {
    id: '8',
    title: 'Dimitri Vegas, Martin Garrix, Like Mike - Tremor (Official Music Video)',
    artist: 'Dimitri Vegas',
    musicPath: '/music/song8.mp3',
    albumCover: 'https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/ed/0b/94/ed0b9440-0cdb-0bd9-3049-6b6a75297f4e/8712944577877.jpg/300x300bb.jpg'
  },
  {
    id: '9',
    title: 'Diplo - Revolution (SEAN&BOBO REMIX)',
    artist: 'Diplo',
    musicPath: '/music/song9.mp3',
    albumCover: 'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/06/6e/fe/066efe07-5469-0ca7-8e13-842d94df5f02/DIPLO_RWBE_1800.jpg/300x300bb.jpg'
  },
  {
    id: '10',
    title: 'Drake - In My Feelings (VAVO & Steve Reece Remix)',
    artist: 'Drake',
    musicPath: '/music/song10.mp3',
    albumCover: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/bb/6d/8f/bb6d8f67-6d04-10b5-dd62-eb5809ac54fc/00602567879152.rgb.jpg/300x300bb.jpg'
  },
  {
    id: '11',
    title: 'Dua Lipa - Last Dance (Custic Remix)',
    artist: 'Dua Lipa',
    musicPath: '/music/song11.mp3',
    albumCover: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/c1/54/2d/c1542d45-c6c2-12ca-7308-6eacd762c562/190295807870.jpg/300x300bb.jpg'
  },
  {
    id: '12',
    title: 'Eiffel 65 - Blue (KNY Factory Remix)',
    artist: 'Eiffel 65',
    musicPath: '/music/song12.mp3',
    albumCover: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/a9/ec/b3/a9ecb373-0ea0-4117-9a68-03f513bae597/mzi.iwxdpjun.jpg/300x300bb.jpg'
  },
  {
    id: '13',
    title: 'Foster the People - Pumped up Kicks (Bridge and Law Remix)',
    artist: 'Foster the People',
    musicPath: '/music/song13.mp3',
    albumCover: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/ba/07/5b/ba075b3c-f0c4-b519-59f3-7ae74d43246b/dj.lajxsvkg.jpg/300x300bb.jpg'
  },
  {
    id: '14',
    title: 'Khalid & Normani - Love Lies (Medasin Remix)',
    artist: 'Khalid & Normani',
    musicPath: '/music/song14.mp3',
    albumCover: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/c1/5d/9b/c15d9bc5-4181-9874-d65b-7741203ccad6/190295567279.jpg/300x300bb.jpg'
  },
  {
    id: '15',
    title: 'Marshmello & Anne Marie - Friends (Justin Caruso Remix)',
    artist: 'Marshmello & Anne Marie',
    musicPath: '/music/song15.mp3',
    albumCover: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/32/4f/fd/324ffda2-9e51-8f6a-0c2d-c6fd2b41ac55/074643811224.jpg/300x300bb.jpg'
  },
  {
    id: '16',
    title: 'Michael Jackson - Beat It (Basé Trap Remix)',
    artist: 'Michael Jackson',
    musicPath: '/music/song16.mp3',
    albumCover: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/32/4f/fd/324ffda2-9e51-8f6a-0c2d-c6fd2b41ac55/074643811224.jpg/300x300bb.jpg'
  },
  {
    id: '17',
    title: 'Ping Pong Mammoth (Dimitri Vegas & Like Mike Mashup)[Timmy Turner Remake]',
    artist: 'Ping Pong Mammoth',
    musicPath: '/music/song17.mp3',
    albumCover: 'https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/ed/0b/94/ed0b9440-0cdb-0bd9-3049-6b6a75297f4e/8712944577877.jpg/300x300bb.jpg'
  },
  {
    id: '18',
    title: 'Post Malone ft. Ty Dolla $ign - Psycho (it s different Remix)',
    artist: 'Post Malone',
    musicPath: '/music/song18.mp3',
    albumCover: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/5a/52/ff/5a52ffce-5ff5-6901-bc31-6dfa2a789100/23UMGIM42184.rgb.jpg/300x300bb.jpg'
  },
  {
    id: '19',
    title: 'Rihanna - Needed Me (LENNY Remix)',
    artist: 'Rihanna',
    musicPath: '/music/song19.mp3',
    albumCover: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/9c/da/90/9cda90c9-df1a-078b-319c-bdf2801e8d1f/16UMGIM03373.rgb.jpg/300x300bb.jpg'
  },
  {
    id: '20',
    title: 'Stephen - Crossfire (KC Audio Remix)',
    artist: 'Stephen',
    musicPath: '/music/song20.mp3',
    albumCover: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/fb/bc/6a/fbbc6afb-a440-2093-733a-d31c60aeac87/859717044315_cover.jpg/300x300bb.jpg'
  },
  {
    id: '21',
    title: 'TRAP - Calli Boom & Swill - Impact (No Copyright)',
    artist: 'Calli Boom & Swill',
    musicPath: '/music/song21.mp3',
    albumCover: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/45/98/7a/45987a98-2091-73ff-0e85-a1ee698214c6/053000217572_cover.jpg/300x300bb.jpg'
  },
  {
    id: '22',
    title: 'TWRK - BaDINGA!',
    artist: 'TWRK',
    musicPath: '/music/song22.mp3',
    albumCover: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/2f/a1/19/2fa119f8-eddd-85eb-79fe-020497c0abd7/812388025809.jpg/300x300bb.jpg'
  },
  {
    id: '23',
    title: 'Waka Flocka - No Handz (CRNKN Remix)',
    artist: 'Waka Flocka',
    musicPath: '/music/song23.mp3',
    albumCover: 'https://is1-ssl.mzstatic.com/image/thumb/Music/9a/de/be/mzi.cwahynma.jpg/300x300bb.jpg'
  }
];

export const getAlbumById = (id: string): AlbumData | undefined => {
  return ALBUMS_DATABASE.find(album => album.id === id);
};

export const getAlbumsByArtist = (artist: string): AlbumData[] => {
  return ALBUMS_DATABASE.filter(album => 
    album.artist.toLowerCase().includes(artist.toLowerCase())
  );
};

export const searchAlbums = (query: string): AlbumData[] => {
  const lowerQuery = query.toLowerCase();
  return ALBUMS_DATABASE.filter(album =>
    album.title.toLowerCase().includes(lowerQuery) ||
    album.artist.toLowerCase().includes(lowerQuery) ||
    (album.albumName && album.albumName.toLowerCase().includes(lowerQuery))
  );
};

export const getAllAlbums = (): AlbumData[] => {
  return ALBUMS_DATABASE;
};

export const getRandomAlbums = (count: number): AlbumData[] => {
  const shuffled = [...ALBUMS_DATABASE].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};
