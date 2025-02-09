/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#6b6e70',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    border: "#171d20",
    placeholder: '#b3b6b8',
    selectedOption: '#f1f5f8',
    dropdown: '#fcfcfc'
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    border: '#eef4f9',
    placeholder: '#82919d',
    dropdown: '#4d5154',
    selectedOption: '#151718'
  },
};
