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
    id: "french-pop",
    name: "🌴",
    description: "Agitations tropicales Radio",
    coverArt: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/0a/3e/16/0a3e1678-1579-f661-0941-267e04eb2f0b/3663729117120_cover.jpg/600x600bb.jpg",
    tracks: [
      {
        id: "f1",
        name: "Peur des filles",
        artist: "L'Impératrice",
        album: "Tako Tsubo",
        albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/0a/3e/16/0a3e1678-1579-f661-0941-267e04eb2f0b/3663729117120_cover.jpg/600x600bb.jpg",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/89/b6/b5/89b6b5b3-f8df-2678-cf3f-1632ae10deb2/mzaf_3441010268438574926.plus.aac.p.m4a",
        duration: 208,
      },
      {
        id: "f2",
        name: "Loverini",
        artist: "Myd & L'Impératrice",
        album: "Loverini",
        albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/be/70/09/be7009c1-7234-8df7-104f-efec304f4a40/5060899074983_cover.jpg/600x600bb.jpg",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/1c/ee/91/1cee914f-bdee-112c-13a0-eafe79161651/mzaf_9264279402289589606.plus.aac.p.m4a",
        duration: 202,
      },
      {
        id: "f3",
        name: "Hanoï café",
        artist: "Bleu Toucan",
        album: "Origami - EP",
        albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/fc/9a/f5/fc9af521-1858-52b7-0153-efb4436b2b54/0602508990991_cover.jpg/600x600bb.jpg",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/66/ee/7d/66ee7d0f-ece1-2d21-be32-2247faca515b/mzaf_13351145452324966366.plus.aac.p.m4a",
        duration: 194,
      },
      {
        id: "f4",
        name: "Toi Et Moi",
        artist: "Paradis",
        album: "Recto Verso",
        albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/7f/81/59/7f815952-5353-54c8-25ab-9d42a2f87eb0/00602557169669.rgb.jpg/600x600bb.jpg",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/32/2c/a5/322ca507-6c30-b2a4-48f9-68c5322df3eb/mzaf_11686928336695084467.plus.aac.p.m4a",
        duration: 220,
      },
      {
        id: "f5",
        name: "Agitations tropicales",
        artist: "L'Impératrice",
        album: "Odyssée - EP",
        albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/ea/52/b1/ea52b130-0c00-aff0-d93a-e369f1943ac0/5055486980365_cover.jpg/600x600bb.jpg",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/5d/26/e3/5d26e3ec-551e-ce23-8f13-9c358d15b565/mzaf_10738447842868299670.plus.aac.p.m4a",
        duration: 248,
      },
      {
        id: "f6",
        name: "J'y peux rien",
        artist: "Miel De Montagne",
        album: "Miel de Montagne",
        albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/ed/31/76/ed3176e8-82f5-9e9d-3ce0-6adbae7ca85e/cover.jpg/600x600bb.jpg",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/a3/be/ac/a3beac58-d1d7-68eb-d1e3-86d513056eb6/mzaf_1814686954745926683.plus.aac.p.m4a",
        duration: 181,
      },
      {
        id: "f7",
        name: "Un rêve à deux",
        artist: "Jean Tonique",
        album: "Plage d'or",
        albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/04/92/35/04923530-c1f8-7e53-4795-d7d372cab690/3614971991921_cover.jpg/600x600bb.jpg",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/3e/d4/b6/3ed4b651-2596-7fc5-82eb-0c3639a6b951/mzaf_11962633285436377852.plus.aac.p.m4a",
        duration: 201,
      },
      {
        id: "f8",
        name: "Jmy attendais pas",
        artist: "Clea Vincent",
        album: "Retiens mon désir",
        albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/97/f3/8c/97f38c90-d04c-75c0-5ae6-31b73d1f1384/cover.jpg/600x600bb.jpg",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/4d/6e/25/4d6e25a6-8755-c55e-3d64-705b3fd11a96/mzaf_1591341394033739764.plus.aac.p.m4a",
        duration: 245,
      },
      {
        id: "f9",
        name: "I Feel High",
        artist: "Poolside & L'Impératrice",
        album: "High Season",
        albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/ec/02/b7/ec02b72d-0709-d2bc-9072-867744c47bb3/193436261555_01_img001.jpg/600x600bb.jpg",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/74/9b/0b/749b0b32-291e-550c-275a-dd0e88212aa0/mzaf_13108476596133682799.plus.aac.p.m4a",
        duration: 262,
      },
      {
        id: "f10",
        name: "Vanille fraise",
        artist: "L'Impératrice",
        album: "Vanille fraise",
        albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/84/86/6f/84866f15-a896-fb93-0121-5af979e9eb08/3663729024671_cover.jpg/600x600bb.jpg",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/91/bf/ec/91bfec36-8d14-e933-7aa8-8a59d012098a/mzaf_6347154794794651697.plus.aac.p.m4a",
        duration: 238,
      },
      {
        id: "f11",
        name: "Vérité",
        artist: "Claire Laffut",
        album: "Mojo - EP",
        albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/0c/a3/49/0ca34929-19f2-25ad-601f-ba500bb9a8c7/00602567967521.rgb.jpg/600x600bb.jpg",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/e3/8b/02/e38b0208-effa-84d1-0689-54e09f3f7aad/mzaf_4068580641880960159.plus.aac.p.m4a",
        duration: 223,
      },
      {
        id: "f12",
        name: "Pourquoi pas",
        artist: "Miel De Montagne",
        album: "Miel de Montagne",
        albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/ed/31/76/ed3176e8-82f5-9e9d-3ce0-6adbae7ca85e/cover.jpg/600x600bb.jpg",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/cf/01/20/cf012048-176a-419c-f25a-4edad098c409/mzaf_17442851145266761792.plus.aac.p.m4a",
        duration: 192,
      },
      {
        id: "f13",
        name: "Hémisphère",
        artist: "Paradis",
        album: "Hémisphère / Je m'ennuie",
        albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/bb/d7/cd/bbd7cdd4-af40-cee9-9c19-b1a9247f3d47/cover.jpg/600x600bb.jpg",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/fc/3c/64/fc3c6426-812c-aa64-1d77-ccc8dc4c37dc/mzaf_14778019737400480072.plus.aac.p.m4a",
        duration: 433,
      },
      {
        id: "f14",
        name: "Samba",
        artist: "Clea Vincent",
        album: "Tropi-cléa - EP",
        albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/c8/61/9f/c8619f17-7e06-f872-1889-3168e032ac27/cover.jpg/600x600bb.jpg",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/ac/42/2c/ac422ca9-d4de-b936-35d4-7149384c6f84/mzaf_4446113474600726334.plus.aac.p.m4a",
        duration: 168,
      },
      {
        id: "f15",
        name: "La Lune",
        artist: "L'Impératrice",
        album: "Odyssée - EP",
        albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/ea/52/b1/ea52b130-0c00-aff0-d93a-e369f1943ac0/5055486980365_cover.jpg/600x600bb.jpg",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/d7/c1/33/d7c13329-f333-7b07-6f99-f177d7459baa/mzaf_3733952210053212203.plus.aac.p.m4a",
        duration: 193,
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
