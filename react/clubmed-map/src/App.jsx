import React, { useState, useCallback, useMemo, useEffect } from "react";
import MapView from "./components/MapView";
import HotelSidebar from "./components/HotelSidebar";
import HotelCarousel from "./components/HotelCarousel";
import DetailPanel from "./components/DetailPanel";
import { fetchHotels } from "./api/clubmed";
import "./styles/App.css";

export default function App() {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [mapBounds, setMapBounds] = useState(null);
  const [isDetailView, setIsDetailView] = useState(false);

  // NEW: API state
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load hotels once on mount (static mock data from API)
  useEffect(() => {
    const ac = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError("");

        const data = await fetchHotels({ limit: 200 }, ac.signal);
        const list = data?.hotels || [];
        setHotels(list);

        // Set initial selection (optional)
        if (!selectedHotel && list.length > 0) {
          setSelectedHotel(list[0]);
        }
      } catch (e) {
        setError(e?.message || "Failed to load hotels");
      } finally {
        setLoading(false);
      }
    })();

    return () => ac.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filter hotels based on current map bounds (same logic you had)
  const filteredHotels = useMemo(() => {
    if (!mapBounds) return hotels;
    return hotels.filter((hotel) => {
      const [lng, lat] = hotel.coordinates;
      return (
        lng >= mapBounds.minX &&
        lng <= mapBounds.maxX &&
        lat >= mapBounds.minY &&
        lat <= mapBounds.maxY
      );
    });
  }, [mapBounds, hotels]);

  const handleHotelSelect = useCallback((hotel) => {
    setSelectedHotel(hotel);
    setIsDetailView(true);
  }, []);

  const handleMarkerClick = useCallback((hotel) => {
    setSelectedHotel(hotel);
    setIsDetailView(true);
  }, []);

  const handleMapMove = useCallback((bounds) => {
    setMapBounds(bounds);
  }, []);

  const handleDetailClose = useCallback(() => {
    setIsDetailView(false);
  }, []);

  // Simple overlay states (non-invasive)
  const overlay = useMemo(() => {
    if (loading) return <div style={styles.overlay}>Loading resorts…</div>;
    if (error) return <div style={styles.overlayError}>API error: {error}</div>;
    return null;
  }, [loading, error]);

  return (
    <div style={styles.container}>
      {overlay}

      {isDetailView ? (
        <div style={styles.detailViewContainer}>
          <HotelSidebar
            hotels={filteredHotels}
            selectedHotelId={selectedHotel?.id}
            onHotelSelect={handleHotelSelect}
            visibleCount={filteredHotels.length}
          />
          <div style={{ flex: 1, position: "relative" }}>
            <MapView
              hotels={hotels}
              filteredHotels={filteredHotels}
              selectedHotel={selectedHotel}
              onMarkerClick={handleMarkerClick}
              onMapMove={handleMapMove}
            />
          </div>
          <DetailPanel hotel={selectedHotel} onClose={handleDetailClose} />
        </div>
      ) : (
        <div style={styles.defaultViewContainer}>
          <MapView
            hotels={hotels}
            filteredHotels={filteredHotels}
            selectedHotel={selectedHotel}
            onMarkerClick={handleMarkerClick}
            onMapMove={handleMapMove}
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
    width: "100vw",
    height: "100vh",
    background: "#fff",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    position: "relative",
  },
  detailViewContainer: {
    display: "flex",
    width: "100%",
    height: "100%",
    position: "relative",
    overflow: "hidden",
  },
  defaultViewContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  overlay: {
    position: "absolute",
    top: 12,
    left: 12,
    zIndex: 9999,
    padding: "10px 12px",
    background: "rgba(255,255,255,0.92)",
    border: "1px solid #e6e6e6",
    borderRadius: 10,
    fontWeight: 600,
    fontSize: 13,
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  },
  overlayError: {
    position: "absolute",
    top: 12,
    left: 12,
    zIndex: 9999,
    padding: "10px 12px",
    background: "rgba(255,245,245,0.95)",
    border: "1px solid #ffcccc",
    borderRadius: 10,
    fontWeight: 700,
    fontSize: 13,
    color: "#b00020",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    maxWidth: 520,
  },
};
