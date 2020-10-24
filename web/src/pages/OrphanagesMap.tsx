import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"

import mapIcon from "../utils/mapIcon"
import mapMarkerImg from "../images/map-marker.svg"
import { FiPlus, FiArrowRight } from "react-icons/fi"

import { Map, TileLayer, Marker, Popup } from "react-leaflet"

import api from "../services/api"

import "../styles/pages/orphanages-map.css"

interface Orphanage {
    id: string
    name: string
    latitude: number
    longitude: number
}

function OrphanagesMap() {
    /* O que usar, quando os valores de um vetor mudarem */

    /* State -> dados que são alterados pelo própio componente */

    /* Cria o componete */
    const [orphanages, setOrphanages] = useState<Orphanage[]>([])

    console.log(orphanages)

    useEffect(() => { /* Quando roda isso daqui, renderiza o componente denovo */
        api.get("orphanages").then(res => {
            setOrphanages(res.data) /* Faz o get na api e muda troca o valor */
        })
    }, [])

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy" />
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>São José dos Campos</strong>
                    <span>São Paulo</span>
                </footer>
            </aside>
            <Map
                center={[-23.1891287, -46.0031]}
                zoom={15}
                style={{ width: "100%", height: "100%" }}
            >
                {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/> */}
                <TileLayer
                    url={`https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                {
                    orphanages.map(orphanage => {
                        return (
                            <Marker
                                position={[orphanage.latitude, orphanage.longitude]}
                                icon={mapIcon}
                                key={orphanage.id}>
                                <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                    {orphanage.name}
                                    <Link to={`/orphanages/${orphanage.id}`}>
                                        <FiArrowRight size={20} color="#FFF" />
                                    </Link>
                                </Popup>
                            </Marker>
                        )
                    })
                }
            </Map>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>
    );
}

export default OrphanagesMap;