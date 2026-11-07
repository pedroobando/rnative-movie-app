import { ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { useSafeAreaLayout } from '../hooks/useSafeAreaLayout';

interface Props {
  children: ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
  /** Añade un padding extra (en px) por debajo de la barra del sistema. */
  extraPaddingBottom?: number;
}

/**
 * Contenedor base de las pantallas: reserva el espacio ocupado por las barras
 * del sistema (status bar y barra de navegación con home / tareas / atrás).
 *
 * En horizontal la barra de navegación se sitúa en un lateral, de ahí que se
 * apliquen los insets izquierdo y derecho además del superior y el inferior.
 */
export const SafeAreaScreen = ({ children, className, style, extraPaddingBottom = 0 }: Props) => {
  const { padding } = useSafeAreaLayout();

  return (
    <View
      className={className}
      style={[
        padding,
        extraPaddingBottom > 0 ? { paddingBottom: padding.paddingBottom + extraPaddingBottom } : null,
        style,
      ]}>
      {children}
    </View>
  );
};
