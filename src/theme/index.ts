import { createTheme, ThemeOptions } from '@mui/material/styles';

// Netflix Color Palette
export const netflixColors = {
  primary: {
    main: '#E50914', // Netflix Red
    dark: '#B20710',
    light: '#F40612',
  },
  secondary: {
    main: '#564D4D', // Dark Gray
    dark: '#403A3A',
    light: '#6B6060',
  },
  background: {
    default: '#141414', // Netflix Dark Background
    paper: '#2F2F2F', // Card Background
    card: '#181818', // Darker Card Background
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#B3B3B3',
  },
  common: {
    black: '#000000',
    white: '#FFFFFF',
  },
  grey: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
};

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: netflixColors.primary,
    secondary: netflixColors.secondary,
    background: netflixColors.background,
    text: netflixColors.text,
    grey: netflixColors.grey,
  },
  typography: {
    fontFamily: '"Netflix Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: '8px 24px',
          fontSize: '1rem',
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
          },
        },
        containedPrimary: {
          background: `linear-gradient(45deg, ${netflixColors.primary.main} 30%, ${netflixColors.primary.light} 90%)`,
          '&:hover': {
            background: `linear-gradient(45deg, ${netflixColors.primary.dark} 30%, ${netflixColors.primary.main} 90%)`,
          },
        },
        outlined: {
          borderColor: netflixColors.text.secondary,
          color: netflixColors.text.primary,
          '&:hover': {
            borderColor: netflixColors.text.primary,
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: netflixColors.background.card,
          borderRadius: 8,
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(20, 20, 20, 0.9)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: '68px',
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(8px)',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: netflixColors.background.paper,
          borderRadius: 12,
          maxWidth: '800px',
        },
      },
    },
    MuiRating: {
      styleOverrides: {
        iconFilled: {
          color: '#FFD700',
        },
        iconEmpty: {
          color: netflixColors.text.secondary,
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
};

export const netflixTheme = createTheme(themeOptions);

// Utility function to get image URL
export const getImageUrl = (path: string, size: string = 'w500'): string => {
  if (!path) return '/placeholder-image.jpg';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

// Responsive breakpoint helpers
export const breakpoints = {
  mobile: '@media (max-width: 599px)',
  tablet: '@media (min-width: 600px) and (max-width: 959px)',
  desktop: '@media (min-width: 960px)',
  largeDesktop: '@media (min-width: 1280px)',
};
