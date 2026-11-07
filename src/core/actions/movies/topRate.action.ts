import { TMDB_MAX_PAGE } from '@/core/constants';
import { movieApi } from '@/core/api/movie-api';
import type { IMoviePage, MovieDBMoviesResponse } from '@/infrastructure';
import { MovieMapper } from '@/infrastructure';
import { tryCatch } from '@/utils';

export const topRateMoviesAction = async (page: number = 1): Promise<IMoviePage> => {
  const currentPage = Math.min(Math.max(page, 1), TMDB_MAX_PAGE);

  const [response, error] = await tryCatch(
    movieApi.get<MovieDBMoviesResponse>('/top_rated', {
      params: {
        page: currentPage,
      },
    }),
  );

  if (error) {
    throw new Error('Cannot load top rated movies...', { cause: error });
  }

  const { page: responsePage, total_pages, total_results, results } = response.data;

  return {
    movies: results.map(MovieMapper.fromTheMovieDbToMovie),
    page: responsePage,
    totalPages: Math.min(total_pages, TMDB_MAX_PAGE),
    totalResults: total_results,
  };
};
