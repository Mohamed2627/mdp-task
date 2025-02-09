import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { Dimensions } from "react-native";


const { width, height } = Dimensions.get('window');

const hp = (h: number): number => {
  return height * (h / 100)
}

const wp = (w: number): number => {
  return width * (w / 100)
}

export const STYLES: Record<string, StyleProp<TextStyle & ViewStyle>> = {
  error: {
    color: 'red',
    fontSize: wp(3.5),
    marginTop: hp(1)
  },
  title: {
    width: "100%",
    textAlign: "center",
    fontSize: wp(8),
    fontWeight: 600,
    paddingVertical: hp(2),
    marginTop: hp(1)
  },
  subtitle: {
    fontSize: hp(2.5),
    fontWeight: 'bold',
    marginBottom: hp(1.5),
  }
}