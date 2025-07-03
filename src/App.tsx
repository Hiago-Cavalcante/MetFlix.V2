import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { netflixTheme } from './theme';
import { SimpleHeader } from './Components/SimpleHeader';
import { HomePage, MoviesPage, TVShowsPage } from './pages';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={netflixTheme}>
      <CssBaseline />
      <Router>
        <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
          <SimpleHeader />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/tv-shows" element={<TVShowsPage />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
