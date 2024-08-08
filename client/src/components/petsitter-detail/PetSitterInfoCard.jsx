import React, { useState } from "react";

import locationIcon from "../../assets/images/location-icon.png";
// import girl from "../../assets/images/girl.png";

import ModalPopup from "../BookingPopup";
import TypeList from "../searchs/TypeList"
import StarRating from "../searchs/StarRating"

const PetSitterInfoCard = ({ profiles }) => {
  const [showModal, setShowModal] = useState(false); // State สำหรับ modal
  return (
    <div className="relative">
      <div className="bg-white  lg:shadow-[4px_4px_24px_0px_rgba(0,0,0,0.04)] rounded-2xl flex flex-col items-center w-full h-auto lg:m lg:w-auto sticky top-0">
        <div className="flex flex-col items-center py-[40px] px-[24px] gap-[24px] border-primarygray-200 border-b w-full">
          <img src={profiles.profile_image} alt="Girl" className="w-[120px] h-[120px] rounded-full  lg:w-[160px] lg:h-[160px]"></img>
          <div className="flex flex-col gap-[16px] items-center">
            <h1 className="text-black text-[24px] leading-[32px] lg:text-[36px] lg:leading-[44px]  font-bold ]">
             {profiles.pet_sitter_name}
            </h1>
            <div className="flex gap-[8px]">
              <p className="text-black text-[18px] leading-[26px] lg:text-[20px] lg:leading-[28px] font-medium">
              {profiles.firstname} {profiles.lastname}
              </p>
              <p className="text-secondarygreen-200  text-[16px] leading-[28px] font-medium">
              {profiles.experience}  {profiles.experience <= 2 ? 'Year Exp.' : 'Years Exp.'} 
              </p>
            </div>
            <div className="flex text-[16px] lg:text-[20px]">
              <StarRating rating={profiles.rating}/>
              
            </div>
            <div className="flex gap-[6px] ">
              <img src={locationIcon}></img>
              <p className="text-primarygray-400 text-[14px] leading-[24px] lg:text-[16px] lg:leading-[28px] font-medium ">
              {profiles.sub_district}, {profiles.province}
              </p>
            </div>
            <div className="flex gap-[8px]">
              <TypeList types={profiles.pet_type}/>
            </div>
          </div>
        </div>
        <div className=" p-[24px] gap-[16px] min-w-[375px] lg:min-w-[416px] w-full">
          <button
            type="submit"
            className="btn-primary"
            onClick={() => setShowModal(true)} // แสดง modal เมื่อคลิกปุ่ม
          >
            Book Now
          </button>
        </div>
      </div>
      <ModalPopup showModal={showModal} setShowModal={setShowModal} text={"Booking"} booking={"Continue"}/> 
    </div>
  );
};
export default PetSitterInfoCard;
