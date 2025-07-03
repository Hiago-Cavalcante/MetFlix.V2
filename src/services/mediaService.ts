import { Movie, TVShow, MediaService, Video, VideosResponse, Credits } from '../types';
import { API_CONFIG, ENDPOINTS } from '../constants';

// Interface segregation principle - separate interfaces for different concerns
export interface HttpClient {
  get<T>(url: string, params?: Record<string, any>): Promise<T>;
}

export interface ApiResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

// Concrete implementation of HttpClient
class TMDBHttpClient implements HttpClient {
  private baseURL: string;
  private apiKey: string;

  constructor(baseURL: string, apiKey: string) {
    this.baseURL = baseURL;
    this.apiKey = apiKey;
  }

  async get<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
    const url = new URL(`${this.baseURL}${endpoint}`);
    url.searchParams.append('api_key', this.apiKey);
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });

    try {
      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }
}

// Dependency injection - MediaService depends on HttpClient abstraction
export class TMDBMediaService implements MediaService {
  constructor(private httpClient: HttpClient) {}

  async getPopularMovies(): Promise<Movie[]> {
    try {
      const response = await this.httpClient.get<ApiResponse<Movie>>(
        ENDPOINTS.MOVIES.POPULAR
      );
      return response.results;
    } catch (error) {
      console.error('Failed to fetch popular movies:', error);
      throw new Error('Failed to fetch popular movies');
    }
  }

  async getPopularTVShows(): Promise<TVShow[]> {
    try {
      const response = await this.httpClient.get<ApiResponse<TVShow>>(
        ENDPOINTS.TV.POPULAR
      );
      return response.results;
    } catch (error) {
      console.error('Failed to fetch popular TV shows:', error);
      throw new Error('Failed to fetch popular TV shows');
    }
  }

  async getTopRatedMovies(): Promise<Movie[]> {
    try {
      const response = await this.httpClient.get<ApiResponse<Movie>>(
        ENDPOINTS.MOVIES.TOP_RATED
      );
      return response.results;
    } catch (error) {
      console.error('Failed to fetch top rated movies:', error);
      throw new Error('Failed to fetch top rated movies');
    }
  }

  async getTopRatedTVShows(): Promise<TVShow[]> {
    try {
      const response = await this.httpClient.get<ApiResponse<TVShow>>(
        ENDPOINTS.TV.TOP_RATED
      );
      return response.results;
    } catch (error) {
      console.error('Failed to fetch top rated TV shows:', error);
      throw new Error('Failed to fetch top rated TV shows');
    }
  }

  async searchMedia(query: string): Promise<(Movie | TVShow)[]> {
    try {
      const [movieResponse, tvResponse] = await Promise.all([
        this.httpClient.get<ApiResponse<Movie>>(ENDPOINTS.MOVIES.SEARCH, { query }),
        this.httpClient.get<ApiResponse<TVShow>>(ENDPOINTS.TV.SEARCH, { query }),
      ]);

      return [...movieResponse.results, ...tvResponse.results];
    } catch (error) {
      console.error('Failed to search media:', error);
      throw new Error('Failed to search media');
    }
  }

  async getMovieDetails(id: number): Promise<Movie> {
    try {
      const response = await this.httpClient.get<Movie>(
        ENDPOINTS.MOVIES.DETAILS(id)
      );
      return response;
    } catch (error) {
      console.error('Failed to fetch movie details:', error);
      throw new Error('Failed to fetch movie details');
    }
  }

  async getTVShowDetails(id: number): Promise<TVShow> {
    try {
      const response = await this.httpClient.get<TVShow>(
        ENDPOINTS.TV.DETAILS(id)
      );
      return response;
    } catch (error) {
      console.error('Failed to fetch TV show details:', error);
      throw new Error('Failed to fetch TV show details');
    }
  }

  async getMovieVideos(id: number): Promise<Video[]> {
    try {
      const response = await this.httpClient.get<VideosResponse>(
        ENDPOINTS.MOVIES.VIDEOS(id)
      );
      return response.results;
    } catch (error) {
      console.error('Failed to fetch movie videos:', error);
      throw new Error('Failed to fetch movie videos');
    }
  }

  async getTVShowVideos(id: number): Promise<Video[]> {
    try {
      const response = await this.httpClient.get<VideosResponse>(
        ENDPOINTS.TV.VIDEOS(id)
      );
      return response.results;
    } catch (error) {
      console.error('Failed to fetch TV show videos:', error);
      throw new Error('Failed to fetch TV show videos');
    }
  }

