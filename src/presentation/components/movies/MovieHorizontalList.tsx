import { IMovie } from '@/infrastructure';
import { FlatList, Text, View } from 'react-native';
import { MoviePoster } from './MoviePoster';

interface Props {
  movies: IMovie[];
  title: string;
  className?: string;
}

export const MovieHorizontalList = ({ movies, title, className }: Props) => {
  return (
    <View className={`${className}`}>
      {title && <Text className="text-3xl font-bold px-4 mb-2">{title}</Text>}

      <FlatList
        horizontal
        data={movies}
        keyExtractor={(item) => `${item.id}`}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <MoviePoster className="mx-1" id={item.id} poster={item.poster} smallPoster />
        )}
      />
    </View>
  );
};
