import React from "react";

import map from "../../assets/images/map.png";

const ContentTop = ({ profiles }) => {
  return (
    <div className="flex flex-col py-[40px] px-[16px]  lg:py-[24px] gap-[24px] lg:gap-[48px] lg:px-[80px]   ">
      <h1 className="text-black text-[36px] leading-[44px] font-bold lg:text-[56px] lg:leading-[64px] ">
        {profiles.pet_sitter_name}
      </h1>
      <div className="flex flex-col gap-[12px]">
        <h3 className="text-black text-[20px] leading-[28px] font-bold lg:text-[24px] lg:leading-[32px] ">
          Introduction
        </h3>
        <p className="text-primarygray-500 text-[14px] leading-[24px] font-medium lg:text-[16px] lg:leading-[28px] ">
         {profiles.introduction}
        </p>
      </div>
      <div className="flex flex-col gap-[12px]">
        <h3 className="text-black text-[20px] leading-[28px] font-bold lg:text-[24px] lg:leading-[32px]">
          Services
        </h3>
        <p className="text-primarygray-500 text-[14px] leading-[24px] font-medium lg:text-[16px] lg:leading-[28px] ">
         {profiles.services}
        </p>
      </div>
      <div className="flex flex-col gap-[24px] ">
        <h3 className="text-black text-[20px] leading-[28px] font-bold lg:text-[24px] lg:leading-[32px]">
          My Place
        </h3>
        <p className="text-primarygray-500 text-[14px] leading-[24px] font-medium lg:text-[16px] lg:leading-[28px] ">
          {profiles.my_place}
        </p>
        {/* <img src={map} className="rounded-[8px]"></img> */}
      </div>
    </div>
    
  );
};
export default ContentTop;
