import { Heading } from '@clubmed/trident-ui/atoms/Heading/Heading';
import { Image } from '@clubmed/trident-ui/atoms/Image/Image';

export default function ResortDetailContent({ location }) {
  const images = location.images || [];

  return (
    <div className="flex-1 bg-white font-sans text-black relative px-4 lg:!pr-8 lg:pl-4 pb-12 lg:pb-20 no-scrollbar">
      {/* Container Layout for Detail view */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-14">
        {/* Left Column - Image Grid */}
        <div className="flex-[1.4]">
          <div className="grid grid-cols-2 gap-3 lg:gap-4">
            {/* Top Large Image spanning full width */}
            <div className="col-span-2">
              <Image src={location.img} alt="Hero" className="w-full h-[250px] lg:h-[450px] object-cover rounded-[16px] lg:rounded-[24px]" />
            </div>

            {/* Row 2 */}
            <Image src={images[0]} alt="Resort aspect 1" className="w-full h-32 lg:h-52 object-cover rounded-[16px] lg:rounded-[20px]" />
            <Image src={images[1]} alt="Resort aspect 2" className="w-full h-32 lg:h-52 object-cover rounded-[16px] lg:rounded-[20px]" />

            {/* Row 3 (Desktop only) */}
            <Image src={images[2]} alt="Resort aspect 3" className="hidden lg:block w-full h-48 object-cover rounded-[20px]" />
            <Image src={images[3]} alt="Resort aspect 4" className="hidden lg:block w-full h-48 object-cover rounded-[20px]" />
          </div>
        </div>

        {/* Right Column - Text Info */}
        <div className="flex-1 lg:pr-4">
          <Heading level={1} className="text-[26px] lg:text-3xl font-serif font-black leading-[1.1] tracking-[-0.02em] text-black mb-4 lg:mb-6">
            The ultimate Club Med<br />{location.titleSuffix || location.title} paradise
          </Heading>

          <p className="text-[14px] lg:text-[15px] font-medium leading-[1.5] lg:leading-[1.6] text-black mb-4">
            {location.desc}
          </p>

          <div className="text-right lg:border-b border-transparent mb-8 lg:mb-12">
            <span className="font-bold text-[13px] lg:text-sm text-black border-b-[2px] border-black cursor-pointer pb-0.5 inline-block">See more</span>
          </div>

          <Heading level={2} className="text-xl lg:text-2xl font-serif font-black text-black mb-4">The best reasons to go</Heading>

          <div className="mb-8 lg:mb-12">
            <Heading level={3} className="text-lg lg:text-xl font-bold text-black mb-2 lg:mb-3">{location.reasonTitle}</Heading>
            <p className="text-[14px] lg:text-[15px] font-medium leading-[1.5] lg:leading-[1.6] text-black mb-4">
              {location.reasonDesc}
            </p>
            <div className="text-right border-b border-transparent">
              <span className="font-bold text-[13px] lg:text-sm text-black border-b-[2px] border-black cursor-pointer pb-0.5 inline-block">See more</span>
            </div>
          </div>

          <div className="space-y-6">
            {/* Accommodation Feature */}
            <div className="flex gap-4 items-start">
              <Image src={images[2]} alt="Accommodation" className="w-20 h-20 lg:w-24 lg:h-24 object-cover rounded-[16px] lg:rounded-[20px] shrink-0" />
              <div>
                <Heading level={3} className="font-bold text-black text-[13px] lg:text-sm mb-1">Accommodation</Heading>
                <p className="text-[12px] lg:text-[13px] font-medium text-black leading-snug">
                  {location.accommodationDesc || "Find your ideal hideaway with a choice of rooms tailored to your needs."}
                </p>
              </div>
            </div>

            {/* Activities Feature */}
            <div className="flex gap-4 items-start">
              <Image src={images[3]} alt="Activities" className="w-20 h-20 lg:w-24 lg:h-24 object-cover rounded-[16px] lg:rounded-[20px] shrink-0" />
              <div>
                <Heading level={3} className="font-bold text-black text-[13px] lg:text-sm mb-1">Activities</Heading>
                <p className="text-[12px] lg:text-[13px] font-medium text-black leading-snug">
                  {location.activitiesDesc || "Discover the many included and on demand activities available through this page."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
