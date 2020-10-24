import React from 'react';
import { useFonts } from "expo-font"
import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from "@expo-google-fonts/nunito"

import Routes from "./src/routes/routes"

/* Usa elementos do react-native, não html */
/* Qualquer elemento tem display flex, direction column */

export default function App() {

  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold
  })

  if (!fontsLoaded) {
    return null
  }
  return (<Routes />)

}

