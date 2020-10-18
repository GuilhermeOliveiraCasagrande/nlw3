//https://youtu.be/CJI4ltmHLeo?t=2077
import React from 'react';
import { Text, View } from 'react-native';
import { useFonts } from "expo-font"
import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from "@expo-google-fonts/nunito"

import Routes from "./src/routes/routes"

/* Usa elementos do react-native, não html */
/* className -> style */
/* div -> View */
/* qualquer texto -> Text */
/* Marker popup -> Marker callout */
/* Tooltip true -> callout do zero */
/* Callout anchor -> onde o callout vai aparecer */
/* Qualquer elemento tem display flex, direction column */

export default function App() {

  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
    nunito700: Nunito_700Bold,
    Nunito_800ExtraBold
  })

  if (!fontsLoaded) {
    return null
  }
  return (<Routes />)

}

