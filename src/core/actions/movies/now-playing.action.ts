import { movieApi } from '@/core/api/movie-api';
import type { IMovie, MovieDBMoviesResponse } from '@/infrastructure';
import { MovieMapper } from '@/infrastructure';
import { tryCatch } from '@/utils';

export const nowPlayingAction = async (): Promise<IMovie[]> => {
  const [response, error] = await tryCatch(movieApi.get<MovieDBMoviesResponse>('/now_playing'));

  if (error) {
    throw new Error('Cannot load now playing movies...', { cause: error });
  }

  const movie = response.data.results.map(MovieMapper.fromTheMovieDbToMovie);
  return movie;
};
