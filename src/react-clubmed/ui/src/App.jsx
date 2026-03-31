import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ClubMedMap from './components/ClubMedMap';
import ResortDetails from './components/ResortDetails';
import FamilyResorts from './components/FamilyResorts';
import { useClubMedData } from './data/locations';

function App() {
  const { data, loading } = useClubMedData();
  const appRef = useRef(null);

  // The view ('map' or 'detail') is now controlled by the data
  // The selected resort is also directly available from the data

  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-white">
        <h2 className="text-2xl font-black tracking-tight mb-2">Loading Club Med UI...</h2>
        <p className="text-gray-500">Preparing resort data...</p>
      </div>
    );
  }

  const handleSelectLocation = (location) => {
    if (window.mcp) {
      // In the real MCP environment, call the tool
      window.mcp.callTool(
        "get_resort_details_ui",
        { resort_id: location.id },
        (response) => {
          console.log("Tool call response:", response);
        }
      );
    } else {
      // For local development, simulate the navigation by reloading the page
      // with the resort_id in the query string.
      console.warn("MCP context not available. Simulating view change for local dev.");
      window.location.href = `?resort_id=${location.id}`;
    }
  };

  const handleCloseDetails = () => {
    if (window.mcp) {
      window.mcp.callTool("get_clubmed_map_ui", {}, console.log);
    } else {
      // For local dev, just navigate back to the base URL
      window.location.search = "";
    }
  };

  return (
    <div ref={appRef} className="relative w-full h-[100vh]">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {data?.view === 'detail' && data.resort ? (
                  <ResortDetails
                    location={data.resort}
                    locations={data.allVillages}
                    onSelect={handleSelectLocation} // Allow selecting other resorts from detail view
                    onClose={handleCloseDetails}
                  />
                ) : (
                  <ClubMedMap
                    locations={data?.allVillages || []}
                    onSelectLocation={handleSelectLocation}
                  />
                )}
              </>
            }
          />
          {/* The /family route might need reconsideration in this new model */}
          <Route path="/family" element={<FamilyResorts locations={data?.allVillages || []} onSelectLocation={handleSelectLocation} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
