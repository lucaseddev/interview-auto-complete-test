import { IMoviesResponse } from "app/interfaces";

// This is just a simple cache for the sake of simplicity
const cachedMoviesResponse: IMoviesResponse[] = [];

export const getCachedMovies = () => cachedMoviesResponse;
export const getCachedMoviesSizeLimit = () => 100