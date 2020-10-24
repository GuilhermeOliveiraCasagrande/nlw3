import React, { FormEvent, useState, ChangeEvent } from "react";
import { useHistory } from "react-router-dom";
import { FiPlus } from "react-icons/fi"

import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from "leaflet"

import Sidebar from "../components/sidebar/index"
import '../styles/pages/create-orphanage.css';
import mapIcon from "../utils/mapIcon"
import api from "../services/api";

export default function CreateOrphanage() {

  const [coordsMarker, setCoordsMarker] = useState({
    lat: 0,
    lon: 0
  })

  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [instructions, setInstructions] = useState('')
  const [opening_hours, setOpeningHours] = useState('')
  const [open_on_weekends, setOpenOnWeekends] = useState(true)
  const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng
    setCoordsMarker({ lat: lat, lon: lng })
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return

    /* Prepara os arquivos para enviar pelo form */
    const selectedImages = Array.from(event.target.files)
    setImages(selectedImages)

    /* Prepara o endereço de objeto para serem usados no preview */
    const selectedImagesPreview = selectedImages.map(img => {
      return URL.createObjectURL(img)
    })
    setPreviewImages(selectedImagesPreview)
  }
  const history = useHistory()

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    /* prepara para enviar os dados */
    const data = new FormData()
    data.append("name", name)
    data.append("latitude", coordsMarker.lat.toString())
    data.append("longitude", coordsMarker.lon.toString())
    data.append("about", about)
    data.append("instructions", instructions)
    data.append("opening_hours", opening_hours)
    data.append("open_on_weekends", open_on_weekends ? "true" : "false")
    images.forEach(img => {
      data.append("images", img)
    })

    await api.post("orphanages", data)

    alert("Cadastro realizado com sucesso!")

    history.push("/app")
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />
      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-23.223809, -45.901575]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {
                /* NO REACT: condição && ação */
                coordsMarker.lat !== 0 && (
                  <Marker
                    interactive={false}
                    icon={mapIcon}
                    position={[coordsMarker.lat, coordsMarker.lon]}
                  />
                )
              }
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} onChange={event => {
                setName(event.target.value)
              }} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" value={about} onChange={event => {
                setAbout(event.target.value)
              }} maxLength={300} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map((img, index) => <img key={index} src={img} alt={name} />)}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              {/* Pode enviar múltiplos arquivos */}
              <input multiple onChange={handleSelectImages} type="file" id="image[]" />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={instructions} onChange={event =>
                setInstructions(event.target.value)
              } />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input id="opening_hours" value={opening_hours} onChange={event =>
                setOpeningHours(event.target.value)
              } />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button"
                  className={open_on_weekends ? "active" : ""}
                  onClick={() => setOpenOnWeekends(true)}>Sim</button>

                <button type="button"
                  className={!open_on_weekends ? "active" : ""}
                  onClick={() => setOpenOnWeekends(false)}>Não</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
