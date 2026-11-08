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

export interface ICompleteMovie extends IMovie {
  genres: string[];
  duration: number;
  budget: number;
  originalTitle: string;
  productionCompanies: string[];
  /** Protagonistas (reparto principal), ordenados porbilling. */
  cast: ICastMember[];
}

/** Un actor del reparto. */
export interface ICastMember {
  id: number;
  name: string;
  character: string;
  profile: string | null;
  order: number;
}
