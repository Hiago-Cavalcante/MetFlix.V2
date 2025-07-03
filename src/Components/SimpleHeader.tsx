import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  InputBase,
  Badge,
  Avatar,
  Button,
  useTheme,
  alpha,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Home as HomeIcon,
  Movie as MovieIcon,
  Tv as TvIcon,
  ArrowDropDown,
  AccountCircle,
  Settings,
  ExitToApp,
} from '@mui/icons-material';
import { styled, keyframes } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';

const glow = keyframes`
  0%, 100% {
    text-shadow: 0 0 5px rgba(229, 9, 20, 0.5);
  }
  50% {
    text-shadow: 0 0 20px rgba(229, 9, 20, 0.8);
  }
`;

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(180deg, rgba(0,0,0,0.9) 10%, rgba(0,0,0,0.3) 100%)',
  backdropFilter: 'blur(20px)',
  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  borderBottom: '1px solid rgba(255,255,255,0.1)',
  '&.scrolled': {
    background: 'rgba(0, 0, 0, 0.98)',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
  },
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  fontSize: '2rem',
  background: 'linear-gradient(45deg, #E50914 30%, #FF6B6B 70%, #FF4757 90%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  letterSpacing: '-0.5px',
  position: 'relative',
  '&:hover': {
    transform: 'scale(1.05)',
    animation: `${glow} 1s ease-in-out`,
  },
  '&::after': {
    content: '"®"',
    position: 'absolute',
    top: -4,
    right: -12,
    fontSize: '0.6rem',
    color: '#E50914',
    fontWeight: 400,
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: 'rgba(255,255,255,0.9)',
  textTransform: 'none',
  fontWeight: 500,
  padding: theme.spacing(1, 2),
  borderRadius: 8,
  transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '2px',
    background: 'linear-gradient(90deg, transparent, #E50914, transparent)',
    transition: 'left 0.5s ease',
  },
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    transform: 'translateY(-1px)',
    color: 'white',
    '&::before': {
      left: '100%',
    },
  },
  '&.active': {
    color: 'white',
    fontWeight: 600,
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '60%',
      height: '2px',
      background: '#E50914',
      borderRadius: '2px 2px 0 0',
    },
  },
}));

const SearchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 25,
  backgroundColor: alpha(theme.palette.common.white, 0.08),
  border: '1px solid rgba(255,255,255,0.1)',
  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  overflow: 'hidden',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.12),
    borderColor: alpha(theme.palette.primary.main, 0.4),
    transform: 'translateY(-1px)',
  },
  '&:focus-within': {
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    borderColor: theme.palette.primary.main,
    transform: 'scale(1.05)',
    boxShadow: `0 8px 25px rgba(229, 9, 20, 0.2)`,
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: alpha(theme.palette.common.white, 0.7),
  zIndex: 1,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'white',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.2, 1, 1.2, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    fontSize: '0.95rem',
    fontWeight: 400,
    '&::placeholder': {
      color: alpha(theme.palette.common.white, 0.6),
      opacity: 1,
    },
    [theme.breakpoints.up('sm')]: {
      width: '16ch',
      '&:focus': {
        width: '28ch',
      },
    },
  },
}));

const AnimatedIconButton = styled(IconButton)(({ theme }) => ({
  color: 'rgba(255,255,255,0.8)',
  transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  position: 'relative',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    transform: 'scale(1.1)',
    color: 'white',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(229,9,20,0.2) 0%, transparent 70%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover::before': {
    opacity: 1,
  },
}));

const ProfileButton = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  padding: theme.spacing(0.5),
  borderRadius: 8,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.1),
  },
}));

interface SimpleHeaderProps {}

export const SimpleHeader: React.FC<SimpleHeaderProps> = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Get active nav from current route
  const getActiveNav = () => {
    switch (location.pathname) {
      case '/':
        return 'Home';
      case '/movies':
        return 'Movies';
      case '/tv-shows':
        return 'TV Shows';
      default:
        return 'Home';
    }
  };

  const activeNav = getActiveNav();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleNavClick = (navItem: string) => {
    switch (navItem) {
      case 'Home':
        navigate('/');
        break;
      case 'Movies':
        navigate('/movies');
        break;
      case 'TV Shows':
        navigate('/tv-shows');
        break;
      default:
        navigate('/');
    }
  };

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const navItems = [
    { label: 'Home', icon: <HomeIcon />, path: '/' },
    { label: 'Movies', icon: <MovieIcon />, path: '/movies' },
    { label: 'TV Shows', icon: <TvIcon />, path: '/tv-shows' },
  ];

  return (
    <StyledAppBar 
      position="fixed" 
      elevation={0}
      className={scrolled ? 'scrolled' : ''}
    >
      <Toolbar sx={{ minHeight: '68px !important' }}>
        {/* Logo */}
        <Logo sx={{ mr: 4 }} onClick={() => navigate('/')}>
          METFLIX
        </Logo>

        {/* Navigation */}
        <Box sx={{ 
          display: { xs: 'none', md: 'flex' }, 
          mr: 'auto',
          gap: 0.5
        }}>
          {navItems.map((item) => (
            <NavButton
              key={item.label}
              startIcon={item.icon}
              className={activeNav === item.label ? 'active' : ''}
              onClick={() => handleNavClick(item.label)}
            >
              {item.label}
            </NavButton>
          ))}
        </Box>

        {/* Right Side Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {/* Search */}
          <SearchContainer>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search titles, people, genres..."
              inputProps={{ 'aria-label': 'search' }}
              value={searchValue}
              onChange={handleSearchChange}
            />
          </SearchContainer>

          {/* Notifications */}
          <AnimatedIconButton>
            <Badge 
              badgeContent={3} 
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: theme.palette.primary.main,
                  color: 'white',
                  fontSize: '0.7rem',
                  minWidth: '18px',
                  height: '18px',
                }
              }}
            >
              <NotificationsIcon />
            </Badge>
          </AnimatedIconButton>

          {/* Profile */}
          <ProfileButton onClick={handleProfileClick}>
            <Avatar 
              sx={{ 
                width: 32, 
                height: 32,
                background: 'linear-gradient(45deg, #E50914 30%, #FF6B6B 90%)',
                fontSize: '0.9rem',
                fontWeight: 600,
              }}
            >
              U
            </Avatar>
            <ArrowDropDown sx={{ color: 'white', ml: 0.5 }} />
          </ProfileButton>

          {/* Profile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileClose}
            sx={{
              '& .MuiPaper-root': {
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 2,
                minWidth: 180,
                mt: 1,
              },
            }}
          >
            <MenuItem onClick={handleProfileClose} sx={{ color: 'white', py: 1.5 }}>
              <AccountCircle sx={{ mr: 2 }} />
              Profile
            </MenuItem>
            <MenuItem onClick={handleProfileClose} sx={{ color: 'white', py: 1.5 }}>
              <Settings sx={{ mr: 2 }} />
              Settings
            </MenuItem>
            <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
            <MenuItem onClick={handleProfileClose} sx={{ color: 'white', py: 1.5 }}>
              <ExitToApp sx={{ mr: 2 }} />
              Sign Out
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};
