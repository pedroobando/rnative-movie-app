import {
  nowPlayingAction,
  popularMoviesAction,
  topRateMoviesAction,
  upComingMoviesAction,
} from '@/core/actions';

import type { IMoviePage } from '@/infrastructure';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

/** Acción que devuelve una página de películas paginada. */
type PagedMoviesAction = (page: number) => Promise<IMoviePage>;

/**
 * Hook generico para listados con scroll infinito.
 * `key` identifica la cache, `action` pide una pagina concreta al backend.
 */
const useInfiniteMovies = (key: string, action: PagedMoviesAction) => {
  const query = useInfiniteQuery({
    queryKey: ['movies', key],
    queryFn: ({ pageParam }) => action(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    staleTime: 1000 * 60 * 60 * 24, // 24horas.
  });

  const movies = useMemo(() => query.data?.pages.flatMap((page) => page.movies) ?? [], [query.data]);

  return { query, movies };
};

export const useMovies = () => {
  const nowPlayingQuery = useQuery({
    queryKey: ['movies', 'nowPlaying'],
    queryFn: nowPlayingAction,
    staleTime: 1000 * 60 * 60 * 24, // 24horas.
  });

  const popular = useInfiniteMovies('popular', popularMoviesAction);
  const topRate = useInfiniteMovies('topRate', topRateMoviesAction);
  const upComing = useInfiniteMovies('upComing', upComingMoviesAction);

  return {
    nowPlayingQuery,
    popularQuery: popular.query,
    popularMovies: popular.movies,
    topRateQuery: topRate.query,
    topRateMovies: topRate.movies,
    upComingQuery: upComing.query,
    upComingMovies: upComing.movies,
  };
};
