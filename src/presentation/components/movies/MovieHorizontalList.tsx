import type { IMovie } from '@/infrastructure';
import { memo, useCallback, useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  View,
} from 'react-native';
import { MoviePoster } from './MoviePoster';

interface Props {
  movies: IMovie[];
  title: string;
  className?: string;
  /** Se dispara cuando la lista llega al final y hay más páginas por cargar. */
  onLoadMore?: () => void;
  /** Indica que la siguiente página está siendo descargada. */
  isLoadingMore?: boolean;
  /** Indica que existe una siguiente página en el servidor. */
  hasNextPage?: boolean;
}

/** Ancho del poster pequeño (85) + márgenes laterales (mx-1 = 4 + 4). */
const ITEM_WIDTH = 93;

export const MovieHorizontalList = memo(
  ({
    movies,
    title,
    className,
    onLoadMore,
    isLoadingMore = false,
    hasNextPage = false,
  }: Props) => {
    // Evita disparar varias cargas seguidas mientras la petición está en vuelo.
    const isRequesting = useRef(false);

    useEffect(() => {
      if (!isLoadingMore) isRequesting.current = false;
    }, [isLoadingMore]);

    const loadMore = useCallback(() => {
      if (!onLoadMore || !hasNextPage || isLoadingMore || isRequesting.current) return;

      isRequesting.current = true;
      onLoadMore();
    }, [onLoadMore, hasNextPage, isLoadingMore]);

    // Red de seguridad: si onEndReached no se dispara en listas horizontales.
    const onScroll = useCallback(
      (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;

        const isEndReached =
          contentOffset.x + layoutMeasurement.width + 600 >= contentSize.width;
        if (!isEndReached) return;

        loadMore();
      },
      [loadMore],
    );

    // Referencias estables: evita que FlatList recree todas las celdas en cada render.
    const renderItem = useCallback(
      ({ item }: { item: IMovie }) => (
        <MoviePoster className="mx-1" id={item.id} poster={item.poster} smallPoster />
      ),
      [],
    );

    const keyExtractor = useCallback((item: IMovie) => `${item.id}`, []);

    // Tamaños fijos: permite calcular el layout sin medir cada celda.
    const getItemLayout = useCallback(
      (_: unknown, index: number) => ({
        length: ITEM_WIDTH,
        offset: ITEM_WIDTH * index,
        index,
      }),
      [],
    );

    return (
      <View className={`${className}`}>
        {title && <Text className="text-3xl font-bold px-4 mb-2">{title}</Text>}

        <FlatList
          horizontal
          data={movies}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          getItemLayout={getItemLayout}
          showsHorizontalScrollIndicator={false}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          onScroll={onScroll}
          scrollEventThrottle={16}
          removeClippedSubviews
          initialNumToRender={6}
          maxToRenderPerBatch={6}
          windowSize={5}
          ListFooterComponent={
            isLoadingMore ? (
              <View className="px-4 justify-center">
                <ActivityIndicator size="small" color="purple" />
              </View>
            ) : undefined
          }
        />
      </View>
    );
  },
);

MovieHorizontalList.displayName = 'MovieHorizontalList';
