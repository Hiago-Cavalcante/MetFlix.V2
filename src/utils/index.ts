import { Movie, TVShow, MediaType } from '@/types';
import { API_CONFIG, IMAGE_SIZES } from '@/constants';

// Type guards for media types
export const isMovie = (media: Movie | TVShow): media is Movie => {
  return 'title' in media && 'release_date' in media;
};

export const isTVShow = (media: Movie | TVShow): media is TVShow => {
  return 'name' in media && 'first_air_date' in media;
};

// Get media title regardless of type
export const getMediaTitle = (media: Movie | TVShow): string => {
  return isMovie(media) ? media.title : media.name;
};

// Get media release date regardless of type
export const getMediaReleaseDate = (media: Movie | TVShow): string => {
  return isMovie(media) ? media.release_date : media.first_air_date;
};

// Get media type
export const getMediaType = (media: Movie | TVShow): MediaType => {
  return isMovie(media) ? 'movie' : 'tv';
};

// Format date to readable format
export const formatDate = (dateString: string): string => {
  if (!dateString) return 'Unknown';
  
  const date = new Date(dateString);
  return date.getFullYear().toString();
};

// Get full image URL
export const getImageUrl = (
  path: string | null, 
  size: keyof typeof IMAGE_SIZES.POSTER = 'MEDIUM',
  type: 'poster' | 'backdrop' = 'poster'
): string => {
  if (!path) return '/placeholder-image.jpg';
  
  const imageSize = type === 'poster' 
    ? IMAGE_SIZES.POSTER[size] 
    : IMAGE_SIZES.BACKDROP[size as keyof typeof IMAGE_SIZES.BACKDROP];
  return `${API_CONFIG.IMAGE_BASE_URL}/${imageSize}${path}`;
};

// Format rating
export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

// Get rating color based on score
export const getRatingColor = (rating: number): string => {
  if (rating >= 8) return '#4CAF50'; // Green
  if (rating >= 6) return '#FF9800'; // Orange
  return '#F44336'; // Red
};

// Truncate text
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

// Generate random featured media
export const getRandomFeaturedMedia = (mediaList: (Movie | TVShow)[]): Movie | TVShow | null => {
  if (mediaList.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * mediaList.length);
  return mediaList[randomIndex];
};

// Debounce function for search
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function for scroll events
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Local storage helpers
export const storage = {
  get: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting item ${key} from localStorage:`, error);
      return null;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting item ${key} in localStorage:`, error);
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item ${key} from localStorage:`, error);
    }
  },

  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },
};

// Error handling utility
export const handleError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unknown error occurred';
};

// Generate unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// Check if device is mobile
export const isMobileDevice = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

// Format duration (for future use with detailed media info)
export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours === 0) {
    return `${remainingMinutes}m`;
  }
  
  return `${hours}h ${remainingMinutes}m`;
};
