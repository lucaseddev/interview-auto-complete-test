import { IMoviesSearchResponse } from "app/interfaces";

const apiKey = "2920621f";

export const getMovies = (input: string): Promise<IMoviesSearchResponse> =>
  fetch(`http://www.omdbapi.com/?s=${input || ""}&page=1&apikey=${apiKey}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch(() => ({ Search: [] }));
