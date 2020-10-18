import React from "react"

import { NavigationContainer } from "@react-navigation/native" /* Funciona como o browser router do react web */
import { createStackNavigator } from "@react-navigation/stack"

const { Navigator, Screen } = createStackNavigator()

import OrphanagesMap from "../pages/OphanagesMap"

export default function Routes() {
    return (
        <NavigationContainer>
            <Navigator>
                <Screen name="OrphanagesMap" component={OrphanagesMap}/>
            </Navigator>
        </NavigationContainer>
    )
}