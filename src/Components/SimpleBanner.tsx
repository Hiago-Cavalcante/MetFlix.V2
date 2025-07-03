import React from 'react';
import { Box, Typography, Button, Container, Chip } from '@mui/material';
import { PlayArrow, Info, Add, Star, VolumeOff } from '@mui/icons-material';
import { styled, keyframes } from '@mui/material/styles';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const BannerContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '100vh',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  marginTop: '68px',
  background: `
    linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(229, 9, 20, 0.1) 25%,
      rgba(0, 0, 0, 0.7) 70%,
      rgba(0, 0, 0, 0.95) 100%
    ),
    url('https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80')
  `,
  backgroundSize: 'cover',
  backgroundPosition: 'center top',
  backgroundAttachment: 'fixed',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      linear-gradient(to right, rgba(0,0,0,0.8) 0%, transparent 50%),
      linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 40%)
    `,
    zIndex: 1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 70%)',
    zIndex: 1,
  },
  [theme.breakpoints.down('md')]: {
    height: '80vh',
    backgroundAttachment: 'scroll',
  },
}));

const ContentWrapper = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  animation: `${fadeInUp} 1.2s ease-out`,
  paddingTop: theme.spacing(8),
}));

const FeatureTag = styled(Chip)(({ theme }) => ({
  background: 'linear-gradient(45deg, #E50914 30%, #FF6B6B 90%)',
  color: 'white',
  fontWeight: 600,
  fontSize: '0.9rem',
  padding: theme.spacing(0.5, 1),
  marginBottom: theme.spacing(2),
  animation: `${float} 3s ease-in-out infinite`,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-200px',
    width: '200px',
    height: '100%',
    background: `linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    )`,
    animation: `${shimmer} 2s infinite`,
  },
}));

const MainTitle = styled(Typography)`
  font-size: 2.8rem;
  font-weight: 900;
  color: white;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  text-shadow: 
    0 0 20px rgba(229, 9, 20, 0.5),
    2px 2px 10px rgba(0,0,0,0.9),
    4px 4px 20px rgba(0,0,0,0.7);
  line-height: 0.9;
  letter-spacing: -0.02em;
  position: relative;
  
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    filter: drop-shadow(0 0 30px rgba(229, 9, 20, 0.3));
    z-index: -1;
  }

  ${({ theme }) => theme.breakpoints.up('sm')} {
    font-size: 4rem;
  }
  
  ${({ theme }) => theme.breakpoints.up('md')} {
    font-size: 5.5rem;
  }
  
  ${({ theme }) => theme.breakpoints.up('lg')} {
    font-size: 6.5rem;
  }
`;

const SubTitle = styled(Typography)`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  text-shadow: 1px 1px 8px rgba(0,0,0,0.8);
  line-height: 1.5;
  max-width: 600px;
  font-weight: 400;

  ${({ theme }) => theme.breakpoints.up('md')} {
    font-size: 1.6rem;
  }
  
  ${({ theme }) => theme.breakpoints.up('lg')} {
    font-size: 1.8rem;
  }
`;

const MetaInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(4),
  flexWrap: 'wrap',
}));

const RatingBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  padding: theme.spacing(0.5, 1.5),
  borderRadius: 20,
  border: '1px solid rgba(255, 255, 255, 0.2)',
}));

const GenreTag = styled(Chip)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  color: 'white',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  backdropFilter: 'blur(10px)',
  fontWeight: 500,
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transform: 'translateY(-2px)',
  },
  transition: 'all 0.3s ease',
}));

const ActionButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 4),
  margin: theme.spacing(0, 1, 1, 0),
  fontSize: '1.1rem',
  fontWeight: 600,
  borderRadius: 8,
  textTransform: 'none',
  minWidth: 140,
  transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
    transition: 'left 0.5s ease',
  },
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 15px 35px rgba(0,0,0,0.4)',
    '&::before': {
      left: '100%',
    },
  },
  '&:active': {
    transform: 'translateY(-1px)',
  },
}));

const PlayButton = styled(ActionButton)(({ theme }) => ({
  backgroundColor: 'white',
  color: 'black',
  fontWeight: 700,
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.9)',
    color: 'black',
  },
}));

const InfoButton = styled(ActionButton)(({ theme }) => ({
  backgroundColor: 'rgba(109,109,110,0.7)',
  color: 'white',
  border: '1px solid rgba(255,255,255,0.7)',
  backdropFilter: 'blur(10px)',
  '&:hover': {
    backgroundColor: 'rgba(109,109,110,0.9)',
    borderColor: 'white',
  },
}));

const AddButton = styled(ActionButton)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: 'white',
  border: '2px solid rgba(255,255,255,0.7)',
  minWidth: 'auto',
  width: 48,
  height: 48,
  borderRadius: '50%',
  padding: 0,
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderColor: 'white',
    transform: 'translateY(-3px) scale(1.1)',
  },
}));

const VolumeButton = styled(ActionButton)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: 'white',
  border: '2px solid rgba(255,255,255,0.7)',
  minWidth: 'auto',
  width: 48,
  height: 48,
  borderRadius: '50%',
  padding: 0,
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderColor: 'white',
    transform: 'scale(1.1)',
  },
}));

interface SimpleBannerProps {
  title?: string;
  subtitle?: string;
  rating?: number;
  year?: string;
  duration?: string;
  genres?: string[];
}

export const SimpleBanner: React.FC<SimpleBannerProps> = ({ 
  title = "Stranger Things",
  subtitle = "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
  rating = 8.7,
  year = "2024",
  duration = "3 Seasons",
  genres = ["Sci-Fi", "Drama", "Thriller"]
}) => {
  return (
    <BannerContainer>
      <VolumeButton>
        <VolumeOff />
      </VolumeButton>
      
      <ContentWrapper maxWidth="lg">
        <Box sx={{ maxWidth: { xs: '100%', md: '70%' } }}>
          <FeatureTag 
            label="✨ NETFLIX SERIES" 
            variant="filled"
          />
          
          <MainTitle variant="h1">
            {title}
          </MainTitle>
          
          <MetaInfo>
            <RatingBox>
              <Star sx={{ color: '#FFD700', fontSize: '1.2rem' }} />
              <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
                {rating}
              </Typography>
            </RatingBox>
            
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>
              {year}
            </Typography>
            
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>
              {duration}
            </Typography>
            
            <Typography variant="body1" sx={{ 
              color: 'rgba(255,255,255,0.8)', 
              padding: '4px 12px',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: 4,
              fontSize: '0.9rem'
            }}>
              HD
            </Typography>
          </MetaInfo>

          <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
            {genres.map((genre, index) => (
              <GenreTag key={index} label={genre} variant="outlined" />
            ))}
          </Box>
          
          <SubTitle variant="h6">
            {subtitle}
          </SubTitle>

          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            mt: 4
          }}>
            <PlayButton
              variant="contained"
              size="large"
              startIcon={<PlayArrow />}
            >
              Play
            </PlayButton>
            
            <InfoButton
              variant="outlined"
              size="large"
              startIcon={<Info />}
            >
              More Info
            </InfoButton>

            <AddButton>
              <Add />
            </AddButton>
          </Box>
        </Box>
      </ContentWrapper>
    </BannerContainer>
  );
};
