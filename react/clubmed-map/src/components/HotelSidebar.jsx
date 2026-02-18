import React from "react";
import HotelCard from "./HotelCard";

const HotelSidebar = ({
  hotels,
  selectedHotelId,
  onHotelSelect,
  visibleCount,
}) => {
  return (
    <div style={styles.sidebar}>
      <div style={styles.header}>
        <div style={styles.headerTop}>
          <h2 style={styles.title}>Hotels</h2>
          <span style={styles.count}>{visibleCount}</span>
        </div>
        <p style={styles.subtitle}>in Kolkata</p>
      </div>

      <div style={styles.listContainer}>
        {hotels.length === 0 ? (
          <div style={styles.emptyState}>
            <p>No hotels found</p>
            <p style={{ fontSize: "12px", color: "#999" }}>
              Pan the map to see more
            </p>
          </div>
        ) : (
          hotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              isSelected={selectedHotelId === hotel.id}
              onClick={() => onHotelSelect(hotel)}
            />
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "360px",
    height: "100vh",
    background: "#fafbfc",
    borderRight: "1px solid #d0d0d0",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
  },
  header: {
    padding: "20px 16px",
    borderBottom: "1px solid #e0e0e0",
    background: "#ffffff",
  },
  headerTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "6px",
  },
  title: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "700",
    color: "#1a1a1a",
  },
  subtitle: {
    margin: 0,
    fontSize: "13px",
    color: "#999",
    fontWeight: "400",
  },
  count: {
    display: "inline-block",
    fontSize: "13px",
    background: "#e8e8e8",
    padding: "4px 8px",
    borderRadius: "12px",
    fontWeight: "600",
  },
  listContainer: {
    flex: 1,
    overflowY: "auto",
    padding: "12px",
    scrollBehavior: "smooth",
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    color: "#999",
    fontSize: "14px",
    textAlign: "center",
    padding: "20px",
  },
};

export default HotelSidebar;
