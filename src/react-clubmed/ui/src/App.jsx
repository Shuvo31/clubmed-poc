import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ClubMedMap from './components/ClubMedMap';
import ResortDetails from './components/ResortDetails';
import FamilyResorts from './components/FamilyResorts';
import { useClubMedData } from './data/locations';

function App() {
  const { locations, loading } = useClubMedData();
  const [selectedDest, setSelectedDest] = useState(null);

  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-white">
        <h2 className="text-2xl font-black tracking-tight mb-2">Loading Club Med Destinations...</h2>
        <p className="text-gray-500">Please make sure the local python API is running via local_dev_api.py</p>
      </div>
    );
  }

  return (
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
                />
              ) : (
                <ClubMedMap locations={locations} onSelectLocation={(loc) => setSelectedDest(loc)} />
              )}
            </>
          }
        />
        <Route path="/family" element={<FamilyResorts locations={locations} onSelectLocation={setSelectedDest} />} />
      </Routes>
    </Router>
  );
}

export default App;
