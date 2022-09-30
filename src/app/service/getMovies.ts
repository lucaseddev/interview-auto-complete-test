import { IMoviesSearchResponse } from "app/interfaces";

// Not safe for storing this type of apiKey, since there is no authentication for using it
// Meaning, anyone can get it on client side and use it whenever they wan't it.
// But for making it simple, it's hard coded here
const API_KEY = "2920621f";

// Simple api call, no errors are being treated, no different filters, just a simple search.
// either with or without results.
export const getMovies = (input: string): Promise<IMoviesSearchResponse> =>
  fetch(`http://www.omdbapi.com/?s=${input || ""}&page=1&apikey=${API_KEY}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch(() => ({ Search: [] }));
