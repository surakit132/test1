import React, { useEffect } from "react";
import PetSitter from "./PetSitter";
import HeaderPetSitter from "./HeaderPetSitter";
import FooterPetSitter from "./FooterPetSitter";
import MainChat from "./MainChat";
import { useSocket } from "../../contexts/socket";

const Chat = () => {
  const {
    socket,
    chatRoomList,
    setChatRoomList,
    selectedChatRoom,
    historyMessage,
    inputMessage,
    setInputMessage,
    getChatRoomList,
    joinChatRoom,
    getMessages,
    sendMessage,
  } = useSocket();

  const clearReadCount = (chatRoomId) => {
    const newChatRoomList = [...chatRoomList];
    newChatRoomList.map((chatRoom) => {
      if (chatRoom.chatRoomId === chatRoomId) {
        chatRoom.isReadCount = 0;
        return chatRoom;
      }
      return chatRoom;
    });
    setChatRoomList(newChatRoomList);
  };

  useEffect(() => {
    getChatRoomList();
  }, [socket]);

  return (
    <div className="flex h-[calc(100dvh-72px)]">
      <section className="bg-black py-[40px] min-w-[368px]">
        <h3 className="text-white mx-[40px] mb-[24px] text-[24px] leading-[32px] font-bold">
          Messages
        </h3>
        <ul className="flex flex-col gap-[8px]">
          {chatRoomList.map((chatRoom, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  joinChatRoom(chatRoom);
                  clearReadCount(chatRoom.chatRoomId);
                }}
              >
                <PetSitter chatRoom={chatRoom} />
              </li>
            );
          })}
        </ul>
      </section>
      <section className="flex flex-col w-[100%]">
        <main className="flex">
          {selectedChatRoom && (
            <div className="flex flex-col w-full">
              {chatRoomList
                .filter((list) => list.targetId === selectedChatRoom.targetId)
                .map((chatRoom, index) => {
                  return (
                    <div key={index}>
                      <HeaderPetSitter chatRoom={chatRoom} />
                    </div>
                  );
                })}
              <div className="flex flex-1 ">
                <MainChat
                  historyMessage={historyMessage}
                  getMessages={getMessages}
                  chatRoom={selectedChatRoom}
                />
              </div>
              <hr className="border-t-[1px] border-gray-200" />
              <div className="py-[24px] px-[40px]">
                <FooterPetSitter
                  chatRoomId={selectedChatRoom}
                  sendMessage={sendMessage}
                  inputMessage={inputMessage}
                  setInputMessage={setInputMessage}
                />
              </div>
            </div>
          )}
        </main>
      </section>
    </div>
  );
};

export default Chat;
