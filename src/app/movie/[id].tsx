import { MovieCardDescription, MovieCardImage, MovieCastList } from '@/presentation';
import { useMovieById } from '@/presentation/hooks/useMovieById';

import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
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
        <MovieCardImage poster={movie.poster} />
        <MovieCardDescription movie={movie} />

        {movie.cast.length ? (
          <View className="px-5">
            <Text className="text-2xl font-bold text-black">Reparto</Text>
            <View className="mt-3">
              {/* Solo los 12 primeros (los más relevantes según TMDB). */}
              <MovieCastList cast={movie.cast.slice(0, 12)} imageSize={110} />
            </View>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default MovieScreen;
