import { StyleSheet, Pressable, TextStyle, ViewStyle } from 'react-native'
import React, { useCallback } from 'react'
import { ThemedView } from '../ui/ThemedView'
import { ThemedText } from '../ui/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useResponsiveScreen } from '@/hooks/useResponsiveScreen'
import { Entypo } from '@expo/vector-icons'
import { STYLES } from '@/constants/styles'
import { SelectOption } from '@/models'
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

export interface ThemedSelectDropdownProps {
  lightColor?: string
  darkColor?: string
  label?: string
  options: SelectOption[]
  selectedValue?: string | number | null
  onSelect?: (value: string | number | null) => void
  placeholder?: string
  error?: string
  required?: boolean
  labelStyle?: TextStyle
  dropdownStyle?: ViewStyle
  onBlur?: () => void,
  enableSearch?: boolean  // We can use this prop in a case where we have many dropdown items, But for sure we will need it in case of type
  disabled?: boolean
}

const ThemedSelectDropdown = ({
  lightColor,
  darkColor,
  label,
  options,
  selectedValue,
  onSelect,
  placeholder = "Select an option",
  error = "",
  required,
  labelStyle,
  dropdownStyle,
  onBlur,
  enableSearch,
  disabled,
}: ThemedSelectDropdownProps) => {
  // Hooks-------------------------------------------
  const { hp, wp } = useResponsiveScreen()

  // Theme colors---------------------------------------
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background')
  const dropdownBackgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'dropdown')
  const selectedOption = useThemeColor({ light: lightColor, dark: darkColor }, 'selectedOption')
  const textColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text')
  const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'border')
  const placeholderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'placeholder')


  // Functions-------------------------------------------
  const onSelectOption = (item: SelectOption) => {
    onSelect?.(item.value)
  }

  const renderItem = (item: SelectOption) => {
    return (
      <ThemedView style={[styles.item, {
        padding: wp(2),
        backgroundColor: item.value === selectedValue ? selectedOption : dropdownBackgroundColor,
        height: hp(6),
        paddingHorizontal: wp(3)
      }]}>
        <ThemedText style={{
          flex: 1,
          fontSize: wp(4.5)
        }}>{item.label}</ThemedText>
        {item.value === selectedValue && (
          <AntDesign
            style={{
              marginRight: wp(1.2),
            }}
            color={textColor}
            name="Safety"
            size={20}
          />
        )}
      </ThemedView>
    );
  };

  const renderRightIcon = useCallback(() => {
    if (selectedValue) {
      return (
        <Pressable
          onPress={() => {
            onSelect?.(null)
          }}
          hitSlop={10}
        >
          <Entypo
            name="cross"
            size={wp(5)}
            color={textColor}
          />
        </Pressable>
      )
    }
    return (
      <Entypo
        name={"chevron-down"}
        size={wp(5)}
        color={textColor}
      />
    )
  }, [selectedValue])


  return (
    <ThemedView style={{
      position: "relative"
    }}>

      {label && (
        <ThemedView style={{ marginBottom: hp(1), flexDirection: 'row' }}>
          {required && (
            <ThemedText style={{ color: 'red', fontSize: wp(4), marginRight: wp(1) }}>*</ThemedText>
          )}
          <ThemedText style={labelStyle}>{label}</ThemedText>
        </ThemedView>
      )}

      <Dropdown
        style={[{
          backgroundColor,
          borderColor: error ? 'red' : borderColor,
          borderRadius: wp(2),
          borderWidth: 1,
          paddingVertical: hp(1.5),
          paddingHorizontal: wp(3),
        }]}
        placeholderStyle={{
          color: selectedValue ? textColor : placeholderColor,
          fontSize: wp(4.8)
        }}
        selectedTextStyle={{ color: textColor }}
        containerStyle={[{
          backgroundColor,
          borderRadius: wp(2),
        },
          dropdownStyle
        ]}
        disable={disabled}
        searchPlaceholder='search....'
        searchPlaceholderTextColor={placeholderColor}
        inputSearchStyle={{
          backgroundColor,
          color: textColor,
          height: 40,
          fontSize: 16,
        }}
        renderRightIcon={renderRightIcon}
        data={options}
        search={enableSearch}
        maxHeight={hp(40)}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={selectedValue}
        onBlur={onBlur}
        onChange={onSelectOption}
        renderItem={renderItem}
      />

      {error && (
        <ThemedText style={STYLES.error}>
          {error}
        </ThemedText>
      )}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default ThemedSelectDropdown