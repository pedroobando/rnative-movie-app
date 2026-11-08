import type { ICompleteMovie } from '@/infrastructure';
import { formatBudget } from '@/utils';

import { Text, View } from 'react-native';

import { RatingStars } from './RatingStars';

interface Props {
  /** Película a mostrar. El componente solo recibe datos, no hace ninguna consulta. */
  movie: ICompleteMovie;
}

/**
 * Tarjeta con el detalle de una película: póster, títulos, valoración,
 * géneros, sinopsis y presupuesto.
 *
 * Es un componente puramente presentacional: recibe la película ya cargada
 * y no realiza ninguna llamada a la API.
 */
export const MovieCardDescription = ({ movie }: Props) => {
  const { title, originalTitle, rating, genres, description, budget } = movie;

  return (
    <View className="px-5 pt-5 pb-10">
      {originalTitle ? <Text className="text-base text-neutral-800">{originalTitle}</Text> : null}

      <Text className="mt-1 text-3xl font-bold text-black">{title}</Text>

      <View className="mt-1 flex-row items-center">
        <RatingStars rating={rating} />
      </View>

      {genres.length ? (
        <Text className="mt-1 text-base text-neutral-700">{genres.join(', ')}</Text>
      ) : null}

      {description ? (
        <>
          <Text className="mt-6 text-2xl font-bold text-black">Historia</Text>
          <Text className="mt-1 text-base leading-6 text-neutral-800">{description}</Text>
        </>
      ) : null}

      <Text className="mt-6 text-2xl font-bold text-black">Presupuesto</Text>
      <Text className="mt-1 text-base text-neutral-900">{formatBudget(budget)}</Text>
    </View>
  );
};

// MovieCardDescription.displayName = 'MovieCardDescription';
