import React from "react";
import { Partneritem } from "@/models/partneritem";
import { Homepage } from "@/models/homepage";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";

interface Props {
  pageData: Partneritem[];
}

export default function PartnersComponent({ pageData }: Props) {
  return (
    <div className="partners-wrapper py-10">
      <div className="container mx-auto">
        <Swiper
          slidesPerView={2}
          spaceBetween={20}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          breakpoints={{
            480: { slidesPerView: 2.5 },
            640: { slidesPerView: 3.5 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 4 },
          }}
          className="mySwiper"
        >
          {pageData.map((m: any, index: number) => {
            const item: Partneritem = m;
            return (
              <SwiperSlide className="flex justify-center" key={item.system.id}>
                <div className="flex justify-center">
                  <Image
                    width={150}
                    height={150}
                    src={item.image.value[0]?.url}
                    alt={item.name.value}
                    className="w-[120px] h-[120px] object-contain "
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="grid grid-cols-12  lg:gap-10 gap-5"></div>
      </div>
    </div>
  );
}
