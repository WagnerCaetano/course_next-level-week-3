import leaflet from "leaflet";
import MapMarkerImg from "../assets/img/map-marker.svg";

const mapIcon = leaflet.icon({
  iconUrl: MapMarkerImg,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

export default mapIcon;
