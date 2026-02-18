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
    position: 'fixed',
    bottom: '0',
    width: '100%',
    padding: '16px 12px 12px 12px',
    zIndex: 100,
    animation: 'slideUp 0.4s ease-out',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    // justifyContent: 'space-between',
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
    background: 'rgba(0, 0, 0, 0.05)',
    padding: '4px 8px',
    borderRadius: '12px'
  },
  count: {
    fontSize: '12px',
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
  },
  cardWrapper: {
    flexShrink: 0,
    width: '280px',
    // height: '220px'
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
