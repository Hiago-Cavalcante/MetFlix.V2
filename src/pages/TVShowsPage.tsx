import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Box, Typography, Container, Pagination, CircularProgress, Chip, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TVShow } from '../types';
import { mediaService } from '../services';
import { MediaDetailModal } from '../Components/MediaDetailModal';

// Styled components - clean and reusable (DRY principle)
const PageContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(4),
  minHeight: '100vh',
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

const TVShowsGrid = styled(Box)(({ theme }) => ({
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

const TVShowCard = styled(Box)(({ theme }) => ({
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

const TVShowImage = styled('img')({
  width: '100%',
  height: 320,
  objectFit: 'cover',
  display: 'block',
});

const TVShowInfo = styled(Box)(({ theme }) => ({
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

const SHOWS_PER_PAGE = 28; // Increased to 28 for better coverage

// Single Responsibility Principle - this component only handles TV show display logic
export const TVShowsPage: React.FC = React.memo(() => {
  const [tvShows, setTVShows] = useState<TVShow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTVShow, setSelectedTVShow] = useState<TVShow | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Real paginated API call - Open/Closed Principle
  const fetchTVShows = useCallback(async (pageNumber: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const { tvShows: tvShowData, totalPages: total } = await mediaService.getPopularTVShowsPaginated(pageNumber);
      setTVShows(tvShowData);
      setTotalPages(total);
    } catch (err) {
      setError('Failed to load TV shows. Please try again.');
      console.error('Error fetching TV shows:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Effect with cleanup - Dependency Inversion Principle
  useEffect(() => {
    fetchTVShows(page);
  }, [page, fetchTVShows]);

  // Event handlers - Interface Segregation Principle
  const handlePageChange = useCallback((_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleTVShowClick = useCallback((tvShow: TVShow) => {
    setSelectedTVShow(tvShow);
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setSelectedTVShow(null);
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
  const renderTVShowCard = useCallback((tvShow: TVShow) => (
    <TVShowCard key={tvShow.id} onClick={() => handleTVShowClick(tvShow)}>
      <TVShowImage
        src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
        alt={tvShow.name}
        onError={(e: any) => {
          e.target.src = 'https://via.placeholder.com/300x450/2a2a2a/ffffff?text=No+Image';
        }}
      />
      <TVShowInfo>
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
          {tvShow.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: '#b3b3b3',
            fontWeight: 500,
          }}
        >
          {new Date(tvShow.first_air_date).getFullYear()} • ★ {tvShow.vote_average.toFixed(1)}
        </Typography>
      </TVShowInfo>
    </TVShowCard>
  ), [handleTVShowClick]);

  // Memoized TV show list for performance
  const tvShowList = useMemo(() => 
    tvShows.map(renderTVShowCard), 
    [tvShows, renderTVShowCard]
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
        📺 Popular TV Shows
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

      {/* Quick Navigation Chips - for faster access to popular pages */}
      <Box display="flex" justifyContent="center" flexWrap="wrap" mb={4}>
        <QuickNavChip
          label="Início"
          onClick={() => setPage(1)}
          className={page === 1 ? 'active' : ''}
        />
        <QuickNavChip
          label="Ação"
          onClick={() => setPage(2)}
          className={page === 2 ? 'active' : ''}
        />
        <QuickNavChip
          label="Drama"
          onClick={() => setPage(3)}
          className={page === 3 ? 'active' : ''}
        />
        <QuickNavChip
          label="Comédia"
          onClick={() => setPage(4)}
          className={page === 4 ? 'active' : ''}
        />
        <QuickNavChip
          label="Suspense"
          onClick={() => setPage(5)}
          className={page === 5 ? 'active' : ''}
        />
      </Box>

      {/* Quick Nav by Page Range */}
      <Box display="flex" justifyContent="center" flexWrap="wrap" mb={4}>
        {getQuickNavPages().map(range => (
          <QuickNavChip
            key={range.label}
            label={range.label}
            onClick={() => handleQuickNavClick(range.start)}
            className={page >= range.start && page <= range.end ? 'active' : ''}
            sx={{ mr: 1, mb: 1 }}
          />
        ))}
      </Box>

      <TVShowsGrid>
        {tvShowList}
      </TVShowsGrid>

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
          Página {page} de {totalPages} • {tvShows.length} séries mostradas
        </Typography>
        <Typography variant="caption" sx={{ color: '#666', mt: 1, display: 'block' }}>
          Total de páginas disponíveis: {totalPages} • Explore todas as séries populares!
        </Typography>
      </Box>

      {/* Modal Component - Liskov Substitution Principle */}
      <MediaDetailModal
        open={modalOpen}
        onClose={handleCloseModal}
        media={selectedTVShow}
        mediaType="tv"
      />
    </PageContainer>
  );
});

TVShowsPage.displayName = 'TVShowsPage';
