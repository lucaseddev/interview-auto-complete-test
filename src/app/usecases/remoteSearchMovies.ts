import { IMovie, IMoviesResponse, IMoviesSearchResponse } from "app/interfaces";
import { getMovies } from "app/service";
import { removeDuplicates } from "utils";

const moviesResponseCache: IMoviesResponse[] = [];

const filterMovies = (input: string, list?: IMoviesResponse[]) => {
  const filtered = list?.filter((item) =>
    item.Title.toLowerCase().includes(input.toLowerCase())
  ) || []

  return removeDuplicates(filtered, (item) => item.Title)
};

const extractMovies = (list: IMoviesResponse[]) =>
  list.map((movies) => ({ label: movies.Title }));

export const remoteSearchMovies = async (input: string): Promise<IMovie[]> => {
  const cacheFilteredMovies = filterMovies(input, moviesResponseCache);
  if (input.length < 3 || cacheFilteredMovies.length)
    return extractMovies(cacheFilteredMovies);

  const moviesResponse: IMoviesSearchResponse = await getMovies(input);
  const remoteFilteredMovies = filterMovies(input, moviesResponse.Search);

  if (remoteFilteredMovies.length) {
    moviesResponseCache.push(...remoteFilteredMovies);
  } else {
    return [];
  }

  return remoteSearchMovies(input);
};
