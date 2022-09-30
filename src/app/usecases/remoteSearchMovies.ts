import { IMovie, IMoviesResponse, IMoviesSearchResponse } from "app/interfaces";
import { getMovies } from "app/service";
import { removeDuplicates } from "utils";
import { saveMoviesCache } from "./saveMoviesCache";
import { getCachedMovies } from "./getCachedMovies";

const filterMovies = (input: string, list?: IMoviesResponse[]) => {
  const filtered =
    list?.filter((item) =>
      item.Title.toLowerCase().includes(input.toLowerCase())
    ) || [];

  return removeDuplicates(filtered, (item) => item.Title);
};

const extractMovies = (list: IMoviesResponse[]): IMovie[] =>
  list.map((movies) => ({ label: movies.Title }));

/* 
  * To make things simple, for this small application, remote fetching, filtering and caching is being done
  * in this single function, but for larger applicatins the best approach would be to split
  * and isolate the logics, to better handle Errors, exceptions, different response types, etc...
  */
export const remoteSearchMovies = async (input: string): Promise<IMovie[]> => {
  const cacheFilteredMovies = filterMovies(input, getCachedMovies());
  if (input.length < 3 || cacheFilteredMovies.length)
    return extractMovies(cacheFilteredMovies);

  const moviesResponse: IMoviesSearchResponse = await getMovies(input);
  const remoteFilteredMovies = filterMovies(input, moviesResponse.Search);

  if (remoteFilteredMovies.length) {
    // This could be abstracted 
    saveMoviesCache(remoteFilteredMovies);
  } else {
    return [];
  }

  return remoteSearchMovies(input);
};
