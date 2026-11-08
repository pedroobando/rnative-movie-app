import { Image } from 'expo-image';
import { Pressable, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

interface Props {
  /** Película a mostrar. El componente solo recibe datos, no hace ninguna consulta. */
  poster: string;
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
export const MovieCardImage = ({ poster }: Props) => {
  const { height: screenHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  return (
    <View>
      <LinearGradient
        colors={['rgba(0,0,0,0.3)', 'transparent']}
        start={[0, 0]}
        style={{
          height: screenHeight,
          position: 'absolute',
          zIndex: 1,
          width: '100%',
        }}
      />
      {poster ? (
        <View className="flex-1 rounded-b-[25px] overflow-hidden">
          <Image
            source={{ uri: poster }}
            style={{ width: '100%', aspectRatio: POSTER_ASPECT_RATIO }}
            className="flex-1"
            contentFit="cover"
            transition={200}
          />
        </View>
      ) : null}

      {/* Botón de retroceso superpuesto sobre el póster. */}
      <Pressable
        onPress={() => router.back()}
        accessibilityRole="button"
        accessibilityLabel="Volver"
        className="absolute z-10 h-11 w-11 items-center justify-center"
        style={{ top: insets.top + 8, left: 12 }}
      >
        <View
          style={{
            height: 20,
            width: 20,
            borderLeftWidth: 3,
            borderBottomWidth: 3,
            borderColor: '#ffffff',
            transform: [{ rotate: '45deg' }],
          }}
        />
      </Pressable>
    </View>
  );
};
