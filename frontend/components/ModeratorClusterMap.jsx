import {useState, useEffect, createContext ,useContext} from "react"
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"
import TruckMarker from "/components/TruckMarker"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "react-leaflet-cluster/dist/assets/MarkerCluster.css";
import "react-leaflet-cluster/dist/assets/MarkerCluster.Default.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import BASE_URL from "/constants/base-url"

import SuccessModal from "/components/SuccessModal"


const ModeratorClusterMap = ({ reports, handleChange, handleSubmit }) => {

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
		<MapContainer center={[9.9247, 8.8911]} maxBounds={[ [9.7, 8.8], [10.0, 9.2]]} maxBoundsViscosity={0.0} zoom={12.5} style={{width: "100%", height: "760px"}}>
			{/*<SuccessModal 
				isOpen={showSuccessModal}
				onClose={() => setShowSuccessModal(false)}
				modalMessage={modalMessage}
			 />*/}
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
			<MarkerClusterGroup showCoverageOnHover={true}>
				{reports.map((report) => {
					
					return (
				<Marker icon={iconManager(report.status)} key={report._id} position={[report.location.lat, report.location.lng]}>
					<Popup>
						<img className="shadow-lg" src={`${BASE_URL}/uploads/${report.file}`} />
						<p className="font-bold font-nunito text-lg">{report.category}</p>
						<form onSubmit={handleSubmit} className="flex flex-col items-center gap-y-2">
							<span className="text-sm font-nunito font-light">Upload photo evidence of clean up</span>
							<input onChange={handleChange} name="file" type="file" accept="image/*" required className="text-sm text-stone-500 w-full file:mr-5 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-bold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 hover:file:cursor-pointer"/>
							<div className="">
								<button className="bg-green-500 font-nunito rounded-sm p-2 text-white cursor-pointer">Completed</button>
								{/*<button className="bg-yellow-500 font-nunito rounded-sm p-2 text-black">No able to clean up</button>*/}
							</div>
						</form>
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
export default ModeratorClusterMap;