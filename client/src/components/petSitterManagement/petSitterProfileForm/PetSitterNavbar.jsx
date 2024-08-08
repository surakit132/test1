import { useState, useEffect } from "react";
import axios from "axios";
import petSitterProfilePic from "../../../assets/svgs/pet-sitter-management/pet-sitter-whiteProfile.svg";
import petSitterChatLogo from "../../../assets/svgs/pet-sitter-management/pet-sitter-chatLogo.svg";
import { Link } from "react-router-dom";
import { SERVER_API_URL } from "../../../core/config.mjs";

const Navbar = () => {
    const [profileData, setProfileData] = useState({
        profile_image: "",
        first_name: "",
        last_name: ""
    });

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const { data } = await axios.get(`${SERVER_API_URL}/petsitter`);
                if (data && data.result && data.result.length > 0) {
                    const profile = data.result[0];
                    setProfileData({
                        profile_image: profile.profile_image,
                        first_name: profile.firstname,
                        last_name: profile.lastname
                    });
                }
            } catch (error) {
                console.error("Error fetching profile data", error);
            }
        };

        fetchProfileData();
    }, []);

    const isDefaultProfilePic = !profileData.profile_image;
    const profileImage = isDefaultProfilePic ? petSitterProfilePic : profileData.profile_image;
    const displayName = (profileData.first_name && profileData.last_name) 
        ? `${profileData.first_name} ${profileData.last_name}` 
        : "Anonymous";

    return (
        <nav className="flex justify-between items-center h-[72px] text-primarygray-600 text-[16px] leading-[28px] bg-primarygray-100">
          <div className="flex items-center ml-[60px] gap-[8px]">
            <div className="relative w-[40px] h-[40px] rounded-full bg-primarygray-200 flex items-center justify-center">
              <img
                src={profileImage}
                alt="Profile"
                className={`${isDefaultProfilePic ? 'w-[20px] h-[20px]' : 'w-[40px] h-[40px]'} rounded-full object-cover`}
              />
            </div>
            <span>{displayName}</span>
          </div>
          <Link to="/chat">
          <img
            src={petSitterChatLogo}
            alt="Chat Logo"
            className="w-[40px] h-[40px] mr-[60px]"
          />
          </Link>
        </nav>
    );
}

export default Navbar;