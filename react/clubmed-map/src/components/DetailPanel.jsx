import React from 'react';

const DetailPanel = ({ hotel, onClose }) => {
  if (!hotel) return null;

  return (
    <div style={styles.detailPanel}>
      <button style={styles.closeButton} onClick={onClose} title="Close">
        ✕
      </button>

      <div style={styles.imageSection}>
        <img
          src={hotel.image}
          alt={hotel.name}
          style={styles.hotelImage}
        />
      </div>

      <div style={styles.content}>
        <h2 style={styles.hotelName}>{hotel.name}</h2>

        <div style={styles.metaInfo}>
          <div style={styles.ratingContainer}>
            <span style={styles.rating}>★ {hotel.rating}</span>
            <span style={styles.type}>Hotel 5 ⭐</span>
          </div>
        </div>

        <div style={styles.priceBox}>
          <span style={styles.priceLabel}>From</span>
          <span style={styles.priceValue}>₹{hotel.price.toLocaleString('en-IN')}</span>
          <span style={styles.perNight}>per night</span>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Location</h3>
          <p style={styles.address}>{hotel.address}</p>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Amenities</h3>
          <div style={styles.amenitiesList}>
            <span style={styles.amenity}>🛏️ Rooms</span>
            <span style={styles.amenity}>🍽️ Restaurant</span>
            <span style={styles.amenity}>🏊 Pool</span>
            <span style={styles.amenity}>📶 WiFi</span>
          </div>
        </div>

        <button style={styles.bookingButton}>
          View Details & Book
        </button>
      </div>
    </div>
  );
};

const styles = {
  detailPanel: {
    width: '400px',
    height: '100vh',
    background: '#ffffff',
    boxShadow: '-4px 0 16px rgba(0, 0, 0, 0.12)',
    zIndex: 200,
    display: 'flex',
    flexDirection: 'column',
    animation: 'slideInRight 0.4s ease-out',
    flexShrink: 0,
    borderLeft: '1px solid #e0e0e0',
    position: 'relative'
  },
  closeButton: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    width: '36px',
    height: '36px',
    border: '1px solid #e0e0e0',
    background: '#ffffff',
    borderRadius: '50%',
    fontSize: '20px',
    cursor: 'pointer',
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    color: '#666'
  },
  imageSection: {
    width: '100%',
    height: '220px',
    overflow: 'hidden',
    background: '#e0e0e0',
    flexShrink: 0
  },
  hotelImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block'
  },
  content: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column'
  },
  hotelName: {
    margin: '0 0 12px 0',
    fontSize: '22px',
    fontWeight: '700',
    color: '#1a1a1a'
  },
  metaInfo: {
    marginBottom: '16px'
  },
  ratingContainer: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center'
  },
  rating: {
    fontSize: '14px',
    color: '#ff6b35',
    fontWeight: '600'
  },
  type: {
    fontSize: '12px',
    color: '#666',
    background: '#f0f0f0',
    padding: '4px 10px',
    borderRadius: '4px'
  },
  priceBox: {
    background: '#f8faff',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '14px',
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  priceLabel: {
    fontSize: '11px',
    color: '#999',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '4px'
  },
  priceValue: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#0066ff',
    marginBottom: '2px'
  },
  perNight: {
    fontSize: '12px',
    color: '#999'
  },
  section: {
    marginBottom: '20px'
  },
  sectionTitle: {
    margin: '0 0 10px 0',
    fontSize: '13px',
    fontWeight: '700',
    color: '#1a1a1a',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  address: {
    margin: 0,
    fontSize: '13px',
    color: '#666',
    lineHeight: '1.6'
  },
  amenitiesList: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px'
  },
  amenity: {
    fontSize: '12px',
    color: '#666',
    background: '#f5f5f5',
    padding: '8px 12px',
    borderRadius: '6px',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  bookingButton: {
    marginTop: 'auto',
    padding: '14px 16px',
    background: '#0066ff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  }
};

export default DetailPanel;
