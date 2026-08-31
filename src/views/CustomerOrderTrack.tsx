import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import api from '../api.ts';
import { initSocket } from '../socket.ts';

const deliveryIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const customerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface LocationPoint {
  id: string;
  latitude: number;
  longitude: number;
  recordedAt: string;
}

interface TrackingResponse {
  orderId: string;
  delivery: {
    status: string;
    assignedDeliveryBoy?: {
      name: string;
      deliveryBoyCode: string;
    };
    locations: LocationPoint[];
  };
  shippingAddress: {
    latitude?: number;
    longitude?: number;
    city: string;
    state: string;
    postalCode: string;
  };
  status: string;
}

export function CustomerOrderTrack() {
  const { id } = useParams();
  const [tracking, setTracking] = useState<TrackingResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const socketRef = useRef(initSocket());

  useEffect(() => {
    if (!id) return;

    async function load() {
      try {
        const response = await api.get<TrackingResponse>(`/api/orders/${id}/tracking`);
        setTracking(response.data);
      } catch {
        setError('Unable to load tracking information.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  useEffect(() => {
    if (!id) return;

    const socket = socketRef.current;
    if (!socket) return;

    const joinRoom = () => {
      socket.emit('joinOrder', id);
    };

    if (socket.connected) {
      joinRoom();
    } else {
      socket.on('connect', joinRoom);
    }

    const handleLocationUpdate = (payload: { orderId: string; deliveryId: string; location: LocationPoint }) => {
      if (payload.orderId !== id) return;
      setTracking((current) => {
        if (!current) return current;
        const updatedLocations = current.delivery.locations.some((loc) => loc.id === payload.location.id)
          ? current.delivery.locations
          : [...current.delivery.locations, payload.location];

        return {
          ...current,
          delivery: {
            ...current.delivery,
            locations: updatedLocations,
          },
        };
      });
    };

    const handleStatusUpdate = (payload: { orderId: string; deliveryId: string; status: string }) => {
      if (payload.orderId !== id) return;
      setTracking((current) => current ? { ...current, delivery: { ...current.delivery, status: payload.status } } : current);
    };

    socket.on('deliveryLocationUpdated', handleLocationUpdate);
    socket.on('deliveryStatusUpdated', handleStatusUpdate);

    return () => {
      socket.off('connect', joinRoom);
      socket.off('deliveryLocationUpdated', handleLocationUpdate);
      socket.off('deliveryStatusUpdated', handleStatusUpdate);
    };
  }, [id]);

  const routePositions = useMemo(() => tracking?.delivery.locations.map((location) => [location.latitude, location.longitude] as [number, number]) ?? [], [tracking]);

  if (loading) return <p>Loading tracking information…</p>;
  if (error) return <p className="form-error">{error}</p>;
  if (!tracking) return <p>Tracking data not found.</p>;

  const latestLocation = tracking.delivery.locations[tracking.delivery.locations.length - 1];
  const center: [number, number] = latestLocation
    ? [latestLocation.latitude, latestLocation.longitude]
    : [tracking.shippingAddress.latitude ?? 26.2389, tracking.shippingAddress.longitude ?? 73.0243];

  return (
    <div>
      <div className="section-kicker">Live tracking</div>
      <h2>Order {tracking.orderId}</h2>
      <div className="tracking-summary">
        <div><strong>Status</strong><p>{tracking.status}</p></div>
        <div><strong>Delivery status</strong><p>{tracking.delivery.status}</p></div>
        <div><strong>Delivery boy</strong><p>{tracking.delivery.assignedDeliveryBoy?.name ?? 'Not assigned'}</p></div>
        <div><strong>Last updated</strong><p>{latestLocation ? new Date(latestLocation.recordedAt).toLocaleString() : 'No location yet'}</p></div>
      </div>
      <div className="map-card">
        <MapContainer center={center} zoom={13} style={{ minHeight: '420px', borderRadius: '18px' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {tracking.shippingAddress.latitude && tracking.shippingAddress.longitude && (
            <Marker position={[tracking.shippingAddress.latitude, tracking.shippingAddress.longitude]} icon={customerIcon}>
              <Popup>Delivery destination</Popup>
            </Marker>
          )}
          {routePositions.length > 0 && (
            <>
              <Polyline positions={routePositions} color="orange" />
              <Marker position={routePositions[routePositions.length - 1]} icon={deliveryIcon}>
                <Popup>Delivery boy current location</Popup>
              </Marker>
            </>
          )}
        </MapContainer>
      </div>
    </div>
  );
}
