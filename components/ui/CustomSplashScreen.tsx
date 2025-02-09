import React from 'react'
import { ThemedView } from './ThemedView'
import { HelloWave } from './HelloWave'
import { ThemedText } from './ThemedText'

const CustomSplashScreen = () => {
  return (
    <ThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 20 }}>
      <ThemedText type="title">Welcome!</ThemedText>
      <HelloWave />
    </ThemedView>
  )
}

export default CustomSplashScreen