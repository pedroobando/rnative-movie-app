import type { ICompleteMovie } from '@/infrastructure';
import { formatBudget, formatRating } from '@/utils';

import { Image } from 'expo-image';
import { memo } from 'react';
import { Text, View } from 'react-native';

interface Props {
  /** Película a mostrar. El componente solo recibe datos, no hace ninguna consulta. */
  movie: ICompleteMovie;
}

/** Proporción del póster vertical (TMDB devuelve imágenes de 500x750). */
const POSTER_ASPECT_RATIO = 2 / 3;

/**
 * Tarjeta con el detalle de una película: póster, títulos, valoración,
 * géneros, sinopsis y presupuesto.
 *
 * Es un componente puramente presentacional: recibe la película ya cargada
 * y no realiza ninguna llamada a la API.
 */
export const MovieDetailsCard = memo(({ movie }: Props) => {
  const { title, originalTitle, rating, genres, description, budget, poster } = movie;

  return (
    <View className="bg-white">
      {poster ? (
        <Image
          source={{ uri: poster }}
          style={{ width: '100%', aspectRatio: POSTER_ASPECT_RATIO }}
          className="rounded-b-3xl"
          contentFit="cover"
          transition={200}
        />
      ) : null}

      <View className="px-5 pt-5 pb-10">
        {originalTitle ? (
          <Text className="text-base text-neutral-800">{originalTitle}</Text>
        ) : null}

        <Text className="mt-1 text-3xl font-bold text-black">{title}</Text>

        <Text className="mt-1 text-base text-neutral-700">
          {formatRating(rating)}
          {genres.length ? ` - ${genres.join(', ')}` : ''}
        </Text>

        {description ? (
          <>
            <Text className="mt-6 text-2xl font-bold text-black">Historia</Text>
            <Text className="mt-1 text-base leading-6 text-neutral-800">{description}</Text>
          </>
        ) : null}

        <Text className="mt-6 text-2xl font-bold text-black">Presupuesto</Text>
        <Text className="mt-1 text-base text-neutral-900">{formatBudget(budget)}</Text>
      </View>
    </View>
  );
});

MovieDetailsCard.displayName = 'MovieDetailsCard';
