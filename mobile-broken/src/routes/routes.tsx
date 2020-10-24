import React from "react"

import { NavigationContainer } from "@react-navigation/native" /* Funciona como o browser router do react web */
import { createStackNavigator } from "@react-navigation/stack"

const { Navigator, Screen } = createStackNavigator()

/* NavigationContainer -> contêm o navegador */
/* Navigator -> troca de telas */
/* Screen -> contêm os componentes */

import OrphanagesMap from "../pages/OphanagesMap"
import OrphanageDetails from "../pages/OrphanageDetails"
import SelectMapPosition from "../pages/CreateOrphange/SelectMapPosition"
import OrphanageData from "../pages/CreateOrphange/OrphanageData"
import Header from "../components/Header"

export default function Routes() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: "#f2f3f5" } }}>
                <Screen name="OrphanagesMap" component={OrphanagesMap} />
                <Screen name="OrphanageDetails" component={OrphanageDetails} options={{
                    headerShown: true,
                    header: () => <Header showCancel={false} title="Orfanato" />
                }} />
                <Screen name="SelectMapPosition" component={SelectMapPosition} options={{
                    headerShown: true,
                    header: () => <Header title="Selecione no mapa" />
                }} />
                <Screen name="OrphanageData" component={OrphanageData} options={{
                    headerShown: true,
                    header: () => <Header title="Informe os dados" />
                }} />
            </Navigator>
        </NavigationContainer>
    )
}