import React, { useState, useCallback, useMemo } from 'react';
import MapView from './components/MapView';
import HotelSidebar from './components/HotelSidebar';
import HotelCarousel from './components/HotelCarousel';
import DetailPanel from './components/DetailPanel';
import { hotelsData } from './data/hotels';
import './styles/App.css';

export default function App() {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [mapBounds, setMapBounds] = useState(null);
  const [isDetailView, setIsDetailView] = useState(false);

  // Filter hotels based on current map bounds
  const filteredHotels = useMemo(() => {
    if (!mapBounds) return hotelsData;

    return hotelsData.filter(hotel => {
      const [lng, lat] = hotel.coordinates;
      return (
        lng >= mapBounds.minX &&
        lng <= mapBounds.maxX &&
        lat >= mapBounds.minY &&
        lat <= mapBounds.maxY
      );
    });
  }, [mapBounds]);

  // Handle hotel selection from carousel or marker
  const handleHotelSelect = useCallback((hotel) => {
    setSelectedHotel(hotel);
    setIsDetailView(true);
  }, []);

  // Handle marker click
  const handleMarkerClick = useCallback((hotel) => {
    setSelectedHotel(hotel);
    setIsDetailView(true);
  }, []);

  // Handle map move - update visible bounds
  const handleMapMove = useCallback((bounds) => {
    setMapBounds(bounds);
  }, []);

  // Handle detail panel close
  const handleDetailClose = useCallback(() => {
    setIsDetailView(false);
  }, []);

  return (
    <div style={styles.container}>
      {isDetailView ? (
        // DETAIL VIEW: Split layout with sidebar and detail panel
        <div style={styles.detailViewContainer}>
          <HotelSidebar
            hotels={filteredHotels}
            selectedHotelId={selectedHotel?.id}
            onHotelSelect={handleHotelSelect}
            visibleCount={filteredHotels.length}
          />
          <MapView
            hotels={hotelsData}
            selectedHotel={selectedHotel}
            onMarkerClick={handleMarkerClick}
            onMapMove={handleMapMove}
            filteredHotels={filteredHotels}
          />
          <DetailPanel
            hotel={selectedHotel}
            onClose={handleDetailClose}
          />
        </div>
      ) : (
        // DEFAULT VIEW: Full map with bottom carousel
        <div style={styles.defaultViewContainer}>
          <MapView
            hotels={hotelsData}
            selectedHotel={selectedHotel}
            onMarkerClick={handleMarkerClick}
            onMapMove={handleMapMove}
            filteredHotels={filteredHotels}
          />
          <HotelCarousel
            hotels={filteredHotels}
            selectedHotelId={selectedHotel?.id}
            onHotelSelect={handleHotelSelect}
            visibleCount={filteredHotels.length}
          />
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    background: '#fff',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  },
  detailViewContainer: {
    display: 'flex',
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden'
  },
  defaultViewContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  }
};
