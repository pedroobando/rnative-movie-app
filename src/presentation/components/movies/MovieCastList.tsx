import type { ICastMember } from '@/infrastructure';

import { Image } from 'expo-image';
import { memo, useCallback } from 'react';
import { FlatList, Text, View } from 'react-native';

interface Props {
  cast: ICastMember[];
  /** Altura de la foto del actor. */
  imageSize?: number;
  className?: string;
}

const ITEM_WIDTH = 110;
/** Radio de borde suave para las fotos del reparto. */
const BORDER_RADIUS = 12;

export const MovieCastList = memo(({ cast, imageSize = 80, className }: Props) => {
  const renderItem = useCallback(
    ({ item }: { item: ICastMember }) => (
      <View className="items-center mr-3" style={{ width: ITEM_WIDTH }}>
        {item.profile ? (
          <Image
            source={{ uri: item.profile }}
            style={{ width: imageSize, height: imageSize * 1.4, borderRadius: BORDER_RADIUS }}
            contentFit="cover"
            transition={200}
          />
        ) : (
          <View
            className="bg-neutral-200 items-center justify-center"
            style={{ width: imageSize, height: imageSize * 1.4, borderRadius: BORDER_RADIUS }}
          >
            <Text className="text-xl font-bold text-neutral-500">{item.name.charAt(0)}</Text>
          </View>
        )}

        <Text className="mt-2 text-center text-sm font-semibold" numberOfLines={1}>
          {item.name}
        </Text>
        <Text className="text-center text-xs text-neutral-500" numberOfLines={1}>
          {item.character}
        </Text>
      </View>
    ),
    [imageSize],
  );

  const keyExtractor = useCallback((item: ICastMember) => `${item.id}`, []);

  return (
    <View className={className}>
      <FlatList
        horizontal
        data={cast}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={5}
      />
    </View>
  );
});

MovieCastList.displayName = 'MovieCastList';
