# Uniwind + Expo (demo)

Demo mínima de [Uniwind](https://uniwind.dev) (Tailwind CSS v4 para React Native) sobre
Expo SDK 58 / React Native 0.88. **No usa `babel.config.js`**: Uniwind se integra vía Metro.

## Puesta en marcha

```bash
bun install
bunx expo start
```

Funciona en **Expo Go** (Uniwind es JS puro, no requiere dev build).

## Estructura

```
src/
  app/
    _layout.tsx      # Stack + SafeAreaProvider + import del CSS
    index.tsx        # pantalla principal (demo)
    about.tsx        # segunda pantalla (navegación)
  components/
    card.tsx
    theme-switcher.tsx
  global.css         # @import 'tailwindcss' + @import 'uniwind' + @theme
  uniwind-types.d.ts # generado por uniwind (no editar)
metro.config.js      # withUniwindConfig(config, { cssEntryFile })
```

## Configuración clave

`metro.config.js` (Uniwind debe ser el wrapper más externo):

```js
const { getDefaultConfig } = require('expo/metro-config');
const { withUniwindConfig } = require('uniwind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withUniwindConfig(config, {
  cssEntryFile: './src/global.css',
  dtsFile: './src/uniwind-types.d.ts',
});
```

`src/global.css` — tema CSS-first (Tailwind v4):

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

- Theming: `Uniwind.setTheme('light' | 'dark' | 'system')` y el hook `useUniwind()`.
  Las variantes `dark:` funcionan sin configuración extra.
- Insets: `Uniwind.updateInsets(insets)` desde `SafeAreaListener` habilita `p-safe`, `m-safe`, etc.
- No concatenes classNames dinámicamente (`text-${color}` no compila): escribe la clase
  completa o usa un mapa de variantes.
- Uniwind **no deduplica** classNames; si necesitas `cn()`, usa `tailwind-merge`.
- `src/uniwind-types.d.ts` se regenera al arrancar Metro.
