import type { IMovie } from '@/infrastructure';
import { View } from 'react-native';

import { Carousel } from 'react-native-reanimated-carousel';

import { useMainSlideShow } from '../../hooks/useMainSlideShow';
import { MoviePoster } from './MoviePoster';

interface Props {
  movies: IMovie[];
}

/** Posters visibles a la vez (la activa centrada y las vecinas asomando). */
const VISIBLE_CARDS = 3;
/** Separacion entre posters en px. */
const CARD_GAP = 12;
/** Proporcion del poster (ancho / alto). */
const POSTER_ASPECT = 0.6;

const AUTOPLAY_INTERVAL = 4000;

export const MainSlideShow = ({ movies }: Props) => {
  const { width, cardWidth, slot, posterHeight, itemAnimation } = useMainSlideShow({
    visibleCards: VISIBLE_CARDS,
    cardGap: CARD_GAP,
    posterAspect: POSTER_ASPECT,
  });

  if (movies.length === 0 || width <= 0) return null;

  return (
    <View className="w-full" style={{ height: posterHeight }}>
      <Carousel
        style={{ width, height: posterHeight }}
        itemSize={slot}
        itemAnimation={itemAnimation}
        data={movies}
        loop
        autoplay
        autoplayInterval={AUTOPLAY_INTERVAL}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <MoviePoster id={item.id} poster={item.poster} width={cardWidth} height={posterHeight} />
        )}
      />
    </View>
  );
};
