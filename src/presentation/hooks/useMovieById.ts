import { getMovieByIdAction } from '@/core/actions';

import { useQuery } from '@tanstack/react-query';

/** Hook que carga el detalle de una película por id. */
export const useMovieById = (id: string | undefined) =>
  useQuery({
    queryKey: ['movies', 'detail', id],
    queryFn: () => getMovieByIdAction(id as string),
    enabled: !!id,
    staleTime: 1000 * 60 * 60 * 24, // 24horas.
  });
