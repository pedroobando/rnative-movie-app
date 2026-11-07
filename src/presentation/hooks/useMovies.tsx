import {
  nowPlayingAction,
  popularMoviesAction,
  topRateMoviesAction,
  upComingMoviesAction,
} from '@/core/actions';

import { useQuery } from '@tanstack/react-query';

export const useMovies = () => {
  const nowPlayingQuery = useQuery({
    queryKey: ['movies', 'nowPlaying'],
    queryFn: nowPlayingAction,
    staleTime: 1000 * 60 * 60 * 24, // 24horas.
  });

  const popularQuery = useQuery({
    queryKey: ['movies', 'popular'],
    queryFn: popularMoviesAction,
    staleTime: 1000 * 60 * 60 * 24, // 24horas.
  });

  const topRateQuery = useQuery({
    queryKey: ['movies', 'topRate'],
    queryFn: topRateMoviesAction,
    staleTime: 1000 * 60 * 60 * 24, // 24horas.
  });
  const upComingQuery = useQuery({
    queryKey: ['movies', 'upComing'],
    queryFn: upComingMoviesAction,
    staleTime: 1000 * 60 * 60 * 24, // 24horas.
  });

  return {
    nowPlayingQuery,
    popularQuery,
    topRateQuery,
    upComingQuery,
  };
};
