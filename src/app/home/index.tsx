import { MainSlideShow, MovieHorizontalList, SafeAreaScreen, useMovies } from '@/presentation';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';

const HomeScreen = () => {
  const {
    nowPlayingQuery,
    popularQuery,
    popularMovies,
    topRateQuery,
    topRateMovies,
    upComingQuery,
    upComingMovies,
  } = useMovies();

  if (
    nowPlayingQuery.isLoading ||
    popularQuery.isLoading ||
    topRateQuery.isLoading ||
    upComingQuery.isLoading
  ) {
    return (
      <View className="justify-center items-center flex-1">
        <ActivityIndicator size="large" color="purple" />
      </View>
    );
  }

  return (
    <SafeAreaScreen className="flex-1 mt-2">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <Text className="text-3xl font-bold px-4 mb-2">Movies Apps</Text>
        <MainSlideShow movies={nowPlayingQuery.data ?? []} />

        <MovieHorizontalList
          title="Populars"
          movies={popularMovies}
          className="mt-4"
          onLoadMore={() => popularQuery.fetchNextPage()}
          isLoadingMore={popularQuery.isFetchingNextPage}
          hasNextPage={popularQuery.hasNextPage}
        />

        <MovieHorizontalList
          title="Mejor Calificadas"
          movies={topRateMovies}
          className="mt-4"
          onLoadMore={() => topRateQuery.fetchNextPage()}
          isLoadingMore={topRateQuery.isFetchingNextPage}
          hasNextPage={topRateQuery.hasNextPage}
        />

        <MovieHorizontalList
          title="Proximamente"
          movies={upComingMovies}
          className="mt-4"
          onLoadMore={() => upComingQuery.fetchNextPage()}
          isLoadingMore={upComingQuery.isFetchingNextPage}
          hasNextPage={upComingQuery.hasNextPage}
        />
      </ScrollView>
    </SafeAreaScreen>
  );
};

export default HomeScreen;
