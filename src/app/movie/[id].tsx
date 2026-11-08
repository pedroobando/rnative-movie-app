import { MovieCastList } from '@/presentation/components/movies/MovieCastList';
import { useMovieById } from '@/presentation/hooks/useMovieById';

import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';

const MovieScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const movieId = id ?? '';

  const { data: movie, isLoading, isError } = useMovieById(+movieId);

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

  return (
    <ScrollView className="flex-1 bg-neutral-950">
      {movie?.backdrop ? (
        <Image
          source={{ uri: movie.backdrop }}
          style={{ width: '100%', height: 240 }}
          contentFit="cover"
          transition={200}
        />
      ) : null}

      <View className="px-4 pt-4 pb-10">
        <Text className="text-3xl font-bold text-white">{movie?.title ?? id}</Text>
        <Text className="mt-1 text-sm text-neutral-400">
          {movie?.releaseDate.toLocaleDateString('es-MX')} • {movie?.duration} min • ⭐{' '}
          {movie?.rating.toFixed(1)}
        </Text>

        {movie?.genres?.length ? (
          <View className="mt-3 flex flex-row flex-wrap gap-2">
            {movie.genres.map((genre) => (
              <View key={genre} className="rounded-full bg-neutral-800 px-3 py-1">
                <Text className="text-xs text-neutral-200">{genre}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {movie?.description ? (
          <Text className="mt-4 text-base leading-6 text-neutral-300">{movie.description}</Text>
        ) : null}

        <Text className="mt-6 mb-2 text-xl font-bold text-white">Reparto</Text>

        {movie?.cast?.length ? (
          // Solo los 12 primeros (los más relevantes según TMDB).
          <MovieCastList cast={movie.cast.slice(0, 12)} />
        ) : (
          <Text className="text-sm text-neutral-500">No hay información del reparto.</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default MovieScreen;
