export function getDistance(a, b) {
  const R = 6371000; // Earth radius in meters

  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLng = (b.lng - a.lng) * Math.PI / 180;

  const lat1 = a.lat * Math.PI / 180;
  const lat2 = b.lat * Math.PI / 180;

  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) *
    Math.sin(dLng / 2) ** 2;

  return 2 * R * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}


let lastPosition = null;

export function updateMarkerSmooth(marker, position) {
  const { latitude, longitude, accuracy } = position.coords;

  // ignore bad GPS
  if (accuracy > 25) return null;

  const current = { lat: latitude, lng: longitude };

  // first update
  if (!lastPosition) {
    marker.setLatLng([current.lat, current.lng]);
    lastPosition = current;
    return current;
  }

  const distance = getDistance(lastPosition, current);

  // ignore tiny movement
  if (distance < 5) return null;

  // smooth movement (simple interpolation)
  const smoothLat = lastPosition.lat + (current.lat - lastPosition.lat) * 0.2;
  const smoothLng = lastPosition.lng + (current.lng - lastPosition.lng) * 0.2;

  marker.setLatLng([smoothLat, smoothLng]);

  lastPosition = {
    lat: smoothLat,
    lng: smoothLng,
  };

  return lastPosition; // return for saving
}

let lastSentTime = 0;

export function shouldSendByTime(interval = 5000) {
  const now = Date.now();

  if (now - lastSentTime > interval) {
    lastSentTime = now;
    return true;
  }

  return false;
}


export async function sendToBackend(point, token) {
  try {
    await fetch(`${import.meta.env.VITE_BASE_URL}/api/truck-location`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        lat: point.lat,
        lng: point.lng,
      }),
    });
  } catch (err) {
    console.error("Send failed:", err);
  }
}

let lastSentPoint = null;

export function handleTracking(marker, position, token) {
  updateMarkerSmooth(marker, position);

  const rawPoint = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  };

  if (!lastSentPoint) {
    lastSentPoint = rawPoint;
  }

  const distanceMoved = getDistance(lastSentPoint, rawPoint);

  if (distanceMoved > 5 && shouldSendByTime(5000)) {
    sendToBackend(rawPoint, token);
    lastSentPoint = rawPoint;
  }
}