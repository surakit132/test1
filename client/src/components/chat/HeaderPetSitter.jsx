import React, { useState } from "react";
import Close from "../../assets/svgs/close.svg";

const HeaderPetSitter = ({chatRoom}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div>
      {isVisible && (
        <div className="bg-gray-100 flex justify-between items-center py-[24px] px-[40px]">
          <div className="flex items-center gap-[12px]">
            <img
              src={chatRoom.image}
              alt={chatRoom.name}
              className="w-[48px] h-[48px] border-[1px] border-gray-600 rounded-full"
            />
            <p className="text-black text-[24px] leading-[32px] font-bold">
              {chatRoom.name}
            </p>
          </div>
          <img
            src={Close}
            alt="close"
            className="cursor-pointer"
            onClick={handleClose}
          />
        </div>
      )}
    </div>
  );
};

export default HeaderPetSitter;
