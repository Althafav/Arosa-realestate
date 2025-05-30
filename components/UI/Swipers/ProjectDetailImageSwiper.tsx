import React, { useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";

import { FreeMode, Navigation, Thumbs, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";
import Image from "next/image";

interface ImageSwiperProps {
  images: { url: string }[];
}
const ProjectDetailImageSwiper: React.FC<ImageSwiperProps> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="relative ProjectDetailImageSwiper">
      <div className="p-3 bg-white mb-5 rounded-xl">
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={10}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 8 },
          }}
          className="mySwiper"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <Image
                width={200}
                height={200}
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                className="h-[100px] w-full rounded-xl cursor-pointer"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Swiper
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        loop={true}
        spaceBetween={10}
        slidesPerView={2}
        thumbs={{ swiper: thumbsSwiper }}
        pagination={{ clickable: true, el: ".custom-pagination" }}
        modules={[FreeMode, Navigation, Thumbs, Pagination]}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 2 },
        }}
        className="mySwiper2"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              width={1300}
              height={1300}
              quality={100}
              src={image.url}
              alt={`Slide ${index + 1}`}
              className="h-[500px] w-full object-cover rounded-xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="relative py-10">
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

export default ProjectDetailImageSwiper;
