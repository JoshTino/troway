import {Marker, useMap} from "react-leaflet"
import {useEffect, useRef} from "react"
import "leaflet-rotatedmarker"

import "leaflet/dist/leaflet.css"
import L from "leaflet"


const MultiTruckMarker = ({ location }) => {
	const markerRef = useRef();
	const prevLocationRef = useRef(null);
	const map = useMap();

	const truckIcon = new L.Icon({
		iconUrl: "/icons/green-truck.png",
		iconSize: [65, 65],
		iconAnchor: [32, 32] // VERY IMPORTANT (center rotation)
	});

	const getBearing = (start, end) => {
		if (!start || !end) return 0;

		const dx = end.lng - start.lng;
		const dy = end.lat - start.lat;

		return Math.atan2(dy, dx) * (180 / Math.PI);
	};

	useEffect(() => {
		if (!location || !markerRef.current) return;

		const marker = markerRef.current;

		// Move marker
		marker.setLatLng([location.lat, location.lng]);

		// Calculate direction
		const prev = prevLocationRef.current;
		const bearing = getBearing(prev, location);

		// Rotate marker
		if (marker.setRotationAngle) {
			marker.setRotationAngle(bearing);
		}

		// Save current as previous
		prevLocationRef.current = location;

	}, [location]);

	return (
		<Marker
			ref={markerRef}
			position={[location.lat, location.lng]}
			icon={truckIcon}
		/>
	);
};

export default MultiTruckMarker;