import { useRef, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import ResortCard from './ResortCard';

const customIcon = new L.DivIcon({
  html: `<div style="background-color: #FFC000; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">
          <div style="font-size: 18px; font-weight: 800; color: black; line-height: 1;">ψ</div>
         </div>`,
  className: '',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

export default function ClubMedMap({ locations, onSelectLocation }) {
  const mapRef = useRef();
  const carouselRef = useRef();
  const intervalRef = useRef(null);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    // Escape logic is now handled implicitly by the browser native fullscreen API and state in App.jsx
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('wheel', handleWheel, { passive: false });
      return () => carousel.removeEventListener('wheel', handleWheel);
    }
  }, []);

  const handleMouseEnter = () => {
    isHoveringRef.current = true;
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    isHoveringRef.current = false;
    startAutoScroll();
  };

  const handleWheel = (e) => {
    if (carouselRef.current) {
      // Only handle wheel when over carousel
      e.preventDefault();
      const scrollAmount = e.deltaY > 0 ? 100 : -100;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Helper component to smoothly center on clicked marker
  function FlyToLocation({ loc }) {
    const map = useMap();
    return (
      <div
        onClick={() => map.flyTo([loc.lat, loc.lng], 6, { duration: 1.5 })}
        className="absolute inset-0 z-10"
      />
    );
  }

  return (
    <div
      className="relative w-full h-[100vh]"
    >
      <MapContainer
        center={[30, 0]}
        zoom={3}
        scrollWheelZoom={true}
        className="w-full h-full"
        zoomControl={false}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        {locations && locations.map((loc) => (
          <Marker
            key={loc.id}
            position={[loc.lat, loc.lng]}
            icon={customIcon}
            eventHandlers={{
              click: () => onSelectLocation(loc)
            }}
          />
        ))}
      </MapContainer>

      {/* Carousel overlay */}
      <div
        ref={carouselRef}
        className="absolute bottom-8 w-full z-[1000] overflow-x-auto pt-4 pb-4 px-6 md:px-12 snap-x no-scrollbar"
        style={{ scrollBehavior: 'smooth' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex gap-4 w-max items-center pb-2">
          {locations && locations.map((loc) => (
            <ResortCard key={loc.id} loc={loc} onClick={onSelectLocation} />
          ))}
        </div>
      </div>
    </div>
  );
}