import type { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
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

export default function ParallaxScrollView({
  children,
  title
}: Props) {

  // Refs---------------------------------------
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  // Hooks--------------------------------------
  const bottom = useBottomTabOverflow();
  const { wp, hp } = useResponsiveScreen()

  return (
    <ThemedView style={styles.container}>
      {title && (
        <ThemedText style={STYLES.title}>{title}</ThemedText>
      )}
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom }}>
        <ThemedView style={[styles.content, {
          paddingHorizontal: wp(6),
          paddingVertical: hp(4)
        }]}>
          {children}
        </ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40
  },
  content: {
    flex: 1,
  },
});
