import { Heading } from '@clubmed/trident-ui/atoms/Heading/Heading';
import { Image } from '@clubmed/trident-ui/atoms/Image/Image';

export default function SidebarCard({ loc, isSelected, onClick }) {
  return (
    <div
      onClick={() => onClick(loc)}
      className={`p-3 rounded-2xl flex cursor-pointer transition-all duration-200 border bg-white ${
        isSelected ? "border-black border-[1.5px] shadow-[0_0_15px_rgba(0,0,0,0.1)]" : "border-transparent hover:border-gray-300"
      }`}
    >
      <Image src={loc.img} alt={loc.title} className="w-24 h-24 object-cover rounded-[14px] shrink-0" />
      <div className="ml-4 flex flex-col justify-start flex-1 py-1">
        {loc.tag ? (
          <span className="text-[10px] font-bold px-3 py-0.5 rounded-full w-max mb-1.5 border border-black text-black">
            {loc.tag}
          </span>
        ) : (
          <div className="h-6" />
        )}
        <Heading level={4} className="font-bold text-sm text-black leading-tight mb-0.5">{loc.title}</Heading>
        <p className="text-[11px] font-medium text-gray-800 mb-1">{loc.location}</p>
        <div className="flex items-center gap-1.5 mt-auto">
          <span className="text-[11px] font-bold text-gray-500">
            From {loc.oldPrice && <span className="text-[#E34032] line-through ml-0.5">{loc.oldPrice}</span>}
          </span>
          <span className="text-sm font-extrabold text-black tracking-tight">{loc.newPrice}</span>
        </div>
      </div>
    </div>
  );
}