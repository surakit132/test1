import React from 'react';
import {  GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// กำหนดขนาดของแผนที่


// กำหนดตำแหน่งศูนย์กลางของแผนที่
const center = {
  lat: 13.7563, // ละติจูดของ New York City
  lng: 100.5018 // ลองจิจูดของ New York City
};
const markers = [
    {
      id: 1,
      position: { lat: 13.7563, lng: 100.5018 },
      label: 'Marker 1',
      icon: 'http://example.com/path/to/your/icon1.png'
      
    },
    {
      id: 2,
      position: { lat: 13.7600, lng: 100.5300 },
      label: 'Marker 2',
      icon: 'http://example.com/path/to/your/icon2.png'
    }
  ];

const MapPetSitter = () => {
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY}>
        
      <GoogleMap
        mapContainerClassName="w-full h-[812px]  rounded-[16px] lg:w-[850px] lg:h-[840px] "
        center={center}
        zoom={10}
        
      >
        { /* เพิ่ม Marker หรือ Components อื่นๆ ที่ต้องการลงในแผนที่ที่นี่ */ }
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            label={marker.label}
            icon={marker.icon}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default MapPetSitter;
