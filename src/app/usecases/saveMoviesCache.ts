import { IMoviesResponse } from "app/interfaces";
import { getCachedMovies, getCachedMoviesSizeLimit } from "./getCachedMovies";

export const saveMoviesCache = (newMovies: IMoviesResponse[]) => {
  if (getCachedMovies().length >= getCachedMoviesSizeLimit())
    getCachedMovies().splice(0, newMovies.length, ...newMovies);
  else getCachedMovies().push(...newMovies);
};
