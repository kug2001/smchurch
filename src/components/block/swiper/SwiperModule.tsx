import React, { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useCloudinary } from '@/hooks/cloudinary/useCloudinary';
import { FamilyData } from '@/app/admin/new-family/page';
import { AdvancedImage } from '@cloudinary/react';
import useResize from '@/hooks/browser/useResize';
import { reverse } from 'ramda';
import { Calendar, User } from 'lucide-react';

interface SwiperModuleProps {
  data: FamilyData[];
}

export const SwiperModule: FC<SwiperModuleProps> = props => {
  const { data } = props;
  const { getCloudImg } = useCloudinary();
  const { width } = useResize();

  return (
    <div className="[&_.swiper-button-prev]:text-primary [&_.swiper-button-prev]:after:text-lg [&_.swiper-button-next]:text-primary [&_.swiper-button-next]:after:text-lg">
      <Swiper
        modules={[Navigation]}
        centeredSlides={true}
        spaceBetween={24}
        slidesPerView={width > 786 ? 3 : 1}
        loop={false}
        navigation
      >
        {reverse(data).map(({ idx, name, date, publicId }) => (
          <SwiperSlide key={idx}>
            <div className="flex flex-col items-center px-2 pb-4">
              <div className="w-full overflow-hidden rounded-xl bg-zinc-100 shadow-md transition-shadow hover:shadow-lg">
                <AdvancedImage
                  cldImg={getCloudImg(publicId)}
                  className="w-full rounded-xl"
                />
              </div>
              <div className="mt-3 flex flex-col items-center gap-1">
                <span className="flex items-center gap-1 text-base font-semibold text-foreground md:text-lg">
                  <User className="h-4 w-4 text-primary/60" />
                  {name}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  등록일자 : {date}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
