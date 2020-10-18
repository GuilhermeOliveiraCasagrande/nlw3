import React from "react";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps"
import { Feather } from "@expo/vector-icons"

import mapMarker from "../images/map-marker.png" /* Sumiu o erro por causa do index.d.ts */
/* Png's de 3 tamanhos para celulares com desidades de pixels diferentes*/


export default function OphanagesMap() {
    return (
        <View style={styles.container}>
            <MapView style={styles.map} initialRegion={{
                latitude: -23.220442, longitude: -45.902776,
                latitudeDelta: 0.008, longitudeDelta: 0.008
            }} provider={PROVIDER_GOOGLE}>
                <Marker icon={mapMarker} coordinate={{
                    latitude: -23.220442, longitude: -45.902776
                }}
                    calloutAnchor={{
                        x: 2.7, y: 0.8
                    }}>
                    <Callout tooltip={true} onPress={() => { alert("redirecionando para página de detalhe") }}>
                        <View style={styles.calloutConainter}>
                            <Text style={styles.calloutText}>Orfanato supimpasso</Text>
                        </View>
                    </Callout>
                </Marker>
            </MapView>
            <View style={styles.footer}>
                <Text style={styles.footerText}>5 orfanatos encontrados</Text>
                <TouchableOpacity style={styles.createOrphangeButton}
                    onPress={() => { alert("Redirecionar para página de criar orfanato") }}>
                    <Feather name="plus" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
}


/* Cria os estilos como css em objetos js*/
/* display flex por padrão -> não precisa dizer que é pra ter */
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height
    },
    calloutConainter: {
        width: 160,
        height: 46,
        paddingHorizontal: 16,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: 16,
        justifyContent: "center"
    },
    calloutText: {
        color: "#0089a5",
        fontSize: 14,
        elevation: 3,
        fontFamily: "nunito700"
    },
    footer: {
        position: "absolute",
        left: 24,
        right: 24,
        bottom: 32,

        backgroundColor: "#FFF",
        borderRadius: 20,
        height: 56,
        paddingLeft: 24,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        elevation: 3
    },
    footerText: {
        color: "#8fa7b3",
        fontFamily: "nunito700"
    },
    createOrphangeButton: {
        width: 56,
        height: 56,
        backgroundColor: "#15c3d6",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center"
    }
});
