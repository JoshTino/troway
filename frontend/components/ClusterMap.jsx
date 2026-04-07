import {useState, useEffect} from "react"
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"
import TruckMarker from "/components/TruckMarker"
import "leaflet/dist/leaflet.css"
import "react-leaflet-cluster/dist/assets/MarkerCluster.css";
import "react-leaflet-cluster/dist/assets/MarkerCluster.Default.css";
import L from "leaflet"

import BASE_URL from "/constants/base-url"


const ClusterMap = ({ reports }) => {

	const [location, setLocation] = useState({lat: null, lng: null});

	const iconManager = (category) => {
		switch(category)  {
			case "Harzadous Waste":
				return new L.Icon({
					iconUrl: '/icons/harzadous-waste.png',
					iconSize: [50, 50]
				});
			break;
			case "Burning of Waste":
				return new L.Icon({
					iconUrl: '/icons/burning-waste.png',
					iconSize: [50, 50]
				});
			break;
			case "Overflowing Bin":
				return new L.Icon({
					iconUrl: '/icons/overflowing-bin.png',
					iconSize: [50, 50]
				});
			break;
			case "Plastic Pollution":
				return new L.Icon({
					iconUrl: '/icons/plastic-waste.png',
					iconSize: [50, 50]
				});
			break;
			default:
			return new L.Icon({
					iconUrl: '/icons/plastic-waste.png',
					iconSize: [50, 50]
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
		<MapContainer center={[9.9247, 8.8911]} maxBounds={[ [9.7, 8.8], [10.0, 9.2]]} maxBoundsViscosity={0.0} zoom={12.5} style={{width: "100%", height: "760px"}}>

			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
			<MarkerClusterGroup showCoverageOnHover={true}>
				{reports.map((report) => {
					return (
				<Marker position={[report.location.lat, report.location.lng]}>
					<Popup>
						<img className="shadow-lg" src={`${BASE_URL}/uploads/${report.file}`} />
						<p className="font-bold font-nunito text-lg">{report.category}</p>
						<button onClick={() => alert(`${report._id}`)} className="bg-green-500 font-nunito rounded-sm p-2 text-white">Resolved</button>
					</Popup>
				</Marker>
				);
				})}

			</MarkerClusterGroup>
			
				{location.lat && location.lng ? (
					<TruckMarker location={location} />
				) : (
					<p>Tracking</p>
				)}
		</MapContainer>

	);
}
export default ClusterMap;