import type { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedRef,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/ui/ThemedView';
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import { useResponsiveScreen } from '@/hooks/useResponsiveScreen';
import { ThemedText } from './ThemedText';
import { STYLES } from '@/constants/styles';

type Props = PropsWithChildren<{
  title?: string
}>;

export default function ParallaxFlatListView({
  children,
  title
}: Props) {
  // Refs---------------------------------------
  const flatListRef = useAnimatedRef<Animated.FlatList<any>>();

  // Hooks--------------------------------------
  const bottom = useBottomTabOverflow();
  const { wp, hp } = useResponsiveScreen()

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={STYLES.title}>{title}</ThemedText>
      <Animated.FlatList
        ref={flatListRef}
        data={[]}
        renderItem={() => null}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <ThemedView
            style={[styles.content, {
              paddingHorizontal: wp(6),
              paddingVertical: hp(3)
            }]}>
            {children}
          </ThemedView>
        }
        nestedScrollEnabled
        ListFooterComponent={<View style={{ height: bottom }} />}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  content: {
    flex: 1,
    overflow: 'hidden',
  },
});