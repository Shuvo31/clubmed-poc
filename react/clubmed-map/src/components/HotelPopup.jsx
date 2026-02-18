import React from 'react';

const HotelPopup = ({ hotel, onClose }) => {
  if (!hotel) return null;

  return (
    <div style={styles.popupOverlay} onClick={onClose}>
      <div style={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeButton} onClick={onClose}>
          ✕
        </button>
        <img
          src={hotel.image}
          alt={hotel.name}
          style={styles.hotelImage}
        />
        <div style={styles.hotelInfo}>
          <h3 style={styles.hotelName}>{hotel.name}</h3>
          <div style={styles.ratingContainer}>
            <span style={styles.rating}>★ {hotel.rating}</span>
            <span style={styles.price}>€{hotel.basePrice.toLocaleString('en-IN')}</span>
          </div>
          <p style={styles.address}>{hotel.country} • {hotel.region}</p>
          <button style={styles.bookingButton} onClick={() => window.open(hotel.bookingUrl, '_blank')}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  popupOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    animation: 'fadeIn 0.3s ease-in-out'
  },
  popupContent: {
    background: '#fff',
    borderRadius: '12px',
    overflow: 'hidden',
    width: '90%',
    maxWidth: '500px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    animation: 'slideUp 0.3s ease-out'
  },
  closeButton: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    width: '36px',
    height: '36px',
    border: 'none',
    background: '#fff',
    borderRadius: '50%',
    fontSize: '20px',
    cursor: 'pointer',
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s ease'
  },
  hotelImage: {
    width: '100%',
    height: '280px',
    objectFit: 'cover',
    display: 'block'
  },
  hotelInfo: {
    padding: '20px'
  },
  hotelName: {
    margin: '0 0 12px 0',
    fontSize: '20px',
    fontWeight: '600',
    color: '#1a1a1a'
  },
  ratingContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px'
  },
  rating: {
    fontSize: '14px',
    color: '#ff6b35',
    fontWeight: '600'
  },
  price: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1a1a1a'
  },
  address: {
    margin: '0 0 16px 0',
    fontSize: '13px',
    color: '#666',
    lineHeight: '1.4'
  },
  bookingButton: {
    width: '100%',
    padding: '12px',
    background: '#0066ff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.2s ease'
  }
};

export default HotelPopup;
