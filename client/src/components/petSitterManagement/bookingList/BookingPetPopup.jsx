import React from "react";
import cross from "../../../assets/svgs/icons/icon-cross.svg";
import petProfile from "../../../assets/svgs/icons/icon-your-pet-white.svg" 


const BookingPetPopup = ({ showModal, setShowModal, petDetail }) => {
  if (!showModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 pt-[24px]">
      <div className="bg-white rounded-[16px] w-full max-w-[800px] mx-auto flex flex-col h-[calc(100vh-24px)] max-h-[552px]">
        <div className="flex justify-between border-b-[1px] gap-[10px] py-[24px] px-[40px] items-center">
          <h1 className="text-primarygray-600 text-[24px] leading-[32px] font-bold">
            {petDetail.pet_name}
          </h1>
          <img
            src={cross}
            className="w-[24px] h-[24px] cursor-pointer"
            onClick={() => setShowModal(false)}
            alt="Close"
          />
        </div>
        <div className="flex flex-grow p-[40px] gap-4">
          <div className="flex justify-between items-start w-[100%]">
            <div className="w-[240px] h-[240px] rounded-full bg-[#DCDFED] flex items-center justify-center">
              {petDetail.pet_image ? (
                <img
                  src={petDetail.pet_image}
                  alt="User Profile Image"
                  className="w-[240px] h-[240px] rounded-full object-cover"
                />
              ) : (
                <img
                  src={petProfile}
                  alt="Default Profile"
                  className="w-[104px] h-[104px]"
                />
              )}
            </div>
            <div className="flex flex-col w-[60%] ml-[20px] p-[24px] bg-[#FAFAFB] gap-10 rounded-lg">
              <div className="flex gap-4">
              <div className = "flex flex-col gap-1 basis-1/2">
                <p className="text-primarygray-300 text-[20px] leading-[28px] font-medium">
                  Pet Type
                </p>
                <p className="text-black text-[16px] leading-[24px] font-normal">
                  {petDetail.pet_type}
                </p>
              </div>
              <div className = "flex flex-col gap-1 basis-1/2">
                <p className="text-primarygray-300 text-[20px] leading-[28px] font-medium">
                  Breed
                </p>
                <p className="text-black text-[16px] leading-[24px] font-normal">
                  {petDetail.breed}
                </p>
              </div>
              </div>
              <div className="flex gap-4">
              <div className = "flex flex-col gap-1 basis-1/2">
                <p className="text-primarygray-300 text-[20px] leading-[28px] font-medium">
                  Sex
                </p>
                <p className="text-black text-[16px] leading-[24px] font-normal">
                  {petDetail.sex}
                </p>
              </div>
              <div className = "flex flex-col gap-1 basis-1/2">
                <p className="text-primarygray-300 text-[20px] leading-[28px] font-medium">
                  Age
                </p>
                <p className="text-black text-[16px] leading-[24px] font-normal">
                  {petDetail.age} {petDetail.age === 1 ? 'Month' : 'Months'}
                </p>
              </div>
              </div>
              <div className="flex gap-4">
              <div className = "flex flex-col gap-1 basis-1/2">
                <p className="text-primarygray-300 text-[20px] leading-[28px] font-medium">
                  Color
                </p>
                <p className="text-black text-[16px] leading-[24px] font-normal">
                  {petDetail.color}
                </p>
              </div>
              <div className = "flex flex-col gap-1 basis-1/2">
                <p className="text-primarygray-300 text-[20px] leading-[28px] font-medium">
                  Weight
                </p>
                <p className="text-black text-[16px] leading-[24px] font-normal">
                  {petDetail.weight} {petDetail.weight === 1 ? 'Kilogram' : 'Kilograms'}
                </p>
              </div>
              </div>
              <div className = "flex flex-col gap-1">
                <p className="text-primarygray-300 text-[20px] leading-[28px] font-medium">
                  About
                </p>
                <p className="text-black text-[16px] leading-[24px] font-normal">
                  {petDetail.about ? (petDetail.about) : ("No Message")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPetPopup;