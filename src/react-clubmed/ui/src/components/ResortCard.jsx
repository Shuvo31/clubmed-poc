import { Heading } from '@clubmed/trident-ui/atoms/Heading/Heading';
import { Image } from '@clubmed/trident-ui/atoms/Image/Image';

export default function ResortCard({ loc, isSelected, onClick }) {
  return (
    <div
      onClick={() => onClick(loc)}
      className={`bg-white p-3 flex shadow-xl shadow-black/10 w-[320px] h-[130px] shrink-0 transform transition-all duration-300 cursor-pointer relative snap-start ${
        isSelected
          ? "border-2 border-black rounded-3xl"
          : "rounded-3xl hover:-translate-y-3 hover:shadow-2xl hover:shadow-black/20"
      }`}
    >
      {loc.img &&  <Image src={loc.img} alt={loc.title} className="w-[100px] h-[100px] object-cover rounded-xl shrink-0" />}
       <div className="ml-3 flex flex-col justify-between flex-1 py-0.5">
         <div className="flex flex-col gap-1">
          {loc.tag && (
            <span className="text-[9px] font-black px-2 py-[1px] rounded-full border-[1.5px] border-black w-max uppercase tracking-tight text-black">
              {loc.tag}
            </span>
          )}
          <Heading level={3} className="font-bold text-[14px] leading-tight text-black m-0 tracking-tight line-clamp-1">{loc.title}</Heading>
          <p className="text-[12px] text-black font-medium tracking-tight m-0 truncate">{loc.location}</p>
        </div>
         <div className="flex items-center gap-[4px] mt-auto">
          {loc.oldPrice && (
            <>
              <span className="text-[11px] text-black">{loc.tag === 'Winter' ? 'From' : 'To'}</span>
              <span className="text-[12px] text-[#cc0000] font-black line-through decoration-2">{loc.oldPrice}</span>
            </>
          )}
          {!loc.oldPrice && <span className="text-[11px] text-black">{loc.tag === 'Winter' ? 'From' : 'To'}</span>}
          <span className="text-[15px] font-black text-black border-b-[2px] border-black pb-0.5 leading-none">{loc.newPrice}</span>
        </div>
      </div>
    </div>
  );
}