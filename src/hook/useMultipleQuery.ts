import { useQuery } from "react-query";
import { getMovies, getTv } from "../api";

export const useMultipleMovieQuery = () => {
  const nowPlaying = useQuery(["now_playing"], () => getMovies("now_playing"));
  const popular = useQuery(["Movie_popular"], () => getMovies("popular"));
  const topRated = useQuery(["Movie_rated"], () => getMovies("top_rated"));
  const upComing = useQuery(["upcoming"], () => getMovies("upcoming"));
  return [nowPlaying, popular, topRated, upComing];
};

export const useMultipleTvQuery = () => {
  const airingToday = useQuery(["airing_today"], () => getTv("airing_today"));
  const onAir = useQuery(["on_the_air"], () => getTv("on_the_air"));
  const popular = useQuery(["Tv_popular"], () => getTv("popular"));
  const topRated = useQuery(["Tv_rated"], () => getTv("top_rated"));
  return [airingToday, onAir, popular, topRated];
};
