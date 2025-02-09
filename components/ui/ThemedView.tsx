import { ScrollView, View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  scroll?: boolean
};

export function ThemedView({ style, lightColor, darkColor, scroll, ...otherProps }: ThemedViewProps) {

  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  const RNView = scroll ? ScrollView : View

  return <RNView style={[{ backgroundColor }, ...(Array.isArray(style) ? style : [style])]} {...otherProps} />;
}
