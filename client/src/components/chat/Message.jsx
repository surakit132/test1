import React from "react";

const Message = ({ isSender, message, imageSrc, images }) => {
  return (
    <div className={`flex items-end gap-[12px] w-full overflow-x-hidden ${isSender && "justify-end"}`}>
        {!isSender && <img src={imageSrc} alt="receiverImage" className="w-[40px] h-[40px] rounded-full"/>}
      <div
        className={`flex ${
          isSender
            ? "justify-end bg-orange-600 text-white py-[16px] px-[24px] rounded-[24px] rounded-br-none"
            : "bg-white text-black py-[16px] px-[24px] rounded-[24px] rounded-bl-none border-[1px] border-gray-200"
        }`}
      >
        {message}
        {images && images.map((img,index)=><img key={index} src={img} className="w-[240px] h-[240px] rounded-[8px]"/>)}
      </div>
    </div>
  );
};

export default Message;
