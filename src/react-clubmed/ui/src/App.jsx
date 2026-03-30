import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ClubMedMap from './components/ClubMedMap';
import ResortDetails from './components/ResortDetails';
import FamilyResorts from './components/FamilyResorts';
import { useClubMedData } from './data/locations';

function App() {
  const { locations, loading } = useClubMedData();
  const [selectedDest, setSelectedDest] = useState(null);

  const appRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (appRef.current?.requestFullscreen) {
        appRef.current.requestFullscreen().catch((err) => {
          console.warn("Fullscreen blocked by iframe. Opening in new tab instead.", err);
          window.open(window.location.href, '_blank');
        });
      } else {
        window.open(window.location.href, '_blank');
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-white">
        <h2 className="text-2xl font-black tracking-tight mb-2">Loading Club Med Destinations...</h2>
        <p className="text-gray-500">Please make sure the local python API is running via local_dev_api.py</p>
      </div>
    );
  }

  return (
    <div ref={appRef} className="relative w-full h-[100vh]">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {selectedDest ? (
                  <ResortDetails
                    locations={locations}
                    location={selectedDest}
                    onClose={() => setSelectedDest(null)}
                    onSelect={(loc) => setSelectedDest(loc)}
                    isFullscreen={isFullscreen}
                    toggleFullscreen={toggleFullscreen}
                  />
                ) : (
                  <ClubMedMap
                    locations={locations}
                    onSelectLocation={(loc) => setSelectedDest(loc)}
                    isFullscreen={isFullscreen}
                    toggleFullscreen={toggleFullscreen}
                  />
                )}
              </>
            }
          />
          <Route path="/family" element={<FamilyResorts locations={locations} onSelectLocation={setSelectedDest} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
