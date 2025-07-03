import React, { useState } from 'react';
import { Box, Typography, Container, Card, CardMedia, CardContent, Rating, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useMedia } from '../hooks';
import { MediaDetailModal } from '../Components/MediaDetailModal';
import { Movie, TVShow } from '../types';

const SectionTitle = styled(Typography)(({ theme }) => ({
  color: 'white',
  fontWeight: 600,
  fontSize: '1.8rem',
  marginBottom: theme.spacing(3),
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -8,
    left: 0,
    width: 60,
    height: 3,
    background: 'linear-gradient(45deg, #E50914 30%, #FF6B6B 90%)',
    borderRadius: 2,
  },
}));

const MediaGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: theme.spacing(3),
  marginBottom: theme.spacing(6),
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: theme.spacing(2),
  },
}));

const MediaCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'rgba(42, 42, 42, 0.8)',
  borderRadius: 12,
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  border: '1px solid transparent',
  position: 'relative',
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
    borderColor: 'rgba(229, 9, 20, 0.3)',
    '& .media-image': {
      transform: 'scale(1.1)',
    },
    '& .media-overlay': {
      opacity: 1,
    },
  },
}));

const MediaImage = styled(CardMedia)(({ theme }) => ({
  height: 350,
  transition: 'transform 0.4s ease',
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    height: 280,
  },
}));

const MediaOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)',
  opacity: 0,
  transition: 'opacity 0.3s ease',
  display: 'flex',
  alignItems: 'flex-end',
  padding: theme.spacing(2),
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2),
  background: 'linear-gradient(to bottom, rgba(42, 42, 42, 0.95) 0%, rgba(30, 30, 30, 0.95) 100%)',
}));

const LoadingCard = styled(Box)(({ theme }) => ({
  height: 450,
  backgroundColor: 'rgba(42, 42, 42, 0.3)',
  borderRadius: 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px dashed rgba(255,255,255,0.1)',
  animation: 'pulse 2s infinite',
  '@keyframes pulse': {
    '0%': { opacity: 0.6 },
    '50%': { opacity: 1 },
    '100%': { opacity: 0.6 },
  },
}));

export const HomePage: React.FC = React.memo(() => {
  const { movies, tvShows, loading, error } = useMedia();
  const [selectedMedia, setSelectedMedia] = useState<Movie | TVShow | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMediaType, setSelectedMediaType] = useState<'movie' | 'tv'>('movie');

  const handleMediaClick = (item: Movie | TVShow, mediaType: 'movie' | 'tv') => {
    setSelectedMedia(item);
    setSelectedMediaType(mediaType);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedMedia(null);
  };

  const renderMediaCard = (item: Movie | TVShow, index: number, mediaType: 'movie' | 'tv') => (
    <MediaCard 
      key={item.id} 
      sx={{ animationDelay: `${index * 0.1}s` }}
      onClick={() => handleMediaClick(item, mediaType)}
    >
      <Box sx={{ position: 'relative' }}>
        <MediaImage
          className="media-image"
          image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          title={isMovie(item) ? item.title : item.name}
          onError={(e: any) => {
            e.target.src = 'https://via.placeholder.com/300x450/2a2a2a/ffffff?text=No+Image';
          }}
        />
        <MediaOverlay className="media-overlay">
          <Box sx={{ color: 'white' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              {isMovie(item) ? item.title : item.name}
            </Typography>
            <Rating 
              value={item.vote_average / 2} 
              precision={0.1} 
              size="small" 
              readOnly 
              sx={{ mb: 1 }}
            />
          </Box>
        </MediaOverlay>
      </Box>
      
      <StyledCardContent>
        <Typography
          variant="h6"
          sx={{
            color: 'white',
            fontWeight: 600,
            fontSize: '1rem',
            mb: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {isMovie(item) ? item.title : item.name}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Rating 
            value={item.vote_average / 2} 
            precision={0.1} 
            size="small" 
            readOnly 
          />
          <Typography variant="body2" sx={{ color: '#b3b3b3', fontWeight: 500 }}>
            {item.vote_average.toFixed(1)}★
          </Typography>
        </Box>
        
        <Chip 
          label={new Date(isMovie(item) ? item.release_date : item.first_air_date).getFullYear() || 'TBA'}
          size="small"
          sx={{
            backgroundColor: 'rgba(229, 9, 20, 0.2)',
            color: '#E50914',
            fontWeight: 500,
          }}
        />
      </StyledCardContent>
    </MediaCard>
  );

  const isMovie = (media: Movie | TVShow): media is Movie => {
    return 'title' in media;
  };

  const renderLoadingCards = (count: number) => 
    Array.from({ length: count }).map((_, index) => (
      <LoadingCard key={index}>
        <Typography sx={{ color: 'rgba(255,255,255,0.3)' }}>
          Loading...
        </Typography>
      </LoadingCard>
    ));

  return (
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="xl" sx={{ pt: 12, pb: 6 }}>
        {/* Movies Section */}
        <Box sx={{ mb: 6 }}>
          <SectionTitle>
            🎬 Popular Movies
          </SectionTitle>
          {error && (
            <Typography sx={{ color: 'error.main', mb: 3 }}>
              {error}
            </Typography>
          )}
          <MediaGrid>
            {loading 
              ? renderLoadingCards(12)
              : movies.slice(0, 12).map((movie, index) => renderMediaCard(movie, index, 'movie'))
            }
          </MediaGrid>
        </Box>
        
        {/* TV Shows Section */}
        <Box sx={{ mb: 6 }}>
          <SectionTitle>
            📺 Popular TV Shows
          </SectionTitle>
          <MediaGrid>
            {loading 
              ? renderLoadingCards(12)
              : tvShows.slice(0, 12).map((show, index) => renderMediaCard(show, index, 'tv'))
            }
          </MediaGrid>
        </Box>
      </Container>

      {/* Media Detail Modal */}
      <MediaDetailModal
        open={modalOpen}
        onClose={handleCloseModal}
        media={selectedMedia}
        mediaType={selectedMediaType}
      />
    </Box>
  );
});

HomePage.displayName = 'HomePage';
