import { Playlist } from "./types";

// Default playlists with hardcoded track data
export const DEFAULT_PLAYLISTS: Playlist[] = [
  {
    id: "reggaeton",
    name: "🔥",
    description: "Reggaeton & Latin vibes",
    coverArt: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/3e/04/eb/3e04ebf6-370f-f59d-ec84-2c2643db92f1/196626945068.jpg/600x600bb.jpg",
    is_featured: true,
    tracks: [
      {
        id: "r1",
        name: "Ojitos Lindos",
        artist: "Bad Bunny & Bomba Estéreo",
        album: "Un Verano Sin Ti",
        albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/3e/04/eb/3e04ebf6-370f-f59d-ec84-2c2643db92f1/196626945068.jpg/600x600bb.jpg",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/72/ae/81/72ae81c2-4ef3-b998-40b6-563c0609509f/mzaf_12868850384306577273.plus.aac.p.m4a",
        duration: 258,
      },
      {
        id: "r2",
        name: "NUEVAYoL",
        artist: "Bad Bunny",
        album: "DeBÍ TiRAR MáS FOToS",
        albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/90/5e/7e/905e7ed5-a8fa-a8f3-cd06-0028fdf3afaa/199066342442.jpg/600x600bb.jpg",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/2e/97/55/2e97555a-1ed3-9e07-de57-07e1213186c9/mzaf_7594924455925081680.plus.aac.p.m4a",
        duration: 183,
      },
      {
        id: "r3",
        name: "CAFé CON RON",
        artist: "Bad Bunny & Los Pleneros de la Cresta",
        album: "DeBÍ TiRAR MáS FOToS",
        albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/90/5e/7e/905e7ed5-a8fa-a8f3-cd06-0028fdf3afaa/199066342442.jpg/600x600bb.jpg",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/57/38/8f/57388fad-59e3-e11f-4147-500341594b86/mzaf_6984117293309341445.plus.aac.p.m4a",
        duration: 228,
      },
      {
        id: "r4",
        name: "un x100to",
        artist: "Grupo Frontera & Bad Bunny",
        album: "un x100to",
        albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/b6/74/4d/b6744dbd-77ed-413a-3777-5ac6a2e780eb/197188732554.jpg/600x600bb.jpg",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/af/44/ac/af44ac2f-9dbe-a956-f529-8311b618074e/mzaf_892284930014907127.plus.aac.p.m4a",
        duration: 194,
      },
      {
        id: "r5",
        name: "MÍA (feat. Drake)",
        artist: "Bad Bunny",
        album: "X 100PRE",
        albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/cf/3a/db/cf3adbe6-8ea1-f60f-60fd-713eefda3962/193483317984.jpg/600x600bb.jpg",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/72/ad/b6/72adb69d-18a8-a7cd-4534-bba34deb9486/mzaf_14761776520883767907.plus.aac.p.m4a",
        duration: 210,
      },
      {
        id: "r6",
        name: "Otro Atardecer",
        artist: "Bad Bunny & The Marías",
        album: "Un Verano Sin Ti",
        albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/3e/04/eb/3e04ebf6-370f-f59d-ec84-2c2643db92f1/196626945068.jpg/600x600bb.jpg",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/3e/5f/85/3e5f858c-d5e2-76d2-f093-6e3e738b15af/mzaf_11064066927076408850.plus.aac.p.m4a",
        duration: 244,
      },
      {
        id: "r7",
        name: "Después de la Playa",
        artist: "Bad Bunny",
        album: "Un Verano Sin Ti",
        albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/3e/04/eb/3e04ebf6-370f-f59d-ec84-2c2643db92f1/196626945068.jpg/600x600bb.jpg",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/f6/c6/a0/f6c6a092-1690-3328-907d-280a8ba6adac/mzaf_4195200870757777362.plus.aac.p.m4a",
        duration: 230,
      },
      {
        id: "r8",
        name: "Khé?",
        artist: "Rauw Alejandro & Romeo Santos",
        album: "Cosa Nuestra",
        albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/ab/e8/09/abe8092d-ef44-61b9-6b50-ab7efb78ca51/196872401516.jpg/600x600bb.jpg",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/06/03/6e/06036e06-d980-1c42-1618-5f725a92876f/mzaf_9794012487077515499.plus.aac.p.m4a",
        duration: 206,
      },
      {
        id: "r9",
        name: "Tú Con Él",
        artist: "Rauw Alejandro",
        album: "Cosa Nuestra",
        albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/ab/e8/09/abe8092d-ef44-61b9-6b50-ab7efb78ca51/196872401516.jpg/600x600bb.jpg",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/ab/8a/a5/ab8aa549-a0ee-9083-6953-093a56cc573c/mzaf_10969913427257276545.plus.aac.p.m4a",
        duration: 289,
      },
      {
        id: "r10",
        name: "Desenfocao'",
        artist: "Rauw Alejandro",
        album: "VICE VERSA",
        albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/58/13/c3/5813c326-a7fa-f792-77e1-8310d9c80742/886449738724.jpg/600x600bb.jpg",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/12/92/43/1292436d-e28c-f3ba-51eb-91ca2b4ea578/mzaf_15223671047978269981.plus.aac.p.m4a",
        duration: 170,
      },
      {
        id: "r11",
        name: "Santa",
        artist: "Rvssian, Rauw Alejandro & Ayra Starr",
        album: "Santa",
        albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/78/3b/65/783b6546-bf40-4583-1064-1d4946a82f50/196871978293.jpg/600x600bb.jpg",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/f2/de/51/f2de510d-5955-506c-7d0e-1a07c7e67d2f/mzaf_7850984270634383893.plus.aac.p.m4a",
        duration: 193,
      },
      {
        id: "r12",
        name: "Tiroteo (Remix)",
        artist: "Marc Segui, Rauw Alejandro & Pol Granch",
        album: "Tiroteo (Remix)",
        albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/0b/c9/c6/0bc9c6da-7431-7381-f0b6-035292a8192b/190296719691.jpg/600x600bb.jpg",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/bd/f8/b3/bdf8b39e-2e46-6c5f-d5d8-15a72a6d5880/mzaf_8620325482896842233.plus.aac.p.m4a",
        duration: 321,
      },
    ],
  },
  {
    id: "indie-pop",
    name: "💔",
    description: "Indie pop & heartbreak anthems",
    coverArt: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/33/fd/32/33fd32b1-0e43-9b4a-8ed6-19643f23544e/21UMGIM26092.rgb.jpg/600x600bb.jpg",
    tracks: [
      {
        id: "p1",
        name: "traitor",
        artist: "Olivia Rodrigo",
        album: "SOUR",
        albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/33/fd/32/33fd32b1-0e43-9b4a-8ed6-19643f23544e/21UMGIM26092.rgb.jpg/600x600bb.jpg",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/4f/ae/6c/4fae6c93-6bb3-d320-00bf-f32310705b3f/mzaf_16796881619991035581.plus.aac.p.m4a",
        duration: 229,
      },
      {
        id: "p2",
        name: "drivers license",
        artist: "Olivia Rodrigo",
        album: "SOUR",
        albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/02/ed/8c/02ed8cab-c089-2fdd-7ce6-ab334a9a4e19/21UMGIM26093.rgb.jpg/600x600bb.jpg",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/36/62/61/366261be-0996-d73d-de6f-03417867c800/mzaf_8201528327761821135.plus.aac.p.m4a",
        duration: 242,
      },
      {
        id: "p3",
        name: "good 4 u",
        artist: "Olivia Rodrigo",
        album: "SOUR",
        albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/02/ed/8c/02ed8cab-c089-2fdd-7ce6-ab334a9a4e19/21UMGIM26093.rgb.jpg/600x600bb.jpg",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/a4/eb/3a/a4eb3aeb-eb1f-c382-0aec-ff4eafc34e9e/mzaf_238907262667616343.plus.aac.p.m4a",
        duration: 178,
      },
      {
        id: "p4",
        name: "drop dead",
        artist: "Olivia Rodrigo",
        album: "you seem pretty sad for a girl so in love",
        albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/1d/1b/f9/1d1bf9b1-44c6-9a6c-6ffb-c158488c06ce/26UMGIM39303.rgb.jpg/600x600bb.jpg",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/89/57/ad/8957adf6-1862-4e4e-bcb5-810d6cf79cc4/mzaf_7752581374620577831.plus.aac.p.m4a",
        duration: 224,
      },
      {
        id: "p5",
        name: "stupid song",
        artist: "Olivia Rodrigo",
        album: "you seem pretty sad for a girl so in love",
        albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/1d/1b/f9/1d1bf9b1-44c6-9a6c-6ffb-c158488c06ce/26UMGIM39303.rgb.jpg/600x600bb.jpg",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/ab/d6/78/abd678a1-bf4e-7ee9-d0b2-ba8afee10914/mzaf_3280183609788906841.plus.aac.p.m4a",
        duration: 209,
      },
      {
        id: "p6",
        name: "deja vu",
        artist: "Olivia Rodrigo",
        album: "SOUR",
        albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/33/fd/32/33fd32b1-0e43-9b4a-8ed6-19643f23544e/21UMGIM26092.rgb.jpg/600x600bb.jpg",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/a0/f3/51/a0f351b9-3c3f-3c8f-3b3a-3b3a3b3a3b3a/mzaf_1234567890123456789.plus.aac.p.m4a",
        duration: 215,
      },
      {
        id: "p7",
        name: "brutal",
        artist: "Olivia Rodrigo",
        album: "SOUR",
        albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/33/fd/32/33fd32b1-0e43-9b4a-8ed6-19643f23544e/21UMGIM26092.rgb.jpg/600x600bb.jpg",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/b1/c2/d3/b1c2d3e4-f5g6-h7i8-j9k0-l1m2n3o4p5q6/mzaf_9876543210987654321.plus.aac.p.m4a",
        duration: 143,
      },
      {
        id: "p8",
        name: "happier",
        artist: "Olivia Rodrigo",
        album: "SOUR",
        albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/33/fd/32/33fd32b1-0e43-9b4a-8ed6-19643f23544e/21UMGIM26092.rgb.jpg/600x600bb.jpg",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/c2/d3/e4/c2d3e4f5-g6h7-i8j9-k0l1-m2n3o4p5q6r7/mzaf_1111111111111111111.plus.aac.p.m4a",
        duration: 175,
      },
      {
        id: "p9",
        name: "Sue me",
        artist: "Audrey Hobert",
        album: "Who's the Clown?",
        albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/2c/2c/55/2c2c557a-cec2-c3f1-c48c-b9223442f1fd/196873397825.jpg/600x600bb.jpg",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/c2/df/ee/c2dfee0e-dda0-8d0d-e6be-4378c81e3c23/mzaf_11174541762417764906.plus.aac.p.m4a",
        duration: 170,
      },
      {
        id: "p10",
        name: "Bowling alley",
        artist: "Audrey Hobert",
        album: "Who's the Clown?",
        albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/2c/2c/55/2c2c557a-cec2-c3f1-c48c-b9223442f1fd/196873397825.jpg/600x600bb.jpg",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/ee/c0/85/eec08577-71c8-1c7b-a723-db751caadec3/mzaf_17032070017791286079.plus.aac.p.m4a",
        duration: 154,
      },
    ],
  },
];

