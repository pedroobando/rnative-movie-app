# Movies App

App móvil de películas construida con **Expo SDK 58 / React Native 0.88** que consume la API de
[TMDB (The Movie Database)](https://www.themoviedb.org/). Muestra un carrusel principal con los
posters destacados y listas horizontales de películas por categoría.

El estilo se resuelve con [**Uniwind**](https://uniwind.dev) (Tailwind CSS v4 para React Native) y
los datos con **TanStack Query** sobre **Axios**.

## Características

- Pantalla principal con carrusel de "now playing" con animación de paralaje.
- Listas horizontales por categoría: populares, próximas a estrenarse y mejor valoradas.
- Arquitectura por capas (core / infrastructure / presentation) para separar lógica, datos y UI.
- Manejo de errores tipado con `tryCatch` y caché de 24 h por categoría.
- Diseño *safe area* aware: el contenido nunca queda bajo la barra de estado o de navegación.

## Requisitos

- [Node.js](https://nodejs.org) 20 o superior.
- [Bun](https://bun.sh) (el proyecto usa `bun.lock`).
- Una API key gratuita de TMDB: <https://www.themoviedb.org/settings/api>.

## Puesta en marcha

1. Instala las dependencias:

   ```bash
   bun install
   ```

2. Configura las variables de entorno. Copia el archivo de ejemplo:

   ```bash
   cp .env.template .env
   ```

   ```dotenv
   EXPO_PUBLIC_MOVIE_DB_KEY=tu_api_key
   EXPO_PUBLIC_MOVIE_DB_URL=https://api.themoviedb.org/3/movie
   ```

   Las variables `EXPO_PUBLIC_*` se incrustan en el bundle, por lo que la key queda expuesta en el
   binario. Es aceptable para una app de demostración, pero en producción conviene pasar por un
   proxy propio.

3. Arranca el servidor de desarrollo:

   ```bash
   bunx expo start
   ```

Funciona en **Expo Go** (Uniwind es JS puro, no requiere development build).

## Scripts

```bash
bunx expo start        # servidor de desarrollo
bunx expo start --ios  # abre en iOS
bunx expo start --android
bunx expo start --web
bunx expo lint         # ESLint
bunx tsc --noEmit      # typecheck
```

## Estructura

```
src/
  app/                        # Rutas de Expo Router (cada archivo es una pantalla)
    _layout.tsx               # Stack + QueryClientProvider + import del CSS
    index.tsx                 # redirección a /home
    home/index.tsx            # pantalla principal
  core/                       # Lógica de negocio y acceso a datos
    actions/movies/           # acciones por categoría (popular, now-playing, upcoming, top-rate)
    api/movie-api.ts          # instancia de Axios con la base URL y la api key
  infrastructure/             # Modelos de datos externos y mappers
    interfaces/               # IMovie (dominio) y MovieDBMoviesResponse (API)
    mappers/movie.mapper.ts   # MovieDB -> IMovie
  presentation/               # UI: componentes, hooks y pantallas
    components/movies/        # MainSlideShow, MovieHorizontalList, MoviePoster
    components/SafeAreaScreen.tsx
    hooks/                    # useMovies, useSafeAreaLayout, useMainSlideShow
  utils/try-catch.ts          # helper de manejo de errores
  global.css                  # @import 'tailwindcss' + @import 'uniwind' + @theme
  uniwind-types.d.ts          # generado por uniwind (no editar)
```

El alias `@/` apunta a `src/` (configurado en `tsconfig.json`).

## Arquitectura

El proyecto sigue una separación en tres capas, siguiendo el flujo de dependencias
`presentation -> core -> infrastructure`:

- **core**: acciones que orquestan la petición y transforman la respuesta. Cada acción devuelve
  `IMovie[]` y lanza un error descriptivo si la llamada falla.
- **infrastructure**: define la forma de los datos que devuelve TMDB (`Result`,
  `MovieDBMoviesResponse`) y el `MovieMapper` que los convierte al modelo de dominio `IMovie`
  (fechas reales, URLs absolutas de posters, etc.). Así la UI nunca depende del contrato de la API.
- **presentation**: componentes y hooks. `useMovies` expone una query por categoría con
  `staleTime` de 24 horas, así que los datos cacheados se muestran de inmediato.

## Configuración clave

**Metro** — Uniwind debe ser el wrapper más externo:

```js
const { getDefaultConfig } = require('expo/metro-config');
const { withUniwindConfig } = require('uniwind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withUniwindConfig(config, {
  cssEntryFile: './src/global.css',
  dtsFile: './src/uniwind-types.d.ts',
});
```

**Tema CSS** — los tokens se definen en `src/global.css` (Tailwind v4, tema CSS-first):

```css
@import 'tailwindcss';
@import 'uniwind';

@theme {
  --color-brand-600: #4f46e5;
  --radius-card: 1.25rem;
}
```

El CSS se importa **una sola vez** en el layout raíz (`src/app/_layout.tsx`).

## Notas

- **Safe area**: `useSafeAreaLayout` calcula los insets del sistema y el ancho/alto útil. En
  horizontal la barra de navegación pasa a un lateral, por eso `SafeAreaScreen` aplica los cuatro
  insets. El `Stack` de Expo Router ya monta un `SafeAreaProvider`; si renderizas contenido fuera
  de él, envuélvelo con `SafeAreaProvider` explícitamente.
- **Clases dinámicas**: no concatenes classNames (`text-${color}` no compila). Escribe la clase
  completa o usa un mapa de variantes.
- **Uniwind no deduplica** classNames; si necesitas `cn()`, usa `tailwind-merge`.
- `src/uniwind-types.d.ts` se regenera al arrancar Metro.
- `expo-router` con `typedRoutes` y React Compiler están activados en `app.json`.
