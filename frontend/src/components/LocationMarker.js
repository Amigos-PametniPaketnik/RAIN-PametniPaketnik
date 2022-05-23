import {useState} from "react";
import {useMapEvents, Marker, Popup} from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import {Icon} from 'leaflet';

function LocationMarker(props) {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        props.setlocation({lat: e.latlng.lat, lng: e.latlng.lng})
        map.flyTo(e.latlng, map.getZoom())
      },
    })
  
    return position === null ? null : (
      <Marker position={position} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}>
        <Popup>Tukaj si</Popup>
      </Marker>
    )
  }

export default LocationMarker;
