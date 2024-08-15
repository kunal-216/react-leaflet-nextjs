"use client"
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

const RecenterAutomatically = ({ latlng }) => {
    const map = useMap();
    useEffect(() => {
        if (latlng) {
            map.setView(latlng, map.getZoom(), {
                animate: true,
                pan: { duration: 1 },
            });
        }
    }, [latlng, map]);
    return null;
};

const Map = () => {
    const markers = [
        { position: [28.6139, 77.209], label: 'New Delhi' },
        { position: [19.076, 72.8777], label: 'Mumbai' },
        { position: [13.0827, 80.2707], label: 'Chennai' },
        { position: [22.5726, 88.3639], label: 'Kolkata' },
        { position: [12.9716, 77.5946], label: 'Bangalore' },
    ];

    const [selectedPosition, setSelectedPosition] = useState(null);

    const handleMarkerClick = (position) => {
        setSelectedPosition(position);
    };

    return (
        <MapContainer center={[20, 77]} zoom={5} style={{ height: '100vh', width: '100%' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers.map((marker, idx) => (
                <Marker key={idx} position={marker.position} eventHandlers={{ click: () => handleMarkerClick(marker.position) }}>
                    <Popup>{marker.label}</Popup>
                </Marker>
            ))}
            {selectedPosition && <RecenterAutomatically latlng={selectedPosition} />}
        </MapContainer>
    );
};

export default Map;
