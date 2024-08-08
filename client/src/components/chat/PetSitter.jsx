import React from "react";
import { useSocket } from "../../contexts/socket";

const PetSitter = ({ chatRoom }) => {
  const { selectedChatRoom } = useSocket();
  return (
    <button className="bg-black w-full flex items-center gap-[12px] py-[16px] pr-[24px] pl-[40px] hover:bg-gray-500 focus:bg-gray-500 cursor-pointer">
      <img
        src={chatRoom.image}
        alt={chatRoom.name}
        className="w-[60px] h-[60px] object-cover border-[1px] border-gray-600 rounded-[100%]"
      />
      <p className="text-white text-[16px] leading-[28px] font-medium flex justify-start">
        {chatRoom.name}
      </p>
      {selectedChatRoom?.chatRoomId !== chatRoom.chatRoomId &&
        chatRoom.isReadCount !== 0 && (
          <div className="bg-orange-500 text-white min-w-[24px] min-h-[24px] rounded-full">
            {chatRoom.isReadCount}
          </div>
        )}
    </button>
  );
};

export default PetSitter;
