This is an Expo/React Native mobile application written in **TypeScript**. Prioritize mobile-first patterns, performance, and cross-platform compatibility.

## Flujo de trabajo obligatorio (cómo debe trabajar el agente)

Cada vez que la persona pida un tema, una funcionalidad o un cambio de código, sigue estos
pasos **en orden**. No te saltes ninguno.

1. **Entender (investigación previa).** Antes de tocar nada, investiga el proyecto: lee el código
   relacionado, la documentación oficial de la versión instalada de Expo y los archivos
   afectados. No asumas: verifica contra el código real y las docs versionadas. Si el requerimiento
   es ambiguo, pregunta antes de seguir.
2. **Proponer (plan).** Con el tema claro, presenta la solución como un plan en pasos o, si es
   una consulta pura, responde directamente. Indica qué archivos se tocarán, qué decisiones se
   toman y los riesgos o alternativas.
3. **Esperar confirmación.** No ejecutes cambios hasta que la persona (o el usuario que esté al
   mando) confirme explícitamente. Registra el plan con la herramienta `todo` para que sea visible.
4. **Rama (branch) para cambios de código.** Si la acción aprobada modifica código, pide permiso
   para crear una rama nueva en GitHub. Si se otorga:
   - Crea la rama localmente y publícala en el remoto (`git checkout -b <nombre>` +
     `git push -u origin <nombre>`), dejando `main` intacto.
   - **Nunca hagas `git commit`**: los commits los realiza la persona a cargo del repositorio. Deja
     los cambios en el working tree, sin commitear, y menciona en tu resumen qué archivos
     quedaron modificados para que pueda commitearlos.
   - Asigna tú el nombre de la rama según la tarea, en minúsculas y con guiones, p. ej.
     `feature/movie-details`, `fix/infinite-scroll`.
   - Si el permiso se deniega, continúa en la rama actual sin crear ninguna rama.

La confirmación es obligatoria para cualquier escritura de archivos, ejecuciones de comandos
destructivos o pushes. Las lecturas, búsquedas y verificaciones no requieren confirmación.

## Stack

- **Language**: TypeScript (strict mode, `noUncheckedIndexedAccess` cuando sea posible).
- **Runtime / tooling**: **Bun** sobre Node.js (>= 20). Usa `bun` / `bunx`; no uses `npm`, `yarn` ni `pnpm`. El lockfile del proyecto es `bun.lock`.
- **Framework**: Expo SDK 58 / React Native 0.88 con **Expo Router**.
- **Data fetching / cache**: **TanStack Query** (`@tanstack/react-query`) — toda llamada al backend
  pasa por un `useQuery` y sus `queryKey`.
- **Styling**: **Uniwind** (Tailwind CSS v4 para React Native) con tokens CSS-first en
  `src/global.css`. No uses `StyleSheet.create` para estilos nuevos ni libraries de estilos
  adicionales.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Commands

```bash
bunx expo install <package>  # ALWAYS use instead of bun/npm/yarn add — resolves SDK-compatible versions
bunx expo start              # start the dev server
bunx expo lint               # lint
bunx tsc --noEmit            # typecheck
bunx expo-doctor             # diagnose dependency and config issues
bunx expo install --fix      # fix incompatible package versions
```

Run lint and typecheck before declaring any task done.

## Architecture

The project is layered, with dependencies flowing `presentation -> core -> infrastructure`:

- **`src/core`** — business logic and data access: `actions/` (one per endpoint) and `api/` (the
  Axios instance with base URL and credentials).
- **`src/infrastructure`** — external contracts and mappers: `interfaces/` holds both the external
  DTOs (e.g. `MovieDBMoviesResponse`) and the domain model (`IMovie`); `mappers/` converts one into
  the other so the UI never depends on the API shape.
- **`src/presentation`** — UI: `components/`, `hooks/` and screens. Screens live in `src/app/`
  (Expo Router) and stay thin: they read from hooks and render components.
- **`src/utils`** — cross-cutting helpers (e.g. `tryCatch`).

Keep it that way: no `axios` calls inside components, no API DTOs leaking into `presentation`.

## TypeScript

- `strict: true` is enabled; never widen types with `any` to silence an error — model the shape
  properly in `src/infrastructure/interfaces`.
- Use `import type` for type-only imports.
- Keep the `IMovie`-style naming for domain interfaces and the `Result`/`Response` suffix for
  external ones.

## TanStack Query

- Create the `QueryClient` once in `src/app/_layout.tsx` and share it via `QueryClientProvider`.
- Every remote read is a `useQuery` with a stable `queryKey` shaped as `['<dominio>', '<recurso>']`.
- Set `staleTime` consciously (this app uses 24 h for the movie lists) and rely on the cache
  instead of refetching on mount.
- Mutations invalidate the affected `queryKey`s with `queryClient.invalidateQueries`.
- Loading and empty states are handled in the screen, not inside the hook.

## Uniwind styling

- Class names live in JSX via `className`; use Tailwind utilities and the custom tokens defined in
  `src/global.css` (`brand-*`, `radius-card`, etc.).
- Do **not** build class names dynamically (`text-${color}` will not compile): write the full class
  or use a lookup map of variants.
- Uniwind does not merge conflicting utilities; if you need a `cn()` helper, use `tailwind-merge`.
- The CSS entry is imported **once**, in `src/app/_layout.tsx`.
- `src/uniwind-types.d.ts` is generated by Uniwind at Metro startup — never edit it by hand.

## Navigation & Routing

- Use **Expo Router** for all navigation. Routes live in `src/app/` — every file there is a screen, `_layout.tsx` files define navigators. Keep non-route code (components, hooks, stores, utils) outside `src/app/`.
- Import `Link`, `router`, and `useLocalSearchParams` from `expo-router`.
- Docs: https://docs.expo.dev/router/introduction.md

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode or Android Studio required. Run EAS CLI as `bunx eas-cli <command>`.
Docs: https://docs.expo.dev/eas/index.md

## Rules

- If `ios/` and `android/` directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: `npx expo run:ios|android` locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md
- Install dependencies with `bunx expo install <package>` so the resolved version matches the current Expo SDK; never bump versions by hand.
- Secrets live in `.env` (gitignored) and are exposed to the app as `EXPO_PUBLIC_*` variables. Never hardcode API keys in the source.
- **Nunca ejecutes `git commit`** (ni `git commit --amend`, ni `git merge`, ni nada que cree un commit). El versionado de commits es responsabilidad de la persona. Sí puedes leer el historial (`git log`, `git diff`, `git status`) y crear/publicar ramas cuando se autorice.
