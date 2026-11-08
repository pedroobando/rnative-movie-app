import { movieApi } from '@/core/api/movie-api';
import type { ICompleteMovie, MovieDbMovieResponse } from '@/infrastructure';
import { MovieMapper } from '@/infrastructure';
import { tryCatch } from '@/utils';

export const getMovieByIdAction = async (id: number | string): Promise<ICompleteMovie> => {
  const movieId = Number(id);

  if (!Number.isFinite(movieId) || movieId <= 0) {
    throw new Error(`Invalid movie id: ${id}`);
  }

  const [response, error] = await tryCatch(
    // `credits` añade el reparto (cast) y el equipo técnico a la respuesta.
    movieApi.get<MovieDbMovieResponse>(`/${movieId}`, {
      params: { append_to_response: 'credits' },
    }),
  );

  console.log(`Pelicula Cargada http`);
  if (error) {
    throw new Error(`Cannot load movie id:${movieId}...`, { cause: error });
  }

  return MovieMapper.fromTheMovieDbDetailToMovie(response.data);
};
