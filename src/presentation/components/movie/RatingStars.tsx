import { formatRating, ratingToStars } from '@/utils';

import { SymbolView } from 'expo-symbols';
import { Text, View } from 'react-native';

interface Props {
  /** Puntuación de la película (0 a 10). */
  rating: number;
  /** Tamaño del icono de estrella en píxeles. */
  size?: number;
  /** Cantidad máxima de estrellas a mostrar. */
  maxStars?: number;
  /** Muestra el rating numérico junto a las estrellas. */
  showValue?: boolean;
  className?: string;
}

/** Estrella llena: SF Symbols en iOS, Material Symbols en Android y web. */
const FILLED_STAR = { ios: 'star.fill', android: 'star', web: 'star' } as const;

/** Estrella vacía (contorno). */
const EMPTY_STAR = { ios: 'star', android: 'star_outline', web: 'star_outline' } as const;

const FILLED_COLOR = '#f59e0b';
const EMPTY_COLOR = '#d4d4d8';

/**
 * Representa el rating de una película (0 a 10) como estrellas de 1 a 5.
 *
 * Es un componente puramente presentacional: no realiza ninguna consulta.
 */
export const RatingStars = ({
  rating,
  size = 16,
  maxStars = 5,
  showValue = true,
  className,
}: Props) => {
  const filledStars = ratingToStars(rating, maxStars);

  return (
    <View className={`flex-row items-center ${className ?? ''}`}>
      {Array.from({ length: maxStars }).map((_, index) => {
        const isFilled = index < filledStars;

        return (
          <SymbolView
            key={index}
            name={isFilled ? FILLED_STAR : EMPTY_STAR}
            size={size}
            tintColor={isFilled ? FILLED_COLOR : EMPTY_COLOR}
            style={{ marginRight: 2 }}
          />
        );
      })}

      {showValue ? <Text className="ml-1 text-base text-neutral-700">{formatRating(rating)}</Text> : null}
    </View>
  );
};
