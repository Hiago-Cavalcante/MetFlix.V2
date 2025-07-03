import React from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  IconButton,
  Rating,
  Chip,
  useTheme,
  useMediaQuery,
  alpha,
} from '@mui/material';
import {
  Close as CloseIcon,
  PlayArrow,
  Add,
  ThumbUp,
  VolumeOff,
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

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: theme.spacing(2),
    maxWidth: '900px',
    width: '90vw',
    margin: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
  },
}));

const MediaBackground = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '50vh',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  alignItems: 'flex-end',
  [theme.breakpoints.down('md')]: {
    height: '40vh',
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
    transparent 80%
  )`,
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  backgroundColor: alpha(theme.palette.common.black, 0.6),
  color: theme.palette.common.white,
  zIndex: 10,
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.8),
  },
}));

const MediaInfo = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  padding: theme.spacing(3),
  color: theme.palette.common.white,
}));

const ActionButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1, 3),
  margin: theme.spacing(0, 1, 0, 0),
  fontSize: '1rem',
  fontWeight: 600,
  borderRadius: theme.spacing(0.5),
  textTransform: 'none',
  minWidth: 120,
}));

interface MediaModalProps {
  isOpen: boolean;
  media: Movie | TVShow | null;
  onClose: () => void;
}

export const MediaModal: React.FC<MediaModalProps> = ({
  isOpen,
  media,
  onClose,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (!media) return null;

  const backgroundImage = getImageUrl(
    media.backdrop_path,
    'LARGE',
    'backdrop'
  );
  const title = getMediaTitle(media);
  const releaseDate = getMediaReleaseDate(media);
  const year = formatDate(releaseDate);
  const rating = formatRating(media.vote_average);

  return (
    <StyledDialog
      open={isOpen}
      onClose={onClose}
      maxWidth={false}
      PaperProps={{
        sx: {
          backgroundImage: 'none',
        },
      }}
    >
      <DialogContent sx={{ p: 0, position: 'relative' }}>
        <CloseButton onClick={onClose} size="large">
          <CloseIcon />
        </CloseButton>

        <MediaBackground
          sx={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        >
          <MediaOverlay />
          <MediaInfo>
            <Typography
              variant={isMobile ? 'h4' : 'h2'}
              component="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              }}
            >
              {title}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
              <Rating
                value={media.vote_average / 2}
                precision={0.1}
                size="small"
                readOnly
              />
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {rating}
              </Typography>
              <Chip
                label={year}
                size="small"
                sx={{
                  backgroundColor: alpha(theme.palette.primary.main, 0.8),
                  color: 'white',
                }}
              />
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              <ActionButton
                variant="contained"
                color="primary"
                startIcon={<PlayArrow />}
                sx={{
                  backgroundColor: theme.palette.common.white,
                  color: theme.palette.common.black,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.common.white, 0.8),
                  },
                }}
              >
                Play
              </ActionButton>

              <ActionButton
                variant="outlined"
                startIcon={<Add />}
                sx={{
                  borderColor: alpha(theme.palette.common.white, 0.7),
                  color: theme.palette.common.white,
                  backgroundColor: alpha(theme.palette.common.black, 0.5),
                  '&:hover': {
                    borderColor: theme.palette.common.white,
                    backgroundColor: alpha(theme.palette.common.black, 0.7),
                  },
                }}
              >
                My List
              </ActionButton>

              <IconButton
                sx={{
                  color: theme.palette.common.white,
                  backgroundColor: alpha(theme.palette.common.black, 0.5),
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.common.black, 0.7),
                  },
                }}
              >
                <ThumbUp />
              </IconButton>

              <IconButton
                sx={{
                  color: theme.palette.common.white,
                  backgroundColor: alpha(theme.palette.common.black, 0.5),
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.common.black, 0.7),
                  },
                }}
              >
                <VolumeOff />
              </IconButton>
            </Box>
          </MediaInfo>
        </MediaBackground>

        <Box sx={{ p: 3 }}>
          <Typography
            variant="h6"
            component="h3"
            sx={{ mb: 2, fontWeight: 600 }}
          >
            Overview
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.6,
              color: 'text.secondary',
              mb: 3,
            }}
          >
            {media.overview || 'No overview available.'}
          </Typography>

          {/* Additional Info */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, minWidth: 120, color: 'text.secondary' }}
              >
                Release Date:
              </Typography>
              <Typography variant="body2">
                {new Date(releaseDate).toLocaleDateString()}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, minWidth: 120, color: 'text.secondary' }}
              >
                Rating:
              </Typography>
              <Typography variant="body2">
                {rating}/10
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </StyledDialog>
  );
};
