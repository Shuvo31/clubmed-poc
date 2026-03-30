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
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isFullscreen]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsFullscreen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!isFullscreen) return;

    // Leaflet needs an explicit resize when its container changes to `position: fixed`.
    // We run it after the browser paints to ensure the new size is measurable.
    let attempts = 0;
    const maxAttempts = 10;

    const tryInvalidate = () => {
      attempts += 1;
      const leafletMap = mapRef.current;
      if (leafletMap?.invalidateSize) {
        leafletMap.invalidateSize();
        return;
      }
      if (attempts < maxAttempts) window.setTimeout(tryInvalidate, 50);
    };

    const raf1 = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(tryInvalidate);
    });

    return () => window.cancelAnimationFrame(raf1);
  }, [isFullscreen]);

  const startAutoScroll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (carouselRef.current && !isHoveringRef.current) {
        const itemWidth = 336;

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
      className={
        isFullscreen
          ? "fixed inset-0 z-[2000] w-screen h-screen bg-white"
          : "relative w-full h-[100vh]"
      }
    >
      <button
        type="button"
        onClick={() => setIsFullscreen((v) => !v)}
        className="absolute top-4 right-4 z-[2100] rounded-full bg-white/90 border border-black/10 px-3 py-2 text-[13px] font-extrabold hover:bg-white shadow-sm"
      >
        {isFullscreen ? "Exit full screen" : "Full screen"}
      </button>
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