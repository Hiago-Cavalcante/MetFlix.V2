import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Box, Typography, Container, Pagination, CircularProgress, Chip, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Movie } from '../types';
import { mediaService } from '../services';
import { MediaDetailModal } from '../Components/MediaDetailModal';

// Styled components - clean and reusable
const PageContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(4),
  minHeight: '100vh',
}));

const MoviesGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  gap: theme.spacing(2.5),
  marginBottom: theme.spacing(4),
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: theme.spacing(3),
  },
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(6, 1fr)',
  },
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(7, 1fr)',
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: theme.spacing(2),
  },
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  color: 'white',
  fontWeight: 700,
  marginBottom: theme.spacing(4),
  textAlign: 'center',
  background: 'linear-gradient(45deg, #E50914 30%, #FF6B6B 90%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

const MovieCard = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(42, 42, 42, 0.8)',
  borderRadius: 12,
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
  },
}));

const MovieImage = styled('img')({
  width: '100%',
  height: 320,
  objectFit: 'cover',
  display: 'block',
});

const MovieInfo = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  background: 'rgba(30, 30, 30, 0.95)',
}));

const LoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '50vh',
});

const QuickNavChip = styled(Chip)(({ theme }) => ({
  backgroundColor: 'rgba(42, 42, 42, 0.8)',
  color: 'white',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#E50914',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 16px rgba(229, 9, 20, 0.3)',
  },
  '&.active': {
    backgroundColor: '#E50914',
    fontWeight: 700,
  },
}));

const MOVIES_PER_PAGE = 28; // Increased to 28 for better coverage

// Single Responsibility Principle - this component only handles movie display logic
export const MoviesPage: React.FC = React.memo(() => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Real paginated API call - Open/Closed Principle
  const fetchMovies = useCallback(async (pageNumber: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const { movies: movieData, totalPages: total } = await mediaService.getPopularMoviesPaginated(pageNumber);
      setMovies(movieData);
      setTotalPages(total);
    } catch (err) {
      setError('Failed to load movies. Please try again.');
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Effect with cleanup - Dependency Inversion Principle
  useEffect(() => {
    fetchMovies(page);
  }, [page, fetchMovies]);

  // Event handlers - Interface Segregation Principle
  const handlePageChange = useCallback((_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleMovieClick = useCallback((movie: Movie) => {
    setSelectedMovie(movie);
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setSelectedMovie(null);
  }, []);

  // Quick navigation to popular page ranges
  const getQuickNavPages = useCallback(() => {
    const ranges = [
      { label: '1-10', start: 1, end: 10 },
      { label: '11-25', start: 11, end: 25 },
      { label: '26-50', start: 26, end: 50 },
      { label: '51-100', start: 51, end: 100 },
      { label: '101-200', start: 101, end: 200 },
      { label: '201-300', start: 201, end: 300 },
      { label: '301-400', start: 301, end: 400 },
      { label: '401-500', start: 401, end: 500 },
    ];
    
    return ranges.filter(range => range.end <= totalPages);
  }, [totalPages]);

  const handleQuickNavClick = useCallback((startPage: number) => {
    setPage(startPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Memoized render functions for performance
  const renderMovieCard = useCallback((movie: Movie) => (
    <MovieCard key={movie.id} onClick={() => handleMovieClick(movie)}>
      <MovieImage
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        onError={(e: any) => {
          e.target.src = 'https://via.placeholder.com/300x450/2a2a2a/ffffff?text=No+Image';
        }}
      />
      <MovieInfo>
        <Typography
          variant="h6"
          sx={{
            color: 'white',
            fontWeight: 600,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            mb: 1,
          }}
        >
          {movie.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: '#b3b3b3',
            fontWeight: 500,
          }}
        >
          {new Date(movie.release_date).getFullYear()} • ★ {movie.vote_average.toFixed(1)}
        </Typography>
      </MovieInfo>
    </MovieCard>
  ), [handleMovieClick]);

  // Memoized movie list for performance
  const movieList = useMemo(() => 
    movies.map(renderMovieCard), 
    [movies, renderMovieCard]
  );

  if (loading) {
    return (
      <PageContainer>
        <LoadingContainer>
          <CircularProgress sx={{ color: '#E50914' }} size={50} />
        </LoadingContainer>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <Box textAlign="center" py={8}>
          <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
            {error}
          </Typography>
        </Box>
      </PageContainer>
    );
  }

  return (
    <PageContainer maxWidth="xl">
      <PageTitle variant="h3">
        🎬 Popular Movies
      </PageTitle>

      {/* Quick Navigation */}
      {totalPages > 10 && (
        <Box mb={4}>
          <Typography variant="h6" sx={{ color: 'white', mb: 2, textAlign: 'center' }}>
            Navegação Rápida
          </Typography>
          <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" useFlexGap>
            {getQuickNavPages().map((range) => (
              <QuickNavChip
                key={range.label}
                label={`Páginas ${range.label}`}
                onClick={() => handleQuickNavClick(range.start)}
                className={page >= range.start && page <= range.end ? 'active' : ''}
              />
            ))}
          </Stack>
        </Box>
      )}

      <MoviesGrid>
        {movieList}
      </MoviesGrid>

      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4} mb={2}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            size="large"
            showFirstButton
            showLastButton
            siblingCount={2}
            boundaryCount={1}
            sx={{
              '& .MuiPaginationItem-root': {
                color: 'white',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                fontSize: '1rem',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'rgba(229, 9, 20, 0.1)',
                  borderColor: '#E50914',
                  transform: 'scale(1.05)',
                },
                '&.Mui-selected': {
                  backgroundColor: '#E50914',
                  color: 'white',
                  fontWeight: 700,
                  '&:hover': {
                    backgroundColor: '#cc080f',
                  },
                },
              },
              '& .MuiPaginationItem-ellipsis': {
                color: 'rgba(255, 255, 255, 0.6)',
              },
            }}
          />
        </Box>
      )}

      {/* Page Info */}
      <Box textAlign="center" mt={2} mb={4}>
        <Typography variant="body2" sx={{ color: '#b3b3b3' }}>
          Página {page} de {totalPages} • {movies.length} filmes mostrados
        </Typography>
        <Typography variant="caption" sx={{ color: '#666', mt: 1, display: 'block' }}>
          Total de páginas disponíveis: {totalPages} • Explore todos os filmes populares!
        </Typography>
      </Box>

      {/* Modal Component - Liskov Substitution Principle */}
      <MediaDetailModal
        open={modalOpen}
        onClose={handleCloseModal}
        media={selectedMovie}
        mediaType="movie"
      />
    </PageContainer>
  );
});

MoviesPage.displayName = 'MoviesPage';
