import { Image, Pressable } from 'react-native';

interface Props {
  id: number;
  poster: string;
  smallPoster?: boolean;
  /** Ancho del poster. Si no se indica se usa el tamaño por defecto. */
  width?: number;
  /** Alto del poster. Si no se indica se usa el tamaño por defecto. */
  height?: number;
  className?: string;
}

export const MoviePoster = ({
  id,
  poster,
  smallPoster = false,
  width,
  height,
  className,
}: Props) => {
  return (
    <Pressable className={`active:opacity-90 ${className}`} style={{ alignItems: 'center' }}>
      <Image
        source={{ uri: poster }}
        className="shadow-lg rounded-xl w-full h-full"
        style={{
          width: width ?? (smallPoster ? 85 : 150),
          height: height ?? (smallPoster ? 130 : 250),
        }}
        resizeMode="cover"
      />
    </Pressable>
  );
};
