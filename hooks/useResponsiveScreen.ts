import { useCallback } from "react";
import { useWindowDimensions } from "react-native";


export const useResponsiveScreen = () => {
  const { width, height } = useWindowDimensions();

  const hp = useCallback((h: number): number => {
    return height * (h / 100)
  }, [height]);

  const wp = useCallback((w: number): number => {
    return width * (w / 100)
  }, [height]);

  return { hp, wp }
}