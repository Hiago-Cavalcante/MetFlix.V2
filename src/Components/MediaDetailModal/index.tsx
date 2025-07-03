import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Rating,
  Chip,
  Button,
  CircularProgress,
  Stack,
} from '@mui/material';
import {
  Close as CloseIcon,
  PlayArrow as PlayIcon,
  Add as AddIcon,
  ThumbUp as ThumbUpIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Movie, TVShow, Video } from '../../types';
import { mediaService } from '../../services';

interface MediaDetailModalProps {
  open: boolean;
  onClose: () => void;
  media: Movie | TVShow | null;
  mediaType: 'movie' | 'tv';
}

// Styled components for better performance - moved outside component to prevent recreation
const ModalContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: 1000,
  maxHeight: '85vh',
  backgroundColor: '#141414',
  borderRadius: 12,
  overflow: 'hidden',
  outline: 'none',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8)',
  border: '1px solid rgba(229, 9, 20, 0.2)',
  willChange: 'transform, opacity',
  [theme.breakpoints.down('md')]: {
    width: '95vw',
    maxHeight: '90vh',
  },
  [theme.breakpoints.down('sm')]: {
    width: '98vw',
    maxHeight: '95vh',
  },
}));

const HeroSection = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'backgroundImage',
})<{ backgroundImage?: string }>(({ theme }) => ({
  position: 'relative',
  height: 400,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  display: 'flex',
  alignItems: 'flex-end',
  willChange: 'transform',
  [theme.breakpoints.down('md')]: {
    height: 350,
  },
  [theme.breakpoints.down('sm')]: {
    height: 280,
  },
}));

const ContentSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  maxHeight: 350,
  overflowY: 'auto',
  backgroundColor: '#141414',
  scrollbarWidth: 'thin',
  scrollbarColor: '#E50914 transparent',
  '&::-webkit-scrollbar': {
    width: 6,
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#E50914',
    borderRadius: 3,
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    maxHeight: 300,
  },
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  color: 'white',
  zIndex: 10,
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    transform: 'scale(1.1)',
  },
  transition: 'all 0.2s ease',
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: 6,
  fontWeight: 600,
  textTransform: 'none',
  minWidth: 120,
  height: 40,
  transition: 'transform 0.2s ease',
  willChange: 'transform',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

const PlayButton = styled(ActionButton)({
  backgroundColor: 'white',
  color: 'black',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
});

const SecondaryButton = styled(ActionButton)({
  backgroundColor: 'rgba(109, 109, 110, 0.7)',
  color: 'white',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  '&:hover': {
    backgroundColor: 'rgba(109, 109, 110, 0.9)',
  },
});

const LoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 150,
});

// Memoized components for better performance
const MemoizedRating = React.memo(({ value }: { value: number }) => (
  <Rating
    value={value / 2}
    precision={0.1}
    readOnly
    size="medium"
    sx={{ 
      '& .MuiRating-iconFilled': { color: '#E50914' },
      '& .MuiRating-iconEmpty': { color: 'rgba(255,255,255,0.3)' },
    }}
  />
));

const MemoizedGenreChips = React.memo(({ genres }: { genres: Array<{ id: number; name: string }> }) => (
  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
    {genres.map((genre) => (
      <Chip
        key={genre.id}
        label={genre.name}
        size="small"
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          color: 'white',
          fontWeight: 500,
          mb: 1,
        }}
      />
    ))}
  </Stack>
));

export const MediaDetailModal: React.FC<MediaDetailModalProps> = React.memo(({
  open,
  onClose,
  media,
  mediaType,
}) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);

  // Memoized helper functions for better performance
  const isMovie = useCallback((item: Movie | TVShow | undefined): item is Movie => {
    return item !== undefined && 'title' in item;
  }, []);

  // Memoized media info calculation
  const mediaInfo = useMemo(() => {
    if (!media) return { title: '', releaseDate: '', backgroundImage: '' };
    
    const title = isMovie(media) ? media.title : media.name;
    const date = isMovie(media) ? media.release_date : media.first_air_date;
    const releaseDate = new Date(date).getFullYear().toString();
    const backgroundImage = media.backdrop_path 
      ? `linear-gradient(to bottom, transparent 0%, rgba(20, 20, 20, 0.8) 70%, rgba(20, 20, 20, 1) 100%), url(https://image.tmdb.org/t/p/original${media.backdrop_path})`
      : 'linear-gradient(to bottom, transparent 0%, rgba(20, 20, 20, 0.8) 70%, rgba(20, 20, 20, 1) 100%)';

    return { title, releaseDate, backgroundImage };
  }, [media, isMovie]);

  // Debounced video fetching to prevent excessive API calls
  const fetchVideos = useCallback(async () => {
    if (!media || !open) {
      setVideos([]);
      return;
    }

    setLoading(true);
    try {
      const videoData = await mediaService.getVideos(media.id, mediaType);
      const trailers = videoData.filter(
        (video: Video) => video.type === 'Trailer' && video.site === 'YouTube'
      ).slice(0, 3); // Limit to 3 trailers for performance
      setVideos(trailers);
    } catch (error) {
      console.error('Failed to fetch videos:', error);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  }, [media?.id, mediaType, open]);

  // Use effect with cleanup
  useEffect(() => {
    if (open && media) {
      const timeoutId = setTimeout(fetchVideos, 100); // Small delay to improve perceived performance
      return () => clearTimeout(timeoutId);
    }
  }, [fetchVideos, open, media]);

  const handlePlayTrailer = useCallback(() => {
    if (videos.length > 0) {
      window.open(`https://www.youtube.com/watch?v=${videos[0].key}`, '_blank');
    }
  }, [videos]);

  // Early return for better performance
  if (!media) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(4px)',
      }}
      disableAutoFocus
      disableEnforceFocus
      disableRestoreFocus
    >
      <ModalContainer>
        <CloseButton onClick={onClose} size="small">
          <CloseIcon />
        </CloseButton>

        {/* Hero Section with Backdrop */}
        <HeroSection
          sx={{
            backgroundImage: mediaInfo.backgroundImage,
          }}
        >
          <Box sx={{ p: 3, width: '100%' }}>
            <Typography
              variant="h4"
              sx={{
                color: 'white',
                fontWeight: 700,
                mb: 2,
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
                lineHeight: 1.2,
              }}
            >
              {mediaInfo.title}
            </Typography>

            <Stack direction="row" spacing={2} sx={{ mb: 2 }} flexWrap="wrap">
              {videos.length > 0 && (
                <PlayButton
                  startIcon={<PlayIcon />}
                  onClick={handlePlayTrailer}
                >
                  Assistir Trailer
                </PlayButton>
              )}
              <SecondaryButton startIcon={<AddIcon />}>
                Minha Lista
              </SecondaryButton>
            </Stack>
          </Box>
        </HeroSection>

          {/* Content Section */}
          <ContentSection>
            {loading ? (
              <LoadingContainer>
                <CircularProgress sx={{ color: '#E50914' }} size={30} />
              </LoadingContainer>
            ) : (
              <Stack spacing={3}>
                {/* Rating and Year */}
                <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
                  <MemoizedRating value={media.vote_average} />
                  <Typography sx={{ color: '#fff', fontWeight: 600 }}>
                    {media.vote_average.toFixed(1)}/10
                  </Typography>
                  <Chip
                    label={mediaInfo.releaseDate}
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(229, 9, 20, 0.8)',
                      color: 'white',
                      fontWeight: 600,
                    }}
                  />
                </Stack>

                {/* Overview */}
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ 
                      color: 'white', 
                      mb: 1, 
                      fontWeight: 600,
                    }}
                  >
                    Sinopse
                  </Typography>
                  <Typography
                    sx={{
                      color: '#e5e5e5',
                      lineHeight: 1.6,
                      fontSize: '0.95rem',
                    }}
                  >
                    {media.overview || 'Sinopse não disponível.'}
                  </Typography>
                </Box>

                {/* Genres */}
                {media.genres && media.genres.length > 0 && (
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ 
                        color: 'white', 
                        mb: 1, 
                        fontWeight: 600,
                      }}
                    >
                      Gêneros
                    </Typography>
                    <MemoizedGenreChips genres={media.genres} />
                  </Box>
                )}

                {/* Additional Info */}
                <Stack direction="row" spacing={3} flexWrap="wrap">
                  {isMovie(media) && media.runtime && (
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ color: '#b3b3b3', fontWeight: 500 }}
                      >
                        Duração
                      </Typography>
                      <Typography sx={{ color: 'white' }}>
                        {media.runtime} min
                      </Typography>
                    </Box>
                  )}
                  {!isMovie(media) && media.number_of_seasons && (
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ color: '#b3b3b3', fontWeight: 500 }}
                      >
                        Temporadas
                      </Typography>
                      <Typography sx={{ color: 'white' }}>
                        {media.number_of_seasons}
                      </Typography>
                    </Box>
                  )}
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ color: '#b3b3b3', fontWeight: 500 }}
                    >
                      Idioma
                    </Typography>
                    <Typography sx={{ color: 'white' }}>
                      {media.original_language?.toUpperCase() || 'N/A'}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            )}
          </ContentSection>
        </ModalContainer>
    </Modal>
  );
});

MediaDetailModal.displayName = 'MediaDetailModal';
