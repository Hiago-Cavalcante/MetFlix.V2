// Domain Types
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  genres?: Genre[];
  runtime?: number;
  budget?: number;
  revenue?: number;
  status?: string;
  tagline?: string;
  production_companies?: ProductionCompany[];
  production_countries?: ProductionCountry[];
  spoken_languages?: SpokenLanguage[];
  vote_count?: number;
  popularity?: number;
  adult?: boolean;
  original_language?: string;
  original_title?: string;
  imdb_id?: string;
  homepage?: string;
}

export interface TVShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  vote_average: number;
  genre_ids: number[];
  genres?: Genre[];
  number_of_episodes?: number;
  number_of_seasons?: number;
  episode_run_time?: number[];
  last_air_date?: string;
  status?: string;
  tagline?: string;
  created_by?: Creator[];
  production_companies?: ProductionCompany[];
  production_countries?: ProductionCountry[];
  spoken_languages?: SpokenLanguage[];
  vote_count?: number;
  popularity?: number;
  original_language?: string;
  original_name?: string;
  homepage?: string;
  in_production?: boolean;
  networks?: Network[];
  seasons?: Season[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path?: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Creator {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path?: string;
}

export interface Network {
  id: number;
  logo_path?: string;
  name: string;
  origin_country: string;
}

export interface Season {
  air_date?: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path?: string;
  season_number: number;
}

export interface Video {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}

export interface VideosResponse {
  id: number;
  results: Video[];
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface Crew {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
  credit_id: string;
  department: string;
  job: string;
}

export interface Credits {
  id: number;
  cast: Cast[];
  crew: Crew[];
}

// API Response Types
export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface MovieResponse extends TMDBResponse<Movie> {}
export interface TVShowResponse extends TMDBResponse<TVShow> {}

// Component Props Types
export interface MediaCardProps {
  media: Movie | TVShow;
  onSelect: (media: Movie | TVShow) => void;
}

export interface BannerProps {
  featuredMedia?: Movie | TVShow;
  onPlayClick?: () => void;
  onInfoClick?: () => void;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  media: Movie | TVShow | null;
}

// Service Types
export interface MediaService {
  getPopularMovies(): Promise<Movie[]>;
  getPopularTVShows(): Promise<TVShow[]>;
  getTopRatedMovies(): Promise<Movie[]>;
  getTopRatedTVShows(): Promise<TVShow[]>;
  
  // Paginated methods for browsing all content
  getPopularMoviesPaginated(page: number): Promise<{ movies: Movie[], totalPages: number }>;
  getPopularTVShowsPaginated(page: number): Promise<{ tvShows: TVShow[], totalPages: number }>;
  getTopRatedMoviesPaginated(page: number): Promise<{ movies: Movie[], totalPages: number }>;
  getTopRatedTVShowsPaginated(page: number): Promise<{ tvShows: TVShow[], totalPages: number }>;
  getNowPlayingMoviesPaginated(page: number): Promise<{ movies: Movie[], totalPages: number }>;
  getUpcomingMoviesPaginated(page: number): Promise<{ movies: Movie[], totalPages: number }>;
  getOnTheAirTVShowsPaginated(page: number): Promise<{ tvShows: TVShow[], totalPages: number }>;
  getAiringTodayTVShowsPaginated(page: number): Promise<{ tvShows: TVShow[], totalPages: number }>;
  
  // Search methods
  searchMedia(query: string): Promise<(Movie | TVShow)[]>;
  searchMoviesPaginated(query: string, page: number): Promise<{ movies: Movie[], totalPages: number }>;
  searchTVShowsPaginated(query: string, page: number): Promise<{ tvShows: TVShow[], totalPages: number }>;
  
  // Details methods
  getMovieDetails(id: number): Promise<Movie>;
  getTVShowDetails(id: number): Promise<TVShow>;
  getMovieVideos(id: number): Promise<Video[]>;
  getTVShowVideos(id: number): Promise<Video[]>;
  getVideos(id: number, mediaType: 'movie' | 'tv'): Promise<Video[]>;
  getMovieCredits(id: number): Promise<Credits>;
  getTVShowCredits(id: number): Promise<Credits>;
}

// Hook Types
export interface UseMediaReturn {
  movies: Movie[];
  tvShows: TVShow[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// Utility Types
export type MediaType = 'movie' | 'tv';

export interface MediaListProps {
  title: string;
  media: (Movie | TVShow)[];
  loading?: boolean;
}
