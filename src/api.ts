import axios from "axios";

const BASE_PATH = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_API_KEY;

export interface IMovies {
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IGetMoviesResult {
  data: {
    dates: {
      maximum: string;
      minimum: string;
    };
    page: number;
    results: IMovies[];
    total_pages: number;
    total_results: number;
  };
}

export interface IGetMovieResult {
  data: {
    total_results: number;
    results: {
      adult: boolean;
      backdrop_path: string;
      id: number;
      overview: string;
      poster_path: string;
      release_date: string;
      title: string;
    };
  }[];
}

export interface IGetTvResult {
  data: {
    results: {
      length: number;
      backdrop_path: string;
      first_air_date: string;
      id: number;
      name: string;
      origin_country: string[];
      overview: string;
      poster_path: string;
    };
  };
}

export function getMovies(option: string) {
  return axios.get(
    `${BASE_PATH}/movie/${option}?api_key=${API_KEY}&language=ko-KR`
  );
}

export function getMovie(keyword: string) {
  return axios.get(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${keyword}&language=ko-KR`
  );
}

export function getTv(option: string) {
  return axios.get(
    `${BASE_PATH}/tv/${option}?api_key=${API_KEY}&language=ko-KR`
  );
}

export function SearchTv(keyword: string) {
  return axios.get(
    `${BASE_PATH}/search/tv?api_key=${API_KEY}&query=${keyword}&language=ko-KR`
  );
}
