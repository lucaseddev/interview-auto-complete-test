export interface IMoviesResponse {
  Title: string;
  Year: string;
}

// OMDb interface
export interface IMoviesSearchResponse {
  response: string;
  Search?: IMoviesResponse[];
}
