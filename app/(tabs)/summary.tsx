import { StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ui/ParallaxScrollView';
import SummarySection from '@/components/Transaction/SummarySection';
import PieChartComponent from '@/components/Transaction/PieChartComponent';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      title='Summary'
    >
      <SummarySection />
      <PieChartComponent />
    </ParallaxScrollView>
  );
}