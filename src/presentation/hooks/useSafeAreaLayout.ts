import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

export interface SafeAreaPadding {
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
}

export interface SafeAreaLayout {
  /** Insets reales del sistema (barra de estado, barra de navegación, notch...). */
  insets: EdgeInsets;
  /** Padding a aplicar para que el contenido nunca quede debajo de las barras del sistema. */
  padding: SafeAreaPadding;
  /** Ancho útil de la pantalla (sin las barras laterales en modo horizontal). */
  contentWidth: number;
  /** Alto útil de la pantalla (sin las barras superior/inferior). */
  contentHeight: number;
}

/**
 * Calcula el layout respetando las barras del sistema (status bar y barra de
 * navegación con los botones home / tareas / atrás).
 *
 * En vertical la barra de navegación ocupa la parte inferior y en horizontal
 * pasa a ocupar el lateral izquierdo (o derecho, según el sentido de la
 * rotación), por eso se tienen en cuenta los cuatro insets.
 */
export const useSafeAreaLayout = (): SafeAreaLayout => {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  return useMemo(() => {
    const padding: SafeAreaPadding = {
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    };

    return {
      insets,
      padding,
      contentWidth: Math.max(width - insets.left - insets.right, 0),
      contentHeight: Math.max(height - insets.top - insets.bottom, 0),
    };
  }, [insets, width, height]);
};