  async getVideos(id: number, mediaType: 'movie' | 'tv'): Promise<Video[]> {
    try {
      if (mediaType === 'movie') {
        return await this.getMovieVideos(id);
      } else {
        return await this.getTVShowVideos(id);
      }
    } catch (error) {
      console.error(`Failed to fetch ${mediaType} videos:`, error);
      throw new Error(`Failed to fetch ${mediaType} videos`);
    }
  }

  async getMovieCredits(id: number): Promise<Credits> {
    try {
      const response = await this.httpClient.get<Credits>(
        ENDPOINTS.MOVIES.CREDITS(id)
      );
      return response;
    } catch (error) {
      console.error('Failed to fetch movie credits:', error);
      throw new Error('Failed to fetch movie credits');
    }
  }

  async getTVShowCredits(id: number): Promise<Credits> {
    try {
      const response = await this.httpClient.get<Credits>(
        ENDPOINTS.TV.CREDITS(id)
      );
      return response;
    } catch (error) {
      console.error('Failed to fetch TV show credits:', error);
      throw new Error('Failed to fetch TV show credits');
    }
  }

  async getPopularMoviesPaginated(page: number = 1): Promise<{ movies: Movie[], totalPages: number }> {
    try {
      // Fetch multiple pages to get 28 items
      const promises = [];
      let currentPage = page;
      let totalItems = 0;
      let allMovies: Movie[] = [];
      
      // Calculate which actual API pages we need to fetch
      const itemsPerApiPage = 20; // TMDB default
      const targetItems = 28;
      
      // Determine starting page and how many pages to fetch
      const startApiPage = Math.floor((page - 1) * targetItems / itemsPerApiPage) + 1;
      const pagesToFetch = Math.ceil(targetItems / itemsPerApiPage);
      
      for (let i = 0; i < pagesToFetch; i++) {
        promises.push(
          this.httpClient.get<ApiResponse<Movie>>(
            ENDPOINTS.MOVIES.POPULAR,
            { page: startApiPage + i }
          )
        );
      }
      
      const responses = await Promise.all(promises);
      
      // Combine results
      responses.forEach(response => {
        allMovies = allMovies.concat(response.results);
      });
      
      // Calculate offset based on the virtual page
      const offset = ((page - 1) * targetItems) % itemsPerApiPage;
      const selectedMovies = allMovies.slice(offset, offset + targetItems);
      
      // Calculate total pages based on total results
      const totalResults = responses[0]?.total_results || 0;
      const calculatedTotalPages = Math.ceil(totalResults / targetItems);
      
      return {
        movies: selectedMovies,
        totalPages: Math.min(calculatedTotalPages, 500) // TMDB limit
      };
    } catch (error) {
      console.error('Failed to fetch paginated movies:', error);
      throw new Error('Failed to fetch paginated movies');
    }
  }

  async getPopularTVShowsPaginated(page: number = 1): Promise<{ tvShows: TVShow[], totalPages: number }> {
    try {
      // Fetch multiple pages to get 28 items
      const promises = [];
      let allTVShows: TVShow[] = [];
      
      // Calculate which actual API pages we need to fetch
      const itemsPerApiPage = 20; // TMDB default
      const targetItems = 28;
      
      // Determine starting page and how many pages to fetch
      const startApiPage = Math.floor((page - 1) * targetItems / itemsPerApiPage) + 1;
      const pagesToFetch = Math.ceil(targetItems / itemsPerApiPage);
      
      for (let i = 0; i < pagesToFetch; i++) {
        promises.push(
          this.httpClient.get<ApiResponse<TVShow>>(
            ENDPOINTS.TV.POPULAR,
            { page: startApiPage + i }
          )
        );
      }
      
      const responses = await Promise.all(promises);
      
      // Combine results
      responses.forEach(response => {
        allTVShows = allTVShows.concat(response.results);
      });
      
      // Calculate offset based on the virtual page
      const offset = ((page - 1) * targetItems) % itemsPerApiPage;
      const selectedTVShows = allTVShows.slice(offset, offset + targetItems);
      
      // Calculate total pages based on total results
      const totalResults = responses[0]?.total_results || 0;
      const calculatedTotalPages = Math.ceil(totalResults / targetItems);
      
      return {
        tvShows: selectedTVShows,
        totalPages: Math.min(calculatedTotalPages, 500) // TMDB limit
      };
    } catch (error) {
      console.error('Failed to fetch paginated TV shows:', error);
      throw new Error('Failed to fetch paginated TV shows');
    }
  }

