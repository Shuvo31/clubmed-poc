import { Heading } from '@clubmed/trident-ui/atoms/Heading/Heading';
import { Image } from '@clubmed/trident-ui/atoms/Image/Image';

export default function ResortCard({ loc, isSelected, onClick }) {
  return (
    <div
      onClick={() => onClick(loc)}
      className={`bg-white p-3 md:p-4 flex shadow-xl shadow-black/10 w-[320px] md:w-[440px] h-[130px] md:h-[160px] shrink-0 transform transition-all duration-300 cursor-pointer relative snap-start ${
        isSelected
          ? "border-2 border-black rounded-3xl"
          : "rounded-3xl hover:-translate-y-3 hover:shadow-2xl hover:shadow-black/20"
      }`}
    >
      <Image src={loc.img} alt={loc.title} className="w-[100px] h-[100px] md:w-[128px] md:h-[128px] object-cover rounded-xl md:rounded-2xl shrink-0" />
      <div className="ml-3 md:ml-5 flex flex-col justify-between flex-1 py-0.5 md:py-1">
        <div className="flex flex-col gap-1 md:gap-1.5">
          {loc.tag && (
            <span className="text-[9px] md:text-[11px] font-black px-2 py-[1px] md:px-3 md:py-[2px] rounded-full border-[1.5px] md:border-2 border-black w-max uppercase tracking-tight text-black">
              {loc.tag}
            </span>
          )}
          <Heading level={3} className="font-bold text-[14px] md:text-[16px] leading-tight text-black m-0 tracking-tight line-clamp-1">{loc.title}</Heading>
          <p className="text-[12px] md:text-[13px] text-black font-medium tracking-tight m-0 truncate">{loc.location}</p>
        </div>
        <div className="flex items-center gap-[4px] md:gap-[6px] mt-auto">
          {loc.oldPrice && (
            <>
              <span className="text-[11px] md:text-[12px] text-black">{loc.tag === 'Winter' ? 'From' : 'To'}</span>
              <span className="text-[12px] md:text-[14px] text-[#cc0000] font-black line-through decoration-2">{loc.oldPrice}</span>
            </>
          )}
          {!loc.oldPrice && <span className="text-[11px] md:text-[12px] text-black">{loc.tag === 'Winter' ? 'From' : 'To'}</span>}
          <span className="text-[15px] md:text-[18px] font-black text-black border-b-[2px] md:border-b-[2.5px] border-black pb-0.5 md:pb-1 leading-none">{loc.newPrice}</span>
        </div>
      </div>
    </div>
  );
}