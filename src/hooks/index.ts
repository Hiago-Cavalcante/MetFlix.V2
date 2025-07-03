import { useState, useEffect, useCallback } from 'react';
import { Movie, TVShow, UseMediaReturn } from '../types';
import { mediaService } from '../services';
import { ERROR_MESSAGES } from '../constants';

// Single Responsibility Principle - this hook only manages media data
export const useMedia = (): UseMediaReturn => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [tvShows, setTVShows] = useState<TVShow[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [moviesData, tvShowsData] = await Promise.all([
        mediaService.getPopularMovies(),
        mediaService.getPopularTVShows(),
      ]);

      setMovies(moviesData);
      setTVShows(tvShowsData);
    } catch (err) {
      setError(ERROR_MESSAGES.API_ERROR);
      console.error('Failed to fetch media data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    movies,
    tvShows,
    loading,
    error,
    refetch,
  };
};

// Hook for searching media
export const useSearch = () => {
  const [results, setResults] = useState<(Movie | TVShow)[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const searchResults = await mediaService.searchMedia(query);
      setResults(searchResults);
    } catch (err) {
      setError(ERROR_MESSAGES.API_ERROR);
      console.error('Search failed:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
    setError(null);
  }, []);

  return {
    results,
    loading,
    error,
    search,
    clearResults,
  };
};

// Hook for managing modal state
export const useModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedMedia, setSelectedMedia] = useState<Movie | TVShow | null>(null);

  const openModal = useCallback((media: Movie | TVShow) => {
    setSelectedMedia(media);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setSelectedMedia(null);
  }, []);

  return {
    isOpen,
    selectedMedia,
    openModal,
    closeModal,
  };
};

// Hook for managing favorite/watchlist
export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState<(Movie | TVShow)[]>([]);

  const addToWatchlist = useCallback((media: Movie | TVShow) => {
    setWatchlist(prev => {
      const isAlreadyInList = prev.some(item => item.id === media.id);
      if (!isAlreadyInList) {
        const newWatchlist = [...prev, media];
        localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
        return newWatchlist;
      }
      return prev;
    });
  }, []);

  const removeFromWatchlist = useCallback((mediaId: number) => {
    setWatchlist(prev => {
      const newWatchlist = prev.filter(item => item.id !== mediaId);
      localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
      return newWatchlist;
    });
  }, []);

  const isInWatchlist = useCallback((mediaId: number) => {
    return watchlist.some(item => item.id === mediaId);
  }, [watchlist]);

  // Load watchlist from localStorage on mount
  useEffect(() => {
    const savedWatchlist = localStorage.getItem('watchlist');
    if (savedWatchlist) {
      try {
        setWatchlist(JSON.parse(savedWatchlist));
      } catch (error) {
        console.error('Failed to parse saved watchlist:', error);
      }
    }
  }, []);

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
  };
};

// Hook for responsive behavior
export const useResponsive = () => {
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 600) {
        setScreenSize('mobile');
      } else if (width < 960) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
};
