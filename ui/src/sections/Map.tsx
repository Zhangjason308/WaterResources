import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function Map({ params }: { params: { event: string } }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 20px', // Add padding to prevent touching the edges
        height: '100vh',
      }}
    >
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>Event: {params.event}</div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '1200px', // Restrict the max width for centering
        }}
      >
        <div
          style={{
            height: '675px',
            width: '100%',
            maxWidth: '1000px', // Ensure the map width doesn't exceed the container
            border: '1px solid #ccc',
            borderRadius: '8px',
            overflow: 'hidden',
            margin: '0 auto', // Center horizontally
          }}
        >
          <MapContainer
            style={{ height: '100%', width: '100%' }}
            center={[45.4215, -75.6972]} // Ottawa coordinates
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[45.4215, -75.6972]}>
              <Popup>
                Ottawa, ON. <br /> Capital of Canada.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
