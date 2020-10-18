import React, { useEffect, useState } from "react";
import { FiPlus, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./orphanagesMap.css";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import MapMarkerImg from "../../assets/img/map-marker.svg";
import mapIcon from "../../utils/mapIcon";
import api from "../../services/api";
import { OrphanageModel } from "../../model/Interfaces";

const OrphanagesMap = () => {
  let loading: boolean;
  const [orphanages, setOrphanages] = useState<OrphanageModel[]>([]);

  useEffect(() => {
    api.get("orphanages").then((response) => {
      if (response.status === 200) {
        setOrphanages(response?.data);
      }
    });
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={MapMarkerImg} alt="Happy" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Campinas</strong>
          <span>São Paulo</span>
        </footer>
      </aside>
      <Map
        center={[-22.9027095, -47.0235747]}
        zoom={11}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />

        {orphanages.map((orphanage) => {
          return (
            <Marker
              key={orphanage.id}
              icon={mapIcon}
              position={[orphanage.latitude, orphanage.longitude]}
            >
              <Popup
                className="map-popup"
                closeButton={false}
                minWidth={240}
                maxWidth={240}
              >
                {orphanage.name}
                <Link to={`orphanage/${orphanage.id}`}>
                  <FiArrowRight size={20} color="#FFF" />
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
};

export default OrphanagesMap;
