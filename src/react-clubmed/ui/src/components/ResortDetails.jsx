import SidebarCard from "./SidebarCard";
import ResortCard from "./ResortCard";
import ResortDetailContent from "./ResortDetailContent";

function ResortDetails({ locations, location, onClose, onSelect }) {
  if (!location) return null;

  return (
    <div className="w-full h-[100vh] bg-white flex flex-col overflow-hidden font-sans">
      {/* Top Navigation */}
      <header className="flex items-center justify-between px-4 md:px-6 py-4 shrink-0 relative border-b md:border-none border-gray-100">
        <button
          onClick={onClose}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-black flex items-center justify-center hover:bg-gray-100 z-10"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-xl md:text-2xl font-black flex items-center tracking-tight">
            Club Med <span className="text-2xl md:text-3xl font-serif font-medium leading-none ml-1 -mt-1">ψ</span>
          </div>
        </div>
      </header>

      {/* Main Layout Area */}
      <div className="flex flex-1 overflow-hidden bg-white px-2 md:px-6 pb-0 md:pb-6 gap-0 md:gap-8 flex-col lg:flex-row">

        {/* Sidebar: Resort List (Desktop only) */}
        <div className="w-[400px] bg-[#f3eee3] overflow-y-auto hidden lg:flex flex-col p-4 gap-4 shrink-0 rounded-[2rem]">
          {locations && locations.map((loc) => (
            <SidebarCard
              key={loc.id}
              loc={loc}
              isSelected={loc.id === location.id}
              onClick={onSelect}
            />
          ))}
        </div>

        {/* Dynamic Content Detail */}
        <div className="flex-1 overflow-y-auto w-full relative no-scrollbar">
          <ResortDetailContent location={location} />

          {/* Mobile Carousel / "Sidebar" Cards below content */}
          <div className="lg:hidden w-full overflow-x-auto pt-4 pb-6 px-4 snap-x flex gap-4 custom-scrollbar">
            {locations && locations.map((loc) => (
              <ResortCard
                key={loc.id}
                loc={loc}
                isSelected={loc.id === location.id}
                onClick={onSelect}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default ResortDetails;
