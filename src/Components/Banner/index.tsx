import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  useTheme,
  alpha,
  Skeleton,
} from '@mui/material';
import { PlayArrow, Add, Info } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Movie, TVShow } from '../../types';
import { getImageUrl, getMediaTitle, truncateText } from '../../utils';

const BannerContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '80vh',
  display: 'flex',
  alignItems: 'center',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  [theme.breakpoints.down('md')]: {
    height: '60vh',
  },
}));

const BannerOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: `linear-gradient(
    to right,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    transparent 100%
  )`,
  [theme.breakpoints.down('md')]: {
    background: `linear-gradient(
      to top,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(0, 0, 0, 0.4) 50%,
      transparent 100%
    )`,
  },
}));

const BannerContent = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  color: theme.palette.text.primary,
  maxWidth: '50%',
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
    textAlign: 'center',
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1, 3),
  margin: theme.spacing(0, 1, 0, 0),
  fontSize: '1.1rem',
  fontWeight: 600,
  borderRadius: theme.spacing(0.5),
  textTransform: 'none',
  minWidth: 120,
}));

interface BannerProps {
  featuredMedia?: Movie | TVShow;
  onPlayClick?: () => void;
  onInfoClick?: () => void;
}

export const Banner: React.FC<BannerProps> = ({
  featuredMedia,
  onPlayClick,
  onInfoClick,
}) => {
  const theme = useTheme();

  if (!featuredMedia) {
    return (
      <BannerContainer>
        <BannerContent>
          <Skeleton
            variant="text"
            width="60%"
            height={80}
            sx={{ mb: 2 }}
          />
          <Skeleton
            variant="text"
            width="80%"
            height={60}
            sx={{ mb: 3 }}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Skeleton variant="rectangular" width={120} height={45} />
            <Skeleton variant="rectangular" width={120} height={45} />
          </Box>
        </BannerContent>
      </BannerContainer>
    );
  }

  const backgroundImage = getImageUrl(
    featuredMedia.backdrop_path,
    'LARGE',
    'backdrop'
  );

  return (
    <BannerContainer
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        mt: '68px', // Account for fixed header
      }}
    >
      <BannerOverlay />
      <BannerContent>
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: { xs: '2.5rem', md: '4rem' },
            fontWeight: 700,
            mb: 2,
            textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
          }}
        >
          {getMediaTitle(featuredMedia)}
        </Typography>

        <Typography
          variant="h6"
          component="p"
          sx={{
            fontSize: { xs: '1rem', md: '1.2rem' },
            lineHeight: 1.6,
            mb: 3,
            maxWidth: '500px',
            textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
          }}
        >
          {truncateText(featuredMedia.overview, 200)}
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <ActionButton
            variant="contained"
            color="primary"
            startIcon={<PlayArrow />}
            onClick={onPlayClick}
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
            startIcon={<Info />}
            onClick={onInfoClick}
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
            More Info
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
        </Box>
      </BannerContent>
    </BannerContainer>
  );
};
