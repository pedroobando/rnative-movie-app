import { useMemo } from 'react';

import { Extrapolation, interpolate } from 'react-native-reanimated';
import { CarouselItemAnimation } from 'react-native-reanimated-carousel';

import { useSafeAreaLayout } from './useSafeAreaLayout';

export interface Props {
  /** Posters visibles a la vez (la activa centrada y las vecinas asomando). */
  visibleCards: number;
  /** Separacion entre posters en px. */
  cardGap: number;
  /** Proporcion del poster (ancho / alto). */
  posterAspect: number;
}

export interface SlideShowLayout {
  /** Ancho disponible del carrusel. */
  width: number;
  /** Ancho de cada poster. */
  cardWidth: number;
  /** Separacion entre el centro de dos posters (= paso de pagina del carrusel). */
  slot: number;
  /** Alto de cada poster. */
  posterHeight: number;
  /** Animacion de paralaje: mantiene la activa centrada y muestra las vecinas. */
  itemAnimation: CarouselItemAnimation;
}

/**
 * Calcula la geometria y la animacion de paralaxe del carrusel principal.
 *
 * `slot` debe coincidir con el `itemSize` del `Carousel`: el scroll avanza un
 * `slot` por pagina y la tarjeta tiene que moverse exactamente lo mismo.
 */
export const useMainSlideShow = ({
  visibleCards,
  cardGap,
  posterAspect,
}: Props): SlideShowLayout => {
  const { contentWidth } = useSafeAreaLayout();

  const cardWidth = (contentWidth - cardGap * (visibleCards - 1)) / visibleCards;
  const slot = cardWidth + cardGap;
  const posterHeight = cardWidth / posterAspect;

  const itemAnimation = useMemo<CarouselItemAnimation>(
    () =>
      (progress) => {
        'worklet';

        const distance = Math.min(Math.abs(progress), 2);
        // El poster se centra dentro de su hueco, por eso se descuplica medio gap.
        const center = (contentWidth - cardWidth) / 2 - cardGap / 2;

        return {
          transform: [
            { translateX: center + progress * slot },
            { scale: interpolate(distance, [0, 1, 2], [1, 0.92, 0.85], Extrapolation.CLAMP) },
          ],
          opacity: interpolate(distance, [0, 1, 2], [1, 0.9, 0.7], Extrapolation.CLAMP),
          zIndex: Math.round(10 - distance * 10),
        };
      },
    [contentWidth, cardWidth, cardGap, slot],
  );

  return { width: contentWidth, cardWidth, slot, posterHeight, itemAnimation };
};
