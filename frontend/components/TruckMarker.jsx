import {Marker, useMap} from "react-leaflet"
import {useEffect, useRef} from "react"
import "leaflet/dist/leaflet.css"
import L from "leaflet"


const TruckMarker = ( {location} ) => {
	const markerRef = useRef();
	const map = useMap();

	const truckIcon = new L.Icon({
		iconUrl: "/icons/t1.png",
		iconSize: [65, 65]
	});
	// if (!location) return null;

	useEffect( () => {
		// if (!location || !markerRef.current) return;

		markerRef.current.setLatLng([location.lat, location.lng]);
		map.panTo([location.lat, location.lng]);

	}, [location]);

	return (
		
			<Marker 
				ref={markerRef}
				position={[location.lat, location.lng]}
				icon={truckIcon}
			/>
	);
}
export default TruckMarker;