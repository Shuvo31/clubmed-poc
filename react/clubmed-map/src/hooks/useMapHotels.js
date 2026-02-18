import { useCallback, useMemo, useRef } from 'react';

// Helper function to check if point is within bounds
const isPointInBounds = (point, bounds) => {
  if (!bounds) return true;
  const [lng, lat] = point;
  return (
    lng >= bounds.minX &&
    lng <= bounds.maxX &&
    lat >= bounds.minY &&
    lat <= bounds.maxY
  );
};

// Custom hook for managing hotel map interactions
export const useMapHotels = (hotels) => {
  const mapRef = useRef(null);
  const boundsTimerRef = useRef(null);

  // Get visible hotels based on current map bounds
  const getVisibleHotels = useCallback((bounds) => {
    if (!bounds) return hotels;
    
    return hotels.filter(hotel => 
      isPointInBounds(hotel.coordinates, bounds)
    );
  }, [hotels]);

  // Check if hotel is in current bounds
  const isHotelVisible = useCallback((hotel, bounds) => {
    return isPointInBounds(hotel.coordinates, bounds);
  }, []);

  // Get map bounds in a normalized format
  const getMapBounds = useCallback(() => {
    if (!mapRef.current) return null;
    
    const bounds = mapRef.current.getBounds();
    return {
      minX: bounds.getWest(),
      maxX: bounds.getEast(),
      minY: bounds.getSouth(),
      maxY: bounds.getNorth()
    };
  }, []);

  // Fly to hotel location on map
  const flyToHotel = useCallback((hotel) => {
    if (!mapRef.current) return;
    
    mapRef.current.flyTo({
      center: hotel.coordinates,
      zoom: 14,
      duration: 2000,
      pitch: 0
    });
  }, []);

  // Debounced bounds update handler
  const debouncedBoundsUpdate = useCallback((callback) => {
    if (boundsTimerRef.current) {
      clearTimeout(boundsTimerRef.current);
    }
    
    boundsTimerRef.current = setTimeout(() => {
      const bounds = getMapBounds();
      callback(bounds);
    }, 300);
  }, [getMapBounds]);

  // Cleanup on unmount
  const cleanup = useCallback(() => {
    if (boundsTimerRef.current) {
      clearTimeout(boundsTimerRef.current);
    }
  }, []);

  return {
    mapRef,
    getVisibleHotels,
    isHotelVisible,
    getMapBounds,
    flyToHotel,
    debouncedBoundsUpdate,
    cleanup
  };
};
