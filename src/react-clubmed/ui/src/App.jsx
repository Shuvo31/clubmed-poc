import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import ClubMedMap from './components/ClubMedMap';
import ResortDetails from './components/ResortDetails';
import FamilyResorts from './components/FamilyResorts';

function App() {
  const [selectedDest, setSelectedDest] = useState(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              {selectedDest ? (
                <ResortDetails
                  location={selectedDest}
                  onClose={() => setSelectedDest(null)}
                  onSelect={(loc) => setSelectedDest(loc)}
                />
              ) : (
                <ClubMedMap onSelectLocation={(loc) => setSelectedDest(loc)} />
              )}
            </>
          }
        />
        <Route path="/family" element={<FamilyResorts onSelectLocation={setSelectedDest} />} />
      </Routes>
    </Router>
  );
}

export default App;
