import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Alert,
  Skeleton,
  useTheme,
} from '@mui/material';
import { Movie, TVShow } from '@/types';
import { MediaCard } from '../MediaCard';
import { useResponsive } from '@/hooks';

interface MediaSectionProps {
  title: string;
  media: (Movie | TVShow)[];
  loading?: boolean;
  error?: string | null;
  onMediaSelect: (media: Movie | TVShow) => void;
  onAddToList?: (media: Movie | TVShow) => void;
}

export const MediaSection: React.FC<MediaSectionProps> = ({
  title,
  media,
  loading = false,
  error = null,
  onMediaSelect,
  onAddToList,
}) => {
  const theme = useTheme();
  const screenSize = useResponsive();

  // Determine grid columns based on screen size
  const getGridColumns = () => {
    switch (screenSize) {
      case 'mobile':
        return 2;
      case 'tablet':
        return 3;
      default:
        return 6;
    }
  };

  const renderSkeletons = () => {
    const columns = getGridColumns();
    return Array.from({ length: columns }).map((_, index) => (
      <Grid item xs={12 / columns} key={index}>
        <Box>
          <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 1 }} />
          <Box sx={{ pt: 1 }}>
            <Skeleton variant="text" height={24} />
            <Skeleton variant="text" height={20} width="60%" />
          </Box>
        </Box>
      </Grid>
    ));
  };

  if (error) {
    return (
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            color: 'text.primary',
            fontWeight: 600,
            mb: 2,
          }}
        >
          {title}
        </Typography>
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h5"
        component="h2"
        sx={{
          color: 'text.primary',
          fontWeight: 600,
          mb: 2,
          fontSize: { xs: '1.5rem', md: '2rem' },
        }}
      >
        {title}
      </Typography>

      <Grid container spacing={2}>
        {loading ? (
          renderSkeletons()
        ) : (
          media.slice(0, 12).map((item) => (
            <Grid
              item
              key={item.id}
              xs={6}
              sm={4}
              md={3}
              lg={2}
            >
              <MediaCard
                media={item}
                onSelect={onMediaSelect}
                onAddToList={onAddToList}
              />
            </Grid>
          ))
        )}
      </Grid>

      {!loading && media.length === 0 && (
        <Box
          sx={{
            textAlign: 'center',
            py: 4,
            color: 'text.secondary',
          }}
        >
          <Typography variant="body1">
            No content available at the moment.
          </Typography>
        </Box>
      )}
    </Box>
  );
};
