export interface IMovie {
  id: number;
  title: string;
  description: string;
  releaseDate: Date;
  rating: number;
  poster: string;
  backdrop: string;
}

/** Una página de resultados paginada de la API de The Movie DB. */
export interface IMoviePage {
  movies: IMovie[];
  page: number;
  totalPages: number;
  totalResults: number;
}
