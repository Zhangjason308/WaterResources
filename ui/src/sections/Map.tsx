import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const center = {
  lat: 45.4215, // Ottawa coordinates
  lng: -75.6972,
};

export default function Map() {
  return (
    <div style={{ height: '100%', width: '100%', border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
      <MapContainer
        style={{ height: '100%', width: '100%' }}
        center={center}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center}>
          <Popup>
            Ottawa, ON. <br /> Capital of Canada.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}