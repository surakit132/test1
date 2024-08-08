import React from "react";
import successIcon from "../assets/svgs/icons/icon-success.svg"

const ChangeDateSuccessPopup = ({ showModal }) => {
    if (!showModal) {
        return null; 
      }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center  xxs:justify-end items-end z-50">
        <div className="bg-secondarygreen-100 shadow-[4px_2px_12px_2px_rgba(0,0,0,0.16)] flex rounded-[8px] p-[16px] lg:p-[24px] gap-[12px] lg:gap-[16px] m-[24px]">
            <img src={successIcon} className="w-[24px] lg:w-[32px] h-[24px] lg:h-[32px] rounded-full"></img>
            <p className="text-secondarygreen-200 text-[18px] lg:text-[20px] leading-[26px] lg:leading-[28px] font-medium lg:font-bold">Changed date success</p>
        </div>
    </div>
  );
};

export default ChangeDateSuccessPopup;