import './allmidias.css';
import MidiaCard from './midiaCard';
import Slider from 'react-slick';

import React, { useEffect, useState } from 'react';

const API_KEY = '9b51dd245f1267676721b04d01a8e806';
const BASE_URL = 'https://api.themoviedb.org/3';

export const RenderMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        const data = await response.json();
        setMovies(data.results);
        console.log(data.results);
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      }
    };

    fetchMovies();
  }, []);

  const moviesToShow = movies.slice(0, 8);

  return (
    <div className="movies-grid">
      {moviesToShow.map(movie => (
        <MidiaCard
          key={movie.id}
          id={movie.id}
          name={movie.title}
          img={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        />
      ))}
    </div>
  );
};

export const RenderSeries = () => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        const data = await response.json();
        setSeries(data.results);
        console.log(data.results);
      } catch (error) {
        console.error('Erro ao buscar Serie:', error);
      }
    };

    fetchSeries();
  }, []);

  const seriesToShow = series.slice(0, 8);

  return (
    <div className="movies-grid">
      {seriesToShow.map(serie => (
        <MidiaCard
          key={serie.id}
          id={serie.id}
          name={serie.title}
          img={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
        />
      ))}
    </div>
  );
};
