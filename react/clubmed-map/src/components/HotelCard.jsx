import React from 'react';

const HotelCard = ({ hotel, isSelected, onClick, isCarousel = false }) => {
  const cardStyle = isCarousel
    ? { ...styles.carouselCard, ...(isSelected ? styles.carouselCardSelected : {}) }
    : { ...styles.card, ...(isSelected ? styles.cardSelected : {}) };

  const contentStyle = isCarousel ? styles.carouselContent : styles.content;

  return (
    <div
      style={cardStyle}
      onClick={onClick}
    >
      <div style={styles.imageWrapper}>
        <img
          src={hotel.image}
          alt={hotel.name}
          style={styles.image}
        />
      </div>

      <div style={contentStyle}>
        <div style={styles.priceSection}>
          <span style={styles.price}>€{hotel.basePrice.toLocaleString('en-IN')}</span>
          <span style={styles.currency}>per night</span>
        </div>

        <h3 style={styles.name}>{hotel.name}</h3>

        <div style={styles.ratingRow}>
          <span style={styles.rating}>★ {hotel.rating}</span>
          <span style={styles.type}>{hotel.region}</span>
        </div>

        <p style={styles.address}>{hotel.country}</p>
      </div>
    </div>
  );
};

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '10px',
    borderRadius: '20px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.08)',
  },
  cardSelected: {
    border: '1px solid #0066ff',
    boxShadow: '0 4px 16px rgba(0, 102, 255, 0.15)',
  },
  carouselCard: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: '20px',
    backgroundColor:'rgba(255, 255, 255, 0.8)',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  carouselCardSelected: {
    border: '2px solid #0066ff',
    boxShadow: '0 8px 24px rgba(0, 102, 255, 0.25)',
    transform: 'translateY(-4px)'
  },
  imageWrapper: {
    width: '110px',
    height: '110px',
    borderRadius: '20px',
    flexShrink: 0,
    overflow: 'hidden',
    background: '#e0e0e0'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease'
  },
  content: {
    flex: 1,
    padding: '10px 12px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minWidth: 0,
    gap: '4px'
  },
  carouselContent: {
    flex: 1,
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minWidth: 0
  },
  priceSection: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '4px',
    marginBottom: '2px'
  },
  price: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#1a1a1a'
  },
  currency: {
    fontSize: '10px',
    color: '#999',
    fontWeight: '500'
  },
  name: {
    margin: '0',
    fontSize: '12px',
    fontWeight: '600',
    color: '#1a1a1a',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: 1.3
  },
  ratingRow: {
    display: 'flex',
    gap: '6px',
    fontSize: '10px',
    alignItems: 'center'
  },
  rating: {
    color: '#ff9800',
    fontWeight: '600',
    whiteSpace: 'nowrap'
  },
  type: {
    color: '#999',
    backgroundColor: '#f0f0f0',
    padding: '2px 5px',
    borderRadius: '2px',
    fontSize: '10px',
    whiteSpace: 'nowrap'
  },
  address: {
    margin: 0,
    fontSize: '10px',
    color: '#999',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: 1.2
  }
};

export default HotelCard;
