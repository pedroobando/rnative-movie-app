import { movieApi } from '@/core/api/movie-api';
import { IMovie, MovieDBMoviesResponse, MovieMapper } from '@/infrastructure';
import { tryCatch } from '@/utils';

export const popularMoviesAction = async (): Promise<IMovie[]> => {
  const [response, error] = await tryCatch(movieApi.get<MovieDBMoviesResponse>('/popular'));

  if (error) {
    throw new Error('Cannot load now playing movies...', { cause: error });
  }

  const movie = response.data.results.map(MovieMapper.fromTheMovieDbToMovie);
  return movie;
};
