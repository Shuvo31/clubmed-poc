import { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { CLUBMED_LOCATIONS } from '../data/locations';
import ResortCard from './ResortCard';

const customIcon = new L.DivIcon({
  html: `<div style="background-color: #FFC000; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">
          <div style="font-size: 18px; font-weight: 800; color: black; line-height: 1;">ψ</div>
         </div>`,
  className: '',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

export default function ClubMedMap({ onSelectLocation }) {
  const mapRef = useRef();
  const carouselRef = useRef();
  const intervalRef = useRef(null);
  const isHoveringRef = useRef(false);

  const startAutoScroll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (carouselRef.current && !isHoveringRef.current) {
        const isMobile = window.innerWidth < 768;
        const itemWidth = isMobile ? 336 : 456; // Mobile: 320px + 16px gap, Desktop: 440px + 16px gap

        // Check if we reached the end
        if (
          carouselRef.current.scrollLeft + carouselRef.current.clientWidth >=
          carouselRef.current.scrollWidth - 10
        ) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          carouselRef.current.scrollBy({ left: itemWidth, behavior: 'smooth' });
        }
      }
    }, 3000); // Auto-scroll every 3 seconds
  };

  useEffect(() => {
    startAutoScroll();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    isHoveringRef.current = true;
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    isHoveringRef.current = false;
    startAutoScroll();
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
    <div className="relative w-full h-[100vh]">
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
        {CLUBMED_LOCATIONS.map((loc) => (
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
        className="absolute bottom-8 w-full z-[1000] overflow-x-auto no-scrollbar pt-4 pb-4 px-6 md:px-12 pointer-events-none snap-x"
        style={{ scrollBehavior: 'smooth' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex gap-4 w-max pointer-events-auto items-center pb-2">
          {CLUBMED_LOCATIONS.map((loc) => (
            <ResortCard key={loc.id} loc={loc} onClick={onSelectLocation} />
          ))}
        </div>
      </div>
    </div>
  );
}