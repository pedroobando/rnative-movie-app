import { MovieCastList, MovieDetailsCard } from '@/presentation';
import { useMovieById } from '@/presentation/hooks/useMovieById';

import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MovieScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const movieId = id ?? '';

  const { data: movie, isLoading, isError } = useMovieById(+movieId);
  const insets = useSafeAreaInsets();

  if (isLoading) {
    return (
      <View className="flex flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#c2410c" />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex flex-1 items-center justify-center">
        <Text className="text-2xl text-orange-800">No se pudo cargar la película</Text>
      </View>
    );
  }

  if (!movie) {
    return (
      <View className="flex flex-1 items-center justify-center">
        <Text className="text-2xl text-orange-800">No se pudo cargar la película</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />

      <ScrollView
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
      >
        <MovieDetailsCard movie={movie} />

        {movie.cast.length ? (
          <View className="px-5">
            <Text className="text-2xl font-bold text-black">Reparto</Text>
            <View className="mt-3">
              {/* Solo los 12 primeros (los más relevantes según TMDB). */}
              <MovieCastList cast={movie.cast.slice(0, 12)} />
            </View>
          </View>
        ) : null}
      </ScrollView>

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

export default MovieScreen;
