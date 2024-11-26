import './allmidias.css';
import MidiaCard from './midiaCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

import React, { useEffect, useState } from 'react';

const API_KEY = '9b51dd245f1267676721b04d01a8e806';
const BASE_URL = 'https://api.themoviedb.org/3';

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 5,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export const RenderMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      );
      const data = await response.json();
      setMovies(data.results);
      setLoading(false);
      
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="movies-container">
      {loading ? (
        <div className="loading">Carregando...</div>
      ) : (
        <>
          <div className="movies-carousel">
            <Slider {...settings}>
              {movies.map(movie => (
                <div key={movie.id} className="movie-slide">
                  <MidiaCard
                    id={movie.id}
                    name={movie.title}
                    release_date={movie.release_date}
                    vote_average={movie.vote_average.toFixed(1)}
                    overview={movie.overview}
                    img={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </>
      )}
    </div>
  );
};

export const RenderSeries = () => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSeries = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`
      );
      const data = await response.json();
      setSeries(data.results);

      setLoading(false);
      console.log(data.results);
    } catch (error) {
      console.error('Erro ao buscar serie:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeries();
  }, []);

  return (
    <div className="movies-container">
      {loading ? (
        <div className="loading">Carregando...</div>
      ) : (
        <>
          <div className="movies-carousel">
            <Slider {...settings}>
              {series.map(serie => (
                <div key={serie.id} className="serie-slide">
                  <MidiaCard
                    id={serie.id}
                    name={serie.name}
                    overview={serie.overview}
                    vote_average={serie.vote_average.toFixed(1)}
                    release_date={serie.first_air_date}
                    img={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </>
      )}
    </div>
  );
};
