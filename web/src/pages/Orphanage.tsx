//Parei aqui https://youtu.be/eVTmT1g9bmg?t=3584

/* 
AVISO -> Algumas imagens não conseguem aparecer, talvez por causa disso 
https://discord.com/channels/747891188492664934/747891188941717655/765905637996625940
*/

import React, { useEffect, useState } from "react";
/* import { FaWhatsapp } from "react-icons/fa"; */
import { FiClock, FiInfo, } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useParams } from 'react-router-dom'

import mapIcon from "../utils/mapIcon"

import '../styles/pages/orphanage.css';
import Sidebar from "../components/sidebar/index";
import api from "../services/api";

interface Orphanage {
  name: string
  latitude: number
  longitude: number
  description: string
  instructions: string
  opening_hours: string
  open_on_weekends: boolean
  images: Array<{
    url: string,
  }>
}

interface OrphanageParams {
  id: string
}

export default function Orphanage() {
  const { id } = useParams<OrphanageParams>()

  const [activeImageIndex, setActiveImageIndex] = useState(0) /* A imagem ativa sempre será a primeira */

  const [orphanage, setOrphanage] = useState<Orphanage>()
  useEffect(() => { /* Quando roda isso daqui, renderiza o componente denovo */
    api.get(`orphanages/${id}`).then(res => {
      setOrphanage(res.data) /* Faz o get na api e muda troca o valor */
    })
  }, [id])

  if (!orphanage) {
    return (
      <p>Carregando...</p>
    )
  }

  return (
    <div id="page-orphanage">
      <Sidebar />
      <main>
        <div className="orphanage-details">
          {/* Pega a imagem ativa pelo índice dela, que é trocado baseado em onde o usuário clicou */}
          <img src={orphanage.images[activeImageIndex].url} alt={orphanage.name} />

          <div className="images">
            {orphanage.images.map((img, index) => /* Itera cada imagem e gera uma imagem botão */
              <button
                /* Se ela for a imagem ativa, coloca a classe de ativa */
                className={activeImageIndex === index ? "active" : ""}

                type="button"

                /* Se clicar na imagem botão, a imagem dele vira a ativa */
                onClick={() => { setActiveImageIndex(index) }}
              >
                <img src={img.url} alt={orphanage.name} />
              </button>
            )}
          </div>

          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.description}</p>

            <div className="map-container">
              <Map
                center={[orphanage.latitude, orphanage.longitude]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={mapIcon} position={[orphanage.latitude, orphanage.longitude]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.opening_hours}
              </div>
              {orphanage.open_on_weekends ?
                (<div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                Atendemos <br />
                fim de semana
                </div>
                ) : (
                  <div className="open-on-weekends dont-open">
                    <FiInfo size={32} color="#FF6690" />
                Não atendemos <br />
                fim de semana
                  </div>)
              }
            </div>

            {/* <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button> */}
          </div>
        </div>
      </main>
    </div>
  );
}