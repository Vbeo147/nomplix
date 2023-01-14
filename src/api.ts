import axios from "axios";

const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
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
    results: IMovie[];
    total_pages: number;
    total_results: number;
  };
}

export function getMovies() {
  return axios.get(
    `${BASE_PATH}/movie/now_playing?api_key=${
      import.meta.env.VITE_API_KEY
    }&language=ko-KR`
  );
}
