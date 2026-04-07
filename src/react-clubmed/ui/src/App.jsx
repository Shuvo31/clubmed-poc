import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ClubMedMap from './components/ClubMedMap';
import ResortDetails from './components/ResortDetails';
import FamilyResorts from './components/FamilyResorts';
import { useClubMedData } from './data/locations';

function App() {
  const { locations, loading } = useClubMedData();
  const [selectedDest, setSelectedDest] = useState(null);

  const requestDisplayMode = async (mode) => {
    try {
      if (window.openai?.requestDisplayMode) {
        await window.openai.requestDisplayMode({ mode });
        return;
      }
    } catch {
      // Ignore bridge errors and fall through.
    }

    try {
      if (window.oai?.requestDisplayMode) {
        await window.oai.requestDisplayMode({ mode });
      }
    } catch {
      // Ignore bridge errors.
    }
  };

  const openDetails = (loc) => {
    setSelectedDest(loc);
    void requestDisplayMode("fullscreen");
  };

  const closeDetails = async () => {
    // Ask host to return to inline before swapping the UI back to map.
    await requestDisplayMode("inline");
    setSelectedDest(null);

    // Safety retry for host runtimes that apply mode changes asynchronously.
    window.setTimeout(() => {
      void requestDisplayMode("inline");
    }, 80);
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
    <div className="relative w-full h-[100vh]">
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
                    onClose={closeDetails}
                    onSelect={(loc) => setSelectedDest(loc)}
                  />
                ) : (
                  <ClubMedMap
                    locations={locations}
                    onSelectLocation={openDetails}
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
