export const MEDIATYPES = {
  all: 'all',
  movie: 'movie',
  podcast: 'podcast',
  music: 'music',
  musicVideo: 'musicVideo',
  audiobook: 'audiobook',
  shortFilm: 'shortFilm',
  tvShow: 'tvShow',
  software: 'software',
  ebook: 'ebook'
};

export const ENTITIES_MEDIATYPES = {
  all: [
    'movie',
    'album',
    'allArtist',
    'podcast',
    'musicVideo',
    'mix',
    'audiobook',
    'tvSeason',
    'allTrack'
  ],
  movie: ['movieArtist', 'movie'],
  podcast: ['podcastAuthor', 'podcast'],
  music: ['musicArtist', 'musicTrack', 'album', 'musicVideo', 'mix', 'song'],
  musicVideo: ['musicArtist', 'musicVideo'],
  audiobook: ['audiobookAuthor', 'audiobook'],
  shortFilm: ['shortFilmArtist', 'shortFilm'],
  tvShow: ['tvEpisode', 'tvSeason'],
  software: ['software', 'iPadSoftware', 'macSoftware'],
  ebook: ['ebook']
};

const API_BASE_URL = 'http://localhost:3000/api/v1';

export const apiEndpoints = {
  search: `${API_BASE_URL}/search`,
  lookup: `${API_BASE_URL}/lookup`
};

export const NOTIFICATION_DURATION = 3500;
