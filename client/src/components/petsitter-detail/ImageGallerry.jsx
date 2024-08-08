import React, { useState } from "react";

const ImageGallery = ({ profiles }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  console.log(profiles);

  const nextSlide = () => {
    setSlideIndex((slideIndex + 1) % profiles.length);
  };

  const prevSlide = () => {
    setSlideIndex((slideIndex - 1 + profiles.length) % profiles.length);
  };

  // ฟังก์ชันเพื่อให้แน่ใจว่าได้รูปภาพ 3 รูปสำหรับการแสดงผล
  const getSlides = () => {
    let slides = [];
    for (let i = 0; i < 3; i++) {
      slides.push(profiles[(slideIndex + i) % profiles.length]);
    }
    return slides;
  };

  return (
    <div className="relative lg:py-[40px] flex justify-center overflow-x-hidden bg-[#FAFAFB]">
      <div className="flex gap-4 items-center w-fit  mx-auto">
        {getSlides().map(
          (
            slide,
            index // ใช้ getSlides เพื่อรับรูปภาพ 3 รูป
          ) => (
            <div key={index} className="w-[375px] lg:w-[550px] lg:block">
              <img
                src={slide}
                className="w-full h-[281px] lg:h-[413px]"
                alt={`Slide ${slideIndex + index}`} // ใช้ slideIndex + index เป็น alt text
              />
            </div>
          )
        )}
      </div>
      <button
        className="prev absolute top-1/2 left-[16px] transform -translate-y-1/2 size-[56px] text-primarygray-400  font-bold text-lg transition-all ease-in-out bg-white bg-opacity-50 hover:bg-opacity-90 rounded-full"
        onClick={prevSlide}
      >
        ❮
      </button>
      <button
        className="next absolute top-1/2 right-[16px] transform -translate-y-1/2 size-[56px] text-primarygray-400 font-bold text-lg transition-all ease-in-out  bg-white  bg-opacity-50 hover:bg-opacity-90 rounded-full"
        onClick={nextSlide}
      >
        ❯
      </button>
    </div>
  );
};

export default ImageGallery;
