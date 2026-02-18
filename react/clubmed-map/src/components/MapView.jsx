import React, { useState, useCallback, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom marker icon for hotels - professional design
const createHotelMarker = (hotel, isSelected) => {
  const brandMap = {
    "Club Med": { color: "#FF6B35", label: "CM" },
    Ibis: { color: "#FF8C42", label: "ibis" },
    Accor: { color: "#0066FF", label: "Accor" },
    Oberoi: { color: "#8B4513", label: "Oberoi" },
    Taj: { color: "#1B5E20", label: "Taj" },
    Hyatt: { color: "#2E7D32", label: "Hyatt" },
    "JW Marriott": { color: "#1565C0", label: "JW" },
    Renaissance: { color: "#C62828", label: "Ren" },
    Sofitel: { color: "#004D99", label: "Sofitel" },
    Intercontinental: { color: "#B71C1C", label: "IHG" },
    ITC: { color: "#F57F17", label: "ITC" },
    "The Westin": { color: "#00796B", label: "Westin" },
  };

  let brand = { color: "#0066FF", label: "Hotel" };
  for (const [key, value] of Object.entries(brandMap)) {
    if (hotel.name.includes(key)) {
      brand = value;
      break;
    }
  }

  const priceDisplay = "€" + hotel.basePrice.toLocaleString("en-IN");

  const html = `
    <div style="
      display: flex;
      flex-direction: column;
      align-items: center;
    ">
      <div style="
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 6px 14px;
        background: ${isSelected ? brand.color : "rgba(255, 255, 255, 0.75)"};
        color: ${isSelected ? "#ffffff" : "#1a1a1a"};
        border: 1.5px solid ${isSelected ? brand.color : "#e0e0e0"};
        border-radius: 20px;
        box-shadow: ${isSelected ? "0 4px 16px rgba(0,0,0,0.25)" : "0 2px 8px rgba(0,0,0,0.12)"};
        transform: scale(${isSelected ? 1.08 : 1});
        transition: all 0.25s ease;
        cursor: pointer;
        white-space: nowrap;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      ">
        <span style="
          font-size: 11px;
          font-weight: 600;
          opacity: ${isSelected ? "0.85" : "0.5"};
          text-transform: uppercase;
          letter-spacing: 0.5px;
        ">${brand.label}</span>
        <span style="
          font-size: 14px;
          font-weight: 800;
          letter-spacing: -0.3px;
        ">${priceDisplay}</span>
      </div>
      <div style="
        width: 0; height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 7px solid ${isSelected ? brand.color : "#ffffff"};
        margin-top: -1px;
        filter: drop-shadow(0 1px 2px rgba(0,0,0,0.1));
      "></div>
    </div>
  `;
  return L.divIcon({
    html: html,
    iconSize: [120, 48],
    iconAnchor: [60, 48],
    className: "hotel-marker",
  });
};

// Map controller component
const MapController = ({ selectedHotel }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedHotel && map) {
      map.flyTo(
        [selectedHotel.coordinates[1], selectedHotel.coordinates[0]],
        14,
        {
          duration: 2,
        },
      );
    }
  }, [selectedHotel, map]);

  return null;
};

const MapView = ({
  hotels,
  selectedHotel,
  onMarkerClick,
  onMapMove,
  filteredHotels,
}) => {
  const [popupInfo, setPopupInfo] = useState(null);
  const mapRef = useRef(null);

  const handleMapChange = useCallback(() => {
    if (mapRef.current) {
      try {
        const bounds = mapRef.current.getBounds();
        onMapMove({
          minX: bounds.getWest(),
          maxX: bounds.getEast(),
          minY: bounds.getSouth(),
          maxY: bounds.getNorth(),
        });
      } catch (err) {
        // Map not ready yet
      }
    }
  }, [onMapMove]);

  const handleMarkerClick = useCallback(
    (hotel) => {
      setPopupInfo(hotel);
      onMarkerClick(hotel);
    },
    [onMarkerClick],
  );

  return (
    <div style={styles.mapContainer}>
      <MapContainer
        center={[22.5726, 88.3639]}
        zoom={11}
        style={{ width: "100%", height: "100%" }}
        ref={mapRef}
        onMoveend={handleMapChange}
        onZoomend={handleMapChange}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapController selectedHotel={selectedHotel} />

        {filteredHotels.map((hotel) => (
          <Marker
            key={hotel.id}
            position={[hotel.coordinates[1], hotel.coordinates[0]]}
            icon={createHotelMarker(hotel, selectedHotel?.id === hotel.id)}
            eventHandlers={{
              click: () => handleMarkerClick(hotel),
            }}
          />
        ))}
      </MapContainer>

      {/* Info badge */}
      <div style={styles.infoBadge}>
        <span style={styles.infoText}>{filteredHotels.length} hotels</span>
      </div>
    </div>
  );
};

const styles = {
  mapContainer: {
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  infoBadge: {
    position: "absolute",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    padding: "10px 16px",
    borderRadius: "20px",
    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.15)",
    zIndex: 10,
  },
  infoText: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#1a1a1a",
  },
};

export default MapView;
