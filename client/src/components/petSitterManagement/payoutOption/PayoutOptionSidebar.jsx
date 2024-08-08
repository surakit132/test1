import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import petsitterLogo from "../../../assets/svgs/logo-navbar.svg";
import petSitterGrayBookingList from "../../../assets/svgs/pet-sitter-management/pet-sitter-grayBooking-list.svg";
import petSitterOrangeBookingList from "../../../assets/svgs/pet-sitter-management/pet-sitter-orangeBooking-list.svg";
import petSitterGrayProfile from "../../../assets/svgs/pet-sitter-management/pet-sitter-grayProfile.svg";
import petSitterOrangeProfile from "../../../assets/svgs/pet-sitter-management/pet-sitter-orangeProfile.svg";
import petSitterGrayPayment from "../../../assets/svgs/pet-sitter-management/pet-sitter-grayPayment.svg";
import petSitterOrangePayment from "../../../assets/svgs/pet-sitter-management/pet-sitter-orangePayment.svg";
import petSitterLogout from "../../../assets/svgs/pet-sitter-management/pet-sitter-logout.svg";
import petSitterOrangeCircle from "../../../assets/svgs/pet-sitter-management/pet-sitter-orangeCircle.svg";
import { SERVER_API_URL } from "../../../core/config.mjs";
import { useAuth } from "../../../contexts/authentication";

const Sidebar = () => {
  const { logout } = useAuth();
  const [hasWaitingForConfirm, setHasWaitingForConfirm] = useState(false);
  const [hoverProfile, setHoverProfile] = useState(false);
  const [hoverBooking, setHoverBooking] = useState(false);

  useEffect(() => {
    const fetchBookingStatuses = async () => {
      try {
        const response = await axios.get(`${SERVER_API_URL}/petsitter/booking/status`);
        const bookings = response.data.data;
        setHasWaitingForConfirm(bookings.length > 0);
      } catch (error) {
        console.error("Error fetching booking statuses:", error);
      }
    };

    fetchBookingStatuses();
  }, []);

  return (
    <section className="w-[240px] h-[1024px] bg-[#FAFAFB] flex flex-col text-primarygray-500 text-[16px] leading-[24px] flex-none">
      <div className="mt-[16px]">
        <Link to="/">
          <img
            src={petsitterLogo}
            alt="petsitter-logo"
            className="w-[131.61px] h-[40px] mt-[24px] mb-[48px] ml-[24px]"
          />
        </Link>
      </div>

      <Link
        to="/petsitter/profile"
        className="flex gap-[16px] px-[24px] py-[16px] hover:text-primaryorange-500"
        onMouseEnter={() => setHoverProfile(true)}
        onMouseLeave={() => setHoverProfile(false)}
      >
        <img
          src={hoverProfile ? petSitterOrangeProfile : petSitterGrayProfile}
          className="w-[24px] h-[24px]"
          alt="Profile"
        />
        <span>Pet Sitter Profile</span>
      </Link>

      <Link
        to="/petsitter/booking"
        className="flex items-center px-[24px] py-[16px] hover:text-primaryorange-500"
        onMouseEnter={() => setHoverBooking(true)}
        onMouseLeave={() => setHoverBooking(false)}
      >
        <img
          src={hoverBooking ? petSitterOrangeBookingList : petSitterGrayBookingList}
          className="w-[24px] h-[24px] mr-[16px]"
          alt="Booking List"
        />
        <span className="mr-[6px]">Booking List</span>
        {hasWaitingForConfirm && <img src={petSitterOrangeCircle} className="w-[6px] h-[6px]" alt="Notification" />}
      </Link>

      <div className="flex items-center px-[24px] py-[16px] bg-primaryorange-100 text-primaryorange-500 font-medium">
        <img
          src={petSitterOrangePayment}
          className="w-[24px] h-[24px] mr-[16px]"
          alt="Payout Option"
        />
        <span className="mr-[6px]">Payout Option</span>
      </div>

      <div
        onClick={logout}
        className="flex gap-[16px] mt-[664px] pl-[24px] pt-[16px] border-t-[1px] border-primarygray-200 cursor-pointer"
      >
        <img src={petSitterLogout} className="w-[24px] h-[24px]" alt="Logout" />
        <span>Logout</span>
      </div>
    </section>
  );
};

export default Sidebar;