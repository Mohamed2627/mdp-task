import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, StyleSheet, TextStyle, ViewStyle, Text } from 'react-native';

const themeColors = {
  primary: '#2196F3',
  secondary: '#4CAF50',
  success: '#8BC34A',
  danger: '#F44336',
  disable: "gray",
  text: '#212121',
  background: '#FFFFFF',
};

// Define component props
type ThemedTouchableOpacityProps = TouchableOpacityProps & {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  textStyle?: TextStyle;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
};

const ThemedTouchableOpacity: React.FC<ThemedTouchableOpacityProps> = ({
  variant = 'primary',
  style,
  textStyle,
  children,
  icon,
  disabled = false,
  ...rest
}) => {

  const textColor = useThemeColor({}, 'text')

  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: disabled ? themeColors.disable : themeColors.primary,
          ...styles.buttonBase,
        };
      case 'secondary':
        return {
          backgroundColor: disabled ? themeColors.disable : themeColors.secondary,
          ...styles.buttonBase,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: themeColors.primary,
          ...styles.buttonBase,
        };
      case 'text':
        return {
          backgroundColor: 'transparent',
          padding: 0,
        };
      default:
        return styles.buttonBase;
    }
  };

  const getTextStyle = (): TextStyle => {
    switch (variant) {
      case 'outline':
        return { color: themeColors.primary };
      case 'text':
        return { color: textColor };
      default:
        return { color: themeColors.background };
    }
  };

  return (
    <TouchableOpacity
      style={[getVariantStyle(), style]}
      activeOpacity={0.8}
      disabled={disabled}
      {...rest}
    >
      {icon && icon}
      {children && <Text style={[styles.text, getTextStyle(), textStyle]}>{children}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonBase: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ThemedTouchableOpacity;