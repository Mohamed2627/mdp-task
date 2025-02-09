import { StyleSheet, Pressable, TextStyle, StyleProp, Platform } from 'react-native'
import React, { useState } from 'react'
import { ThemedView } from '../ui/ThemedView'
import { ThemedText } from '../ui/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useResponsiveScreen } from '@/hooks/useResponsiveScreen'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { format } from 'date-fns'
import { MaterialIcons } from '@expo/vector-icons'
import { useColorScheme } from '@/hooks/useColorScheme'

export interface ThemedDatePickerProps {
  lightColor?: string
  darkColor?: string
  label?: string
  value?: Date | null | number
  onSelect?: (value: Date | null | number) => void
  placeholder?: string
  error?: string
  required?: boolean
  labelStyle?: StyleProp<TextStyle>
  minimumDate?: Date
  maximumDate?: Date
  mode?: 'date' | 'time' | 'datetime'
}

const ThemedDatePicker = ({
  lightColor,
  darkColor,
  label,
  value,
  onSelect,
  placeholder = "Select date",
  error = "",
  required,
  labelStyle,
  minimumDate,
  maximumDate,
  mode = 'date'
}: ThemedDatePickerProps) => {
  // Hooks-------------------------------------------
  const { hp, wp } = useResponsiveScreen()
  const [showPicker, setShowPicker] = useState(false);
  const theme = useColorScheme() ?? "light"

  // Theme colors---------------------------------------
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background')
  const textColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text')
  const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'border')
  const iconColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text')
  const placeholderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'placeholder')

  // Functions-------------------------------------------
  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowPicker(false)
    if (event.type === 'set' && selectedDate) {
      onSelect?.(event.nativeEvent.timestamp)
    } else {
      onSelect?.(null)
    }
  }

  const displayValue = value ?
    format(value, mode === 'time' ? 'HH:mm' : 'dd/MM/yyyy') :
    placeholder

  return (
    <ThemedView style={{ marginBottom: hp(1) }}>
      {label && (
        <ThemedView style={{ marginBottom: hp(1), flexDirection: 'row' }}>
          {required && (
            <ThemedText style={{ color: 'red', fontSize: wp(4), marginRight: wp(1) }}>*</ThemedText>
          )}
          <ThemedText style={labelStyle}>{label}</ThemedText>
        </ThemedView>
      )}

      <Pressable
        onPress={() => setShowPicker(true)}
        style={[
          styles.dropdownTrigger,
          {
            backgroundColor,
            borderColor: error ? 'red' : borderColor,
            borderRadius: wp(2),
            borderWidth: 1,
            paddingVertical: hp(1.5),
            paddingHorizontal: wp(3)
          },
        ]}
      >
        <ThemedText style={{
          color: value ? textColor : placeholderColor,
          fontSize: wp(4.8)
        }}>
          {displayValue}
        </ThemedText>

        {value ? (
          <Pressable
            onPress={() => onSelect?.(null)}
            hitSlop={10}
          >
            <MaterialIcons
              name="close"
              size={wp(5)}
              color={iconColor}
            />
          </Pressable>
        ) : (
          <MaterialIcons
            name={mode === 'time' ? 'access-time' : 'event'}
            size={wp(5)}
            color={iconColor}
          />
        )}
      </Pressable>

      {showPicker && (
        Platform.OS === 'ios' ? (
          <ThemedView style={[
            styles.pickerContainer,
            {
              backgroundColor,
              borderRadius: wp(2),
              marginTop: hp(0.5)
            }
          ]}>
            <DateTimePicker
              value={value instanceof Date ? value : new Date()}
              // value={displayValue}
              mode={mode}
              display="spinner"
              onChange={handleDateChange}
              minimumDate={minimumDate}
              maximumDate={maximumDate}
              themeVariant={theme}
              style={[styles.iosPicker, { height: hp(20) }]}
            />
          </ThemedView>
        ) : (
          <DateTimePicker
            value={value ? new Date(value as number) : new Date()}
            mode={mode}
            display="default"
            onChange={handleDateChange}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
          />
        )
      )}

      {error && (
        <ThemedText style={{
          color: 'red',
          fontSize: wp(3.5),
          marginTop: hp(0.5)
        }}>
          {error}
        </ThemedText>
      )}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  dropdownTrigger: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerContainer: {
    overflow: 'hidden',
  },
  iosPicker: {
    width: '100%',
  }
})

export default ThemedDatePicker