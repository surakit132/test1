import React, { useState } from 'react';
import petSitterWhiteProfile from "../../../../assets/svgs/pet-sitter-management/pet-sitter-whiteProfile.svg";
import petSitterAddImage from "../../../../assets/svgs/pet-sitter-management/pet-sitter-addImage.svg";
import supabase from "../../../../utils/storage";
import { v4 as uuidv4 } from "uuid";
  
const ProfileImage = ({ profileImage, setFormData, petsitterId }) => {
  const handleChange = async (event) => {
    const file = event.target.files[0];
    
    if (file) {
      const fileName = `${petsitterId}/${uuidv4()}`;
      try {
        const { data, error } = await supabase
          .storage
          .from("petsitter_profile_image")
          .upload(fileName, file, { upsert: false });
        
        if (error) {
          throw error;
        }

        const { data: publicUrlData, error: urlError } = supabase.storage
          .from("petsitter_profile_image")
          .getPublicUrl(fileName);
        console.log(publicUrlData);
        if (urlError) {
          throw urlError;
        }

        setFormData((prev) => ({
          ...prev,
          profile_image: publicUrlData.publicUrl,
        }));

      } catch (error) {
        console.error("Error uploading or fetching file URL:", error);
      }
    }
  };

  return (
    <div>
      <label className="text-[16px] leading-[24px] text-black font-medium flex flex-col gap-[10px]">
        Profile Image
        <div className="w-[240px] h-[240px] rounded-full bg-[#DCDFED] relative flex items-center justify-center">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-[240px] h-[240px] rounded-full object-cover"
            />
          ) : (
            <img
              src={petSitterWhiteProfile}
              alt="Default Profile"
              className="w-[104px] h-[104px]"
            />
          )}
          <label className="absolute right-0 bottom-0 cursor-pointer">
            <input
              type="file"
              name="profile_image"
              className="hidden"
              onChange={handleChange}
            />
            <img
              src={petSitterAddImage}
              alt="Add Image"
              className="w-[60px] h-[60px]"
            />
          </label>
        </div>
      </label>
    </div>
  );
};

export default ProfileImage;