  // Additional methods for different categories with full pagination
  async getTopRatedMoviesPaginated(page: number = 1): Promise<{ movies: Movie[], totalPages: number }> {
    try {
      const response = await this.httpClient.get<ApiResponse<Movie>>(
        ENDPOINTS.MOVIES.TOP_RATED,
        { page }
      );
      return {
        movies: response.results,
        totalPages: Math.min(response.total_pages, 500)
      };
    } catch (error) {
      console.error('Failed to fetch paginated top rated movies:', error);
      throw new Error('Failed to fetch paginated top rated movies');
    }
  }

  async getTopRatedTVShowsPaginated(page: number = 1): Promise<{ tvShows: TVShow[], totalPages: number }> {
    try {
      const response = await this.httpClient.get<ApiResponse<TVShow>>(
        ENDPOINTS.TV.TOP_RATED,
        { page }
      );
      return {
        tvShows: response.results,
        totalPages: Math.min(response.total_pages, 500)
      };
    } catch (error) {
      console.error('Failed to fetch paginated top rated TV shows:', error);
      throw new Error('Failed to fetch paginated top rated TV shows');
    }
  }

  async getNowPlayingMoviesPaginated(page: number = 1): Promise<{ movies: Movie[], totalPages: number }> {
    try {
      const response = await this.httpClient.get<ApiResponse<Movie>>(
        '/movie/now_playing',
        { page }
      );
      return {
        movies: response.results,
        totalPages: Math.min(response.total_pages, 500)
      };
    } catch (error) {
      console.error('Failed to fetch paginated now playing movies:', error);
      throw new Error('Failed to fetch paginated now playing movies');
    }
  }

  async getUpcomingMoviesPaginated(page: number = 1): Promise<{ movies: Movie[], totalPages: number }> {
    try {
      const response = await this.httpClient.get<ApiResponse<Movie>>(
        '/movie/upcoming',
        { page }
      );
      return {
        movies: response.results,
        totalPages: Math.min(response.total_pages, 500)
      };
    } catch (error) {
      console.error('Failed to fetch paginated upcoming movies:', error);
      throw new Error('Failed to fetch paginated upcoming movies');
    }
  }

  async getOnTheAirTVShowsPaginated(page: number = 1): Promise<{ tvShows: TVShow[], totalPages: number }> {
    try {
      const response = await this.httpClient.get<ApiResponse<TVShow>>(
        '/tv/on_the_air',
        { page }
      );
      return {
        tvShows: response.results,
        totalPages: Math.min(response.total_pages, 500)
      };
    } catch (error) {
      console.error('Failed to fetch paginated on the air TV shows:', error);
      throw new Error('Failed to fetch paginated on the air TV shows');
    }
  }

  async getAiringTodayTVShowsPaginated(page: number = 1): Promise<{ tvShows: TVShow[], totalPages: number }> {
    try {
      const response = await this.httpClient.get<ApiResponse<TVShow>>(
        '/tv/airing_today',
        { page }
      );
      return {
        tvShows: response.results,
        totalPages: Math.min(response.total_pages, 500)
      };
    } catch (error) {
      console.error('Failed to fetch paginated airing today TV shows:', error);
      throw new Error('Failed to fetch paginated airing today TV shows');
    }
  }

  // Search with pagination
  async searchMoviesPaginated(query: string, page: number = 1): Promise<{ movies: Movie[], totalPages: number }> {
    try {
      const response = await this.httpClient.get<ApiResponse<Movie>>(
        ENDPOINTS.MOVIES.SEARCH,
        { query, page }
      );
      return {
        movies: response.results,
        totalPages: Math.min(response.total_pages, 500)
      };
    } catch (error) {
      console.error('Failed to search movies:', error);
      throw new Error('Failed to search movies');
    }
  }

  async searchTVShowsPaginated(query: string, page: number = 1): Promise<{ tvShows: TVShow[], totalPages: number }> {
    try {
      const response = await this.httpClient.get<ApiResponse<TVShow>>(
        ENDPOINTS.TV.SEARCH,
        { query, page }
      );
      return {
        tvShows: response.results,
        totalPages: Math.min(response.total_pages, 500)
      };
    } catch (error) {
      console.error('Failed to search TV shows:', error);
      throw new Error('Failed to search TV shows');
    }
  }
}

// Factory pattern for creating service instances
export class MediaServiceFactory {
  static create(): MediaService {
    const httpClient = new TMDBHttpClient(API_CONFIG.BASE_URL, API_CONFIG.API_KEY);
    return new TMDBMediaService(httpClient);
  }
}

// Export singleton instance
export const mediaService = MediaServiceFactory.create();
