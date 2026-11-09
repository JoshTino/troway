import {useState, useEffect, createContext ,useContext} from "react"
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"
import TruckMarker from "/components/TruckMarker"
import MultiTruckMarker from "/components/MultiTruckMarker"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "react-leaflet-cluster/dist/assets/MarkerCluster.css";
import "react-leaflet-cluster/dist/assets/MarkerCluster.Default.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import BASE_URL from "/constants/base-url"
import coords from "/data/coords"

import SuccessModal from "/components/SuccessModal"


const SuperAdminClusterMap = ({reports, trucks }) => {

	delete L.Icon.Default.prototype._getIconUrl;

	L.Icon.Default.mergeOptions({
	  iconRetinaUrl: markerIcon2x,
	  iconUrl: markerIcon,
	  shadowUrl: markerShadow,
	});


	const [location, setLocation] = useState({lat: null, lng: null});

	const iconManager = (status) => {
		switch(status)  {
			case "pending":
				return new L.Icon({
					iconUrl: '/icons/red.png',
					iconSize: [50, 45]
				});
			break;
			case "assigned":
				return new L.Icon({
					iconUrl: '/icons/yellow.png',
					iconSize: [30, 45]
				});
			break;
			case "cleared":
				return new L.Icon({
					iconUrl: '/icons/gray.png',
					iconSize: [50, 45]
				});
			break;
			default:
			return new L.Icon({
					iconUrl: '/icons/gray.png',
					iconSize: [50, 45]
				});

		}

	}


	useEffect( () => {
		//Getting coordinates of location to be passed into TruckMarker
		const watchId = navigator.geolocation.watchPosition(
			(position) => {
				setLocation({
					lat: position.coords.latitude,
					lng: position.coords.longitude
				});
			}, 

			(error) => {
				console.log(error);
			},

			{
				enableHighAccuracy: true,
				timeout: 10000,
				maximumAge: 0
			}
		);

		return () => navigator.geolocation.clearWatch(watchId);

	}, []);


	
	return (
		<MapContainer center={[9.0765, 7.3986]} maxBounds={[8.85, 7.15], [9.30, 7.65]} maxBoundsViscosity={0.0} zoom={12.5} style={{width: "100%", height: "760px"}}>
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
			<MarkerClusterGroup showCoverageOnHover={true}>
				{reports.map((report) => {
					
					return (
				<Marker icon={iconManager(report.status)} key={report._id} position={[report.location.lat, report.location.lng]}>
					<Popup>
						<img className="shadow-lg" src={`${BASE_URL}/uploads/${report.file}`} />
						<p className="font-bold font-nunito text-lg">{report.category}</p>
					</Popup>
				</Marker>
				);
				})}

			</MarkerClusterGroup>

				{trucks.map(truck => (
					<MultiTruckMarker 
						key={truck._id}
						location={{lat: truck.lat, lng: truck.lng}}
					/>
				))}
		</MapContainer>

	);
}
export default SuperAdminClusterMap;