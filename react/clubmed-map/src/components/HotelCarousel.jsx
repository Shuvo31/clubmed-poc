import React, { useRef } from 'react';
import HotelCard from './HotelCard';

const HotelCarousel = ({ hotels, selectedHotelId, onHotelSelect, visibleCount }) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320; // Card width + margin
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div style={styles.carouselContainer}>
      <div style={styles.header}>
        <h3 style={styles.title}>Hotels in Kolkata</h3>

        <span style={styles.count}>{visibleCount}</span>
      </div>

      <div style={styles.carouselWrapper}>
        <button
          style={styles.scrollButton}
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          ‹
        </button>

        <div style={styles.scrollContainer} ref={scrollContainerRef}>
          {hotels.length === 0 ? (
            <div style={styles.emptyState}>
              <p>No hotels found</p>
            </div>
          ) : (
            hotels.map(hotel => (
              <div key={hotel.id} style={styles.cardWrapper}>
                <HotelCard
                  hotel={hotel}
                  isSelected={selectedHotelId === hotel.id}
                  onClick={() => onHotelSelect(hotel)}
                  isCarousel={true}
                />
              </div>
            ))
          )}
        </div>

        <button
          style={styles.scrollButton}
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          ›
        </button>
      </div>
    </div>
  );
};

const styles = {
  carouselContainer: {
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.98)',
    backdropFilter: 'blur(10px)',
    borderTop: '1px solid #e0e0e0',
    padding: '16px 12px 12px 12px',
    zIndex: 100,
    boxShadow: '0 -8px 24px rgba(0, 0, 0, 0.12)',
    animation: 'slideUp 0.4s ease-out',
    maxHeight: '280px',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
    paddingLeft: '8px',
    paddingRight: '8px',
    flexShrink: 0
  },
  title: {
    margin: 0,
    fontSize: '14px',
    fontWeight: '600',
    color: '#1a1a1a'
  },
  count: {
    fontSize: '12px',
    color: '#666',
    background: '#e8e8e8',
    padding: '4px 8px',
    borderRadius: '12px',
    fontWeight: '600'
  },
  carouselWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flex: 1,
    minHeight: 0
  },
  scrollContainer: {
    flex: 1,
    display: 'flex',
    gap: '12px',
    overflowX: 'auto',
    overflowY: 'hidden',
    scrollBehavior: 'smooth',
    paddingRight: '8px',
    minHeight: 0
  },
  scrollButton: {
    flexShrink: 0,
    width: '36px',
    height: '36px',
    background: '#ffffff',
    border: '1px solid #d0d0d0',
    borderRadius: '6px',
    fontSize: '18px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    color: '#666'
  },
  cardWrapper: {
    flexShrink: 0,
    width: '280px',
    height: '220px'
  },
  emptyState: {
    width: '100%',
    textAlign: 'center',
    color: '#999',
    fontSize: '14px',
    padding: '20px'
  }
};

export default HotelCarousel;
