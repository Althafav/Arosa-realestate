import React, { useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";

import { FreeMode, Navigation, Thumbs, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";
import Image from "next/image";

interface ImageSwiperProps {
  images: { url: string }[];
}
const ProjectDetailImageSwiper2: React.FC<ImageSwiperProps> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="relative ProjectDetailImageSwiper">
      <Swiper
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        loop={true}
        slidesPerView={1}
        centeredSlides={true}
        thumbs={{ swiper: thumbsSwiper }}
        // pagination={{ clickable: true, el: ".custom-pagination" }}
        modules={[FreeMode, Navigation, Thumbs, Pagination]}
        className=""
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full  ">
              <div className="">
                <Image
                  src={image.url}
                  alt={`Slide ${index + 1}`}
                  width={1980}
                  height={600}
                  quality={100}
                  className="object-cover h-[600px] aspect-square"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute bottom-10 z-10 right-1/2 translate-x-1/2" dir="ltr">
        <div className="container mx-auto">
          <div className="flex justify-center">
            <div className="flex items-center gap-2 bg-secondary p-4 rounded-full">
              <button className="custom-prev">
                <RiArrowLeftLine
                  className="bg-transparent border-2 border-black p-2 rounded-full cursor-pointer"
                  size={44}
                />
              </button>
              <div>
                <div className="custom-pagination"></div>
              </div>
              <button className="custom-next">
                <RiArrowRightLine
                  className="bg-primary p-2 rounded-full cursor-pointer text-white"
                  size={44}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailImageSwiper2;
