import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet"
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";




const Map = ({lat, lng}) => {

	delete L.Icon.Default.prototype._getIconUrl;

	L.Icon.Default.mergeOptions({
	  iconRetinaUrl: markerIcon2x,
	  iconUrl: markerIcon,
	  shadowUrl: markerShadow,
	});

	/*delete L.Icon.Default.prototype._getIconUrl;

	L.Icon.Default.mergeOptions({
	  iconRetinaUrl: "https://unpkg.com/leaflet/dist/images/marker-icon-2x.png",
	  iconUrl: "https://unpkg.com/leaflet/dist/images/marker-icon.png",
	  shadowUrl: "https://unpkg.com/leaflet/dist/images/marker-shadow.png",
	});*/
	return(
		<MapContainer center={[lat, lng]} zoom={20} style={{height: "400px", width: "100%"}}>
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

			<Marker position={[lat, lng]}>
				<Popup>
					Your are here
				</Popup>				
			</Marker>
		</MapContainer>
	);
}
export default Map;