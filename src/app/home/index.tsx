import { MainSlideShow, MovieHorizontalList, SafeAreaScreen, useMovies } from '@/presentation';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';

const HomeScreen = () => {
  const { nowPlayingQuery, popularQuery, topRateQuery, upComingQuery } = useMovies();

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

        <MovieHorizontalList title="Populars" movies={popularQuery.data ?? []} className="mt-4" />

        <MovieHorizontalList
          title="Proximamente"
          movies={upComingQuery.data ?? []}
          className="mt-4"
        />

        <MovieHorizontalList title="Top Rate" movies={topRateQuery.data ?? []} className="mt-4" />
      </ScrollView>
    </SafeAreaScreen>
  );
};

export default HomeScreen;
