import React, { useState } from "react";
import PostMsg from "../../assets/svgs/postmsg.svg";
import UploadImg from "../../assets/svgs/uploadimg.svg";

const FooterPetSitter = ({
  sendMessage,
  inputMessage,
  setInputMessage,
  chatRoomId,
}) => {
  const [images, setImages] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage(chatRoomId);
    }
  };

  const onImageChange = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles.length > 0) {
      const newImages = [...images];
      for (let i = 0; i < selectedFiles.length; i++) {
        newImages.push(selectedFiles[i]);
      }
      setImages(newImages);
    }
  };

  const removeImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const clearImages = () => {
    setImages([]);
  };

  return (
    <div className="flex justify-between gap-[24px] items-center">
      <label
        htmlFor="file-upload"
        className="bg-gray-100 p-[14px] rounded-full cursor-pointer"
      >
        <img src={UploadImg} alt="uploadImage" width="20.85px" height="18px" />
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={onImageChange}
        multiple
      />
      <span className=" py-[10px] flex flex-1 gap-4">
        {images.length > 0 &&
          images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(image)}
                alt={`image-${index}`}
                width="100px"
                height="100px"
                className="rounded"
              />
              <button
                className="absolute top-[-10px] right-[-10px] bg-red-500 text-white text-[10px] rounded-full w-[20px] h-[20px]"
                onClick={() => removeImage(index)}
              >
                X
              </button>
            </div>
          ))}
        <input
          type="text"
          placeholder="Message here..."
          className="placeholder-gray-600 w-[100%] outline-none"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </span>
      <button
        className="p-[12px] bg-orange-500 rounded-full"
        onClick={() => {
          sendMessage({ chatRoomId, images });
          clearImages();
        }}
      >
        <img src={PostMsg} alt="close" />
      </button>
    </div>
  );
};

export default FooterPetSitter;
