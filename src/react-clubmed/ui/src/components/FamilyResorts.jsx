import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CLUBMED_LOCATIONS } from '../data/locations';

const CircleIcon = ({ half }) => (
  <svg width="13" height="13" viewBox="0 0 14 14" className="block">
    <circle cx="7" cy="7" r="6" fill={half ? "transparent" : "#00a680"} stroke="#00a680" strokeWidth="2" />
    {half && (
      <path d="M7 1 A 6 6 0 0 0 7 13 Z" fill="#00a680" />
    )}
  </svg>
);

const familyResortIds = [1, 2, 13]; // La Caravelle, Punta Cana, Rio Das Pedras

export default function FamilyResorts({ onSelectLocation }) {
  const navigate = useNavigate();
  const resorts = CLUBMED_LOCATIONS.filter(resort => familyResortIds.includes(resort.id)).map(resort => ({
    ...resort,
    image: resort.img,
    price: resort.newPrice,
    oldPrice: resort.oldPrice,
    location: resort.location,
    ratingText: resort.ratingText || "4,3/5",
    reasons: [
      resort.reasonTitle,
      "Family-friendly resort,",
      "Create lasting memories..."
    ],
    tag: resort.tag
  }));

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <div className="w-full pt-4 md:pt-6 pl-4 md:pl-6 flex items-center gap-3">
        <div className="relative w-full h-10 md:h-12 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-xl md:text-2xl font-black flex items-center tracking-tight">
            Club Med <span className="text-2xl md:text-3xl font-serif font-medium leading-none ml-1 -mt-1">ψ</span>
          </div>
        </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-[1050px] w-full mx-auto pt-4 md:pt-8 pb-10 md:pb-16 flex flex-col items-center">
        <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-8 w-full overflow-x-auto snap-x px-4 md:px-6 custom-scrollbar pb-4 md:pb-0">
          {resorts.map((resort) => (
            <div key={resort.id} className="flex flex-col shrink-0 snap-center w-[85vw] md:w-full text-black max-w-[340px] md:max-w-none">
              {/* Image */}
              <div className="relative w-full aspect-square mb-3 md:mb-5">
                <img
                  src={resort.image}
                  alt={resort.title}
                  className="w-full h-full object-cover rounded-[16px] md:rounded-[24px]"
                />
                {resort.exclusive && (
                  <div className="absolute top-3 md:top-4 left-1/2 -translate-x-1/2 bg-white px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[9px] md:text-[11px] font-extrabold text-black flex items-center gap-1.5 md:gap-2 shadow-sm w-max tracking-wide">
                    <div className="w-[5px] h-[5px] md:w-[7px] md:h-[7px] bg-[#17203A] rotate-45 transform"></div>
                    With Exclusive Spaces
                  </div>
                )}
              </div>

              {/* Title & Location */}
              <h3 className="text-[18px] md:text-[22px] font-bold mb-1 md:mb-1.5 tracking-tight text-black">{resort.title}</h3>
              <div className="flex items-start gap-2 mb-3 md:mb-5 h-8 md:h-10">
                <span className="text-[13px] md:text-[15px] leading-snug whitespace-pre-line font-medium text-black">
                  {resort.location}
                </span>
                {resort.tag && (
                  <span className="border border-black rounded-[20px] px-2 md:px-2.5 py-[1px] text-[9px] md:text-[11px] font-bold mt-0.5">
                    {resort.tag}
                  </span>
                )}
              </div>

              {/* Price Area */}
              <div className="flex flex-col items-start min-h-[85px] mb-2">
                <div className="flex items-end gap-[6px]">
                  {resort.oldPrice && (
                    <span className="text-[#d32f2f] line-through decoration-[#d32f2f] decoration-2 font-bold text-[15px] mb-[18px]">
                      {resort.oldPrice}
                    </span>
                  )}
                  <div className="flex flex-col items-center">
                    <span className="text-[27px] font-bold border-b-[3px] border-black leading-none pb-0.5 px-0.5">
                      {resort.price}
                    </span>
                    <span className="text-[11px] font-semibold mt-1 text-black">
                      Total price
                    </span>
                  </div>
                </div>
                {resort.flightIncluded && (
                  <div className="bg-[#f0f2f5] text-[11px] font-bold px-2.5 py-1 rounded mt-3">
                    Flight included
                  </div>
                )}
              </div>

              {/* Rating Area */}
              <div className="flex items-center gap-2 mb-5">
                <span className="text-[13px] font-bold tracking-tight">{resort.ratingText}</span>
                <div className="w-[28px] h-[28px] rounded-full border border-gray-300 flex items-center justify-center overflow-hidden">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="black">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2.5-9c0 1.38-1.12 2.5-2.5 2.5S4.5 12.38 4.5 11s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5zm7 0c0 1.38-1.12 2.5-2.5 2.5S11.5 12.38 11.5 11s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5zm-5.5 3.5l1.5 2h2l1.5-2h-5z"/>
                  </svg>
                </div>
                <div className="flex gap-[3px] ml-0.5">
                  <CircleIcon />
                  <CircleIcon />
                  <CircleIcon />
                  <CircleIcon />
                  <CircleIcon half />
                </div>
              </div>

              {/* Reasons to go */}
              <div>
                <h4 className="text-[13px] font-extrabold mb-3">The Best reasons to go:</h4>
                <ul className="text-[13px] font-medium space-y-[5px] ml-4 list-disc marker:text-black">
                  {resort.reasons.map((r, i) => (
                    <li key={i} className="pl-1 tracking-tight leading-snug">{r}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Button */}
        <button
          onClick={() => {
            onSelectLocation(resorts[0]);
            navigate('/');
          }}
          className="mt-[70px] px-8 py-3.5 border-[1.5px] border-black text-black text-[14px] font-extrabold rounded-full hover:bg-gray-50 transition-colors w-max"
        >
          See all resorts
        </button>
      </div>
    </div>
  );
}