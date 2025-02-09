
import { useResponsiveScreen } from "@/hooks/useResponsiveScreen";
import { ThemedView } from "../ui/ThemedView";
import { PieChart } from "react-native-gifted-charts"
import { ThemedText } from "../ui/ThemedText";
import { STYLES } from "@/constants/styles";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useGetExpensesCategory } from "@/hooks/useGetExpensesCategory";
import { useCallback } from "react";


function PieChartComponent() {

  const { hp } = useResponsiveScreen();

  const textColor = useThemeColor({}, 'text');
  const { categoryExpenses } = useGetExpensesCategory();

  const isExpenseAdded = useCallback(() => {
    return categoryExpenses.some((cate) => cate.value > 0)
  }, [categoryExpenses])


  return (
    <ThemedView style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", marginTop: hp(8) }}>
      {isExpenseAdded() ? (
        <ThemedText style={STYLES.subtitle}>Category of Expenses</ThemedText>
      ) : (
        <ThemedText style={STYLES.subtitle}>No Expenses Added Yet</ThemedText>
      )}
      <ThemedView style={{ marginTop: hp(2) }}>
        <PieChart
          showText
          textSize={12}
          textColor={textColor}
          data={categoryExpenses}
        />
      </ThemedView>
    </ThemedView>
  );
}

export default PieChartComponent;