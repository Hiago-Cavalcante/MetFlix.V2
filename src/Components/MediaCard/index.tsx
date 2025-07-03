import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Rating,
  IconButton,
  Chip,
  useTheme,
  alpha,
  Skeleton,
} from '@mui/material';
import {
  PlayArrow,
  Add,
  ThumbUp,
  MoreVert,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Movie, TVShow } from '@/types';
import {
  getImageUrl,
  getMediaTitle,
  formatDate,
  getMediaReleaseDate,
  formatRating,
  truncateText,
} from '@/utils';

const StyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.spacing(1),
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    transform: 'scale(1.05)',
    zIndex: 10,
    boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
    '& .media-overlay': {
      opacity: 1,
    },
  },
}));

const MediaOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: `linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.6) 50%,
    transparent 100%
  )`,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  padding: theme.spacing(2),
  opacity: 0,
  transition: 'opacity 0.3s ease',
}));

const ActionBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: theme.spacing(1),
}));

const ActionButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(0.5),
}));

const RoundIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.common.white, 0.2),
  color: theme.palette.common.white,
  width: 32,
  height: 32,
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.3),
  },
}));

interface MediaCardProps {
  media: Movie | TVShow;
  onSelect: (media: Movie | TVShow) => void;
  onAddToList?: (media: Movie | TVShow) => void;
  loading?: boolean;
}

export const MediaCard: React.FC<MediaCardProps> = ({
  media,
  onSelect,
  onAddToList,
  loading = false,
}) => {
  const theme = useTheme();

  if (loading) {
    return (
      <Card sx={{ width: '100%', borderRadius: 1 }}>
        <Skeleton variant="rectangular" height={300} />
        <CardContent>
          <Skeleton variant="text" height={24} />
          <Skeleton variant="text" height={20} width="60%" />
        </CardContent>
      </Card>
    );
  }

  const posterUrl = getImageUrl(media.poster_path, 'MEDIUM');
  const title = getMediaTitle(media);
  const releaseDate = getMediaReleaseDate(media);
  const year = formatDate(releaseDate);
  const rating = formatRating(media.vote_average);

  const handleCardClick = () => {
    onSelect(media);
  };

  const handleAddToList = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToList?.(media);
  };

  return (
    <StyledCard onClick={handleCardClick}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="300"
          image={posterUrl}
          alt={title}
          sx={{
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
          }}
        />
        
        <MediaOverlay className="media-overlay">
          <Typography
            variant="h6"
            component="h3"
            sx={{
              color: 'white',
              fontWeight: 600,
              mb: 0.5,
              textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
            }}
          >
            {truncateText(title, 40)}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating
              value={media.vote_average / 2}
              precision={0.1}
              size="small"
              readOnly
              sx={{ mr: 1 }}
            />
            <Typography variant="body2" sx={{ color: 'white', opacity: 0.8 }}>
              {rating}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Chip
              label={year}
              size="small"
              sx={{
                backgroundColor: alpha(theme.palette.primary.main, 0.8),
                color: 'white',
                fontSize: '0.75rem',
              }}
            />
          </Box>

          <ActionBar>
            <ActionButtons>
              <RoundIconButton
                size="small"
                onClick={handleCardClick}
                title="Play"
              >
                <PlayArrow fontSize="small" />
              </RoundIconButton>
              
              <RoundIconButton
                size="small"
                onClick={handleAddToList}
                title="Add to My List"
              >
                <Add fontSize="small" />
              </RoundIconButton>
              
              <RoundIconButton
                size="small"
                title="Like"
              >
                <ThumbUp fontSize="small" />
              </RoundIconButton>
            </ActionButtons>

            <RoundIconButton
              size="small"
              title="More Info"
            >
              <MoreVert fontSize="small" />
            </RoundIconButton>
          </ActionBar>
        </MediaOverlay>
      </Box>
    </StyledCard>
  );
};
