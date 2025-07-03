// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
  API_KEY: process.env.REACT_APP_TMDB_API_KEY || 'your-api-key-here',
} as const;

// Image Sizes
export const IMAGE_SIZES = {
  BACKDROP: {
    SMALL: 'w780',
    MEDIUM: 'w1280',
    LARGE: 'original',
  },
  POSTER: {
    SMALL: 'w185',
    MEDIUM: 'w342',
    LARGE: 'w500',
    XLARGE: 'w780',
  },
} as const;

// API Endpoints
export const ENDPOINTS = {
  MOVIES: {
    POPULAR: '/movie/popular',
    TOP_RATED: '/movie/top_rated',
    NOW_PLAYING: '/movie/now_playing',
    UPCOMING: '/movie/upcoming',
    SEARCH: '/search/movie',
    DETAILS: (id: number) => `/movie/${id}`,
    VIDEOS: (id: number) => `/movie/${id}/videos`,
    CREDITS: (id: number) => `/movie/${id}/credits`,
  },
  TV: {
    POPULAR: '/tv/popular',
    TOP_RATED: '/tv/top_rated',
    ON_THE_AIR: '/tv/on_the_air',
    AIRING_TODAY: '/tv/airing_today',
    SEARCH: '/search/tv',
    DETAILS: (id: number) => `/tv/${id}`,
    VIDEOS: (id: number) => `/tv/${id}/videos`,
    CREDITS: (id: number) => `/tv/${id}/credits`,
  },
  GENRES: {
    MOVIE: '/genre/movie/list',
    TV: '/genre/tv/list',
  },
} as const;

// App Configuration
export const APP_CONFIG = {
  NAME: 'MetFlix',
  VERSION: '2.0.0',
  DESCRIPTION: 'Netflix-like streaming platform interface',
  ITEMS_PER_ROW: {
    MOBILE: 2,
    TABLET: 3,
    DESKTOP: 4,
    LARGE_DESKTOP: 6,
  },
  CAROUSEL_SETTINGS: {
    DOTS: false,
    INFINITE: true,
    SPEED: 500,
    SLIDES_TO_SHOW: 6,
    SLIDES_TO_SCROLL: 3,
    RESPONSIVE: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  },
} as const;

// Navigation
export const NAVIGATION = {
  HOME: '/',
  MOVIES: '/movies',
  TV_SHOWS: '/tv-shows',
  SEARCH: '/search',
  MY_LIST: '/my-list',
} as const;

// Media Types
export const MEDIA_TYPES = {
  MOVIE: 'movie',
  TV: 'tv',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  API_ERROR: 'Failed to fetch data from the server.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
  NOT_FOUND: 'Content not found.',
} as const;

// Loading States
export const LOADING_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;