// Get all unique albums from playlists
export function getAlbumsFromPlaylists(): {
  id: string;
  name: string;
  artist: string;
  albumArt: string;
  trackCount: number;
}[] {
  const albumMap = new Map<
    string,
    { id: string; name: string; artist: string; albumArt: string; trackCount: number }
  >();

  for (const playlist of DEFAULT_PLAYLISTS) {
    for (const track of playlist.tracks) {
      if (!albumMap.has(track.album)) {
        albumMap.set(track.album, {
          id: track.album.toLowerCase().replace(/\s+/g, "-"),
          name: track.album,
          artist: track.artist,
          albumArt: track.albumArt,
          trackCount: 1,
        });
      } else {
        const album = albumMap.get(track.album);
        if (album) {
          album.trackCount++;
        }
      }
    }
  }

  return Array.from(albumMap.values());
}

// Get all unique artists from playlists
export function getArtistsFromPlaylists(): {
  id: string;
  name: string;
  image: string;
  trackCount: number;
}[] {
  const artistMap = new Map<
    string,
    { id: string; name: string; image: string; trackCount: number }
  >();

  for (const playlist of DEFAULT_PLAYLISTS) {
    for (const track of playlist.tracks) {
      if (!artistMap.has(track.artist)) {
        artistMap.set(track.artist, {
          id: track.artist.toLowerCase().replace(/\s+/g, "-"),
          name: track.artist,
          image: track.albumArt,
          trackCount: 1,
        });
      } else {
        const artist = artistMap.get(track.artist);
        if (artist) {
          artist.trackCount++;
        }
      }
    }
  }

  return Array.from(artistMap.values());
}

// Get all songs from playlists
export function getAllSongs() {
  const songs = new Map<string, (typeof DEFAULT_PLAYLISTS)[0]["tracks"][0]>();

  for (const playlist of DEFAULT_PLAYLISTS) {
    for (const track of playlist.tracks) {
      if (!songs.has(track.id)) {
        songs.set(track.id, track);
      }
    }
  }

  return Array.from(songs.values());
}

// Get the featured playlist
export function getFeaturedPlaylist() {
  return DEFAULT_PLAYLISTS.find((p) => p.is_featured) || DEFAULT_PLAYLISTS[0];
}

// Default track for media widget when nothing has been played
export const DEFAULT_TRACK = DEFAULT_PLAYLISTS[0].tracks[0];
