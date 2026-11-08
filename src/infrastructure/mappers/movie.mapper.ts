import type {
  ICompleteMovie,
  IMovie,
  MovieDbMovieResponse,
  Result,
} from '../interfaces';

export class MovieMapper {
  static fromTheMovieDbToMovie = (movie: Result): IMovie => {
    return {
      id: movie.id,
      title: movie.title,
      rating: movie.vote_average,
      description: movie.overview,
      releaseDate: new Date(movie.release_date),
      poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      backdrop: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
    };
  };

  static fromTheMovieDbDetailToMovie = (movie: MovieDbMovieResponse): ICompleteMovie => {
    return {
      id: movie.id,
      title: movie.title,
      rating: movie.vote_average,
      description: movie.overview,
      releaseDate: new Date(movie.release_date),
      poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      backdrop: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
      genres: movie.genres.map((genre) => genre.name),
      duration: movie.runtime,
      budget: movie.budget,
      originalTitle: movie.original_title,
      productionCompanies: movie.production_companies.map((company) => company.name),
      cast: (movie.credits?.cast ?? []).map((member) => ({
        id: member.id,
        name: member.name,
        character: member.character,
        profile: member.profile_path
          ? `https://image.tmdb.org/t/p/w500${member.profile_path}`
          : null,
        order: member.order,
      })),
    };
  };
}
