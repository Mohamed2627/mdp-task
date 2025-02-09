import { NativeSyntheticEvent, StyleSheet, TextInput, TextInputProps, TextStyle } from 'react-native'
import React from 'react'
import { ThemedView } from '../ui/ThemedView';
import { ThemedText } from '../ui/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useResponsiveScreen } from '@/hooks/useResponsiveScreen'
import { STYLES } from '@/constants/styles';
import { TextInputFocusEventData } from 'react-native';

export interface IThemedTextInputProps extends TextInputProps {
  lightColor?: string,
  darkColor?: string,
  label?: string,
  value?: string,
  onChangeText?: (val: string) => void,
  secureTextEntry?: boolean,
  keyboardType?: "default"
  | "number-pad"
  | "decimal-pad"
  | "numeric"
  | "email-address"
  | "phone-pad"
  | "url"
  error?: string,
  placeholder?: string,
  required?: boolean,
  labelStyle?: TextStyle,
  onBlur?: ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
}

const ThemedTextInput = ({
  lightColor,
  darkColor,
  style,
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
  error = "",
  placeholder = "",
  required,
  labelStyle,
  onBlur
}: IThemedTextInputProps) => {

  // Hooks---------------------------------------
  const { hp, wp } = useResponsiveScreen()
  // Theme colors---------------------------------
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor, }, 'background');
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'border');
  const placeholderTextColor = useThemeColor({ light: lightColor, dark: darkColor }, 'placeholder');

  return (
    <ThemedView >
      {label && (
        <ThemedView style={{ marginBottom: hp(1), display: "flex", flexDirection: "row" }}>
          {required && (
            <ThemedText style={{ color: "red", fontSize: wp(4), paddingHorizontal: wp(1) }}>*</ThemedText>
          )}
          <ThemedText style={labelStyle ?? {}}>{`${label}`}</ThemedText>
        </ThemedView>
      )}
      <TextInput
        placeholder={placeholder}
        style={[{
          backgroundColor,
          color,
          borderColor: error ? 'red' : borderColor,
          borderWidth: 1,
          borderRadius: wp(2),
          paddingHorizontal: wp(2),
          fontSize: wp(4.8)
        }, ...(Array.isArray(style) ? style : [style])]}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
      />
      {error && (
        <ThemedText style={STYLES.error}>{error}</ThemedText>
      )}
    </ThemedView>
  )
}

export default ThemedTextInput

const styles = StyleSheet.create({})