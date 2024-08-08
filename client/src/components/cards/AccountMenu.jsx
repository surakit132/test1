import { useLocation, Link } from "react-router-dom";
import { useRef, useEffect } from "react";
import { IconUser } from "../../assets/svgs/icons/IconUser";
import { IconYourPet } from "../../assets/svgs/icons/IconYourPet";
import { IconUserBooking } from "../../assets/svgs/icons/IconUserBooking";

const AccountMenu = () => {
  const location = useLocation();
  const containerRef = useRef(null);

  useEffect(() => {
    const smoothScroll = (targetPosition) => {
      containerRef.current.scrollTo({
        left: targetPosition,
        behavior: 'smooth',
      });
    };

    const scrollToCenter = (selector) => {
      const container = containerRef.current;
      const targetElement = container.querySelector(selector);
      if (targetElement) {
        const containerWidth = container.offsetWidth;
        const elementWidth = targetElement.offsetWidth;
        const targetPosition = targetElement.offsetLeft - (containerWidth / 2) + (elementWidth / 2);
        smoothScroll(targetPosition);
      }
    };

    if (location.pathname === "/user/profile") {
      scrollToCenter('[data-target="profile"]');
    } else if (location.pathname === "/user/pet") {
      scrollToCenter('[data-target="pet"]');
    } else if (location.pathname === "/user/booking-history") {
      scrollToCenter('[data-target="booking-history"]');
    }
  }, [location.pathname]);

  return (
    <ul
      ref={containerRef}
      className="bg-white flex h-fit shadow-md lg:flex-col lg:py-6 lg:rounded-2xl lg:min-w-[292px] overflow-x-auto overflow-y-hidden whitespace-nowrap"
    >
      <li className="hidden lg:block lg:px-6 lg:pb-3 text-start">
        <span className="text-[20px] leading-[28px] font-bold">Account</span>
      </li>
      <li data-target="profile" className="flex-grow flex justify-center lg:justify-start text-[#5B5D6F]">
        <Link
          to="/user/profile"
          className={`group w-full flex items-center gap-3 py-3 px-6 justify-center lg:justify-start ${
            location.pathname === "/user/profile" ? "bg-[#FFF1EC] text-[#FF7037]" : "hover:text-[#FF7037] text-current"
          } md:py-5 md:px-6`}
        >
          <IconUser className="text-[#AEB1C3] group-hover:text-[#FF7037] group-active:text-[#FF7037]" />
          <span
            className={`text-[18px] leading-[27px] font-bold ${
              location.pathname === "/user/profile"
                ? "text-[#FF7037]"
                : "group-hover:text-[#FF7037] text-[#5B5D6F]"
            }`}
          >
            Profile
          </span>
        </Link>
      </li>
      <li data-target="pet" className="flex-grow flex justify-center lg:justify-start text-[#5B5D6F]">
        <Link
          to="/user/pet"
          className={`group w-full flex items-center gap-3 py-3 px-6 justify-center lg:justify-start ${
            location.pathname === "/user/pet" ? "bg-[#FFF1EC] text-[#FF7037]" : "hover:text-[#FF7037] text-current"
          } md:py-5 md:px-6`}
        >
          <IconYourPet className="text-[#AEB1C3] group-hover:text-[#FF7037] group-active:text-[#FF7037]" />
          <span
            className={`text-[18px] leading-[27px] font-bold ${
              location.pathname === "/user/pet"
                ? "text-[#FF7037]"
                : "group-hover:text-[#FF7037] text-[#5B5D6F]"
            }`}
          >
            Your Pet
          </span>
        </Link>
      </li>
      <li data-target="booking-history" className="flex-grow flex justify-center lg:justify-start text-[#5B5D6F]">
        <Link
          to="/user/booking-history"
          className={`group w-full flex items-center gap-3 py-3 px-6 justify-center lg:justify-start ${
            location.pathname === "/user/booking-history" ? "bg-[#FFF1EC] text-[#FF7037]" : "hover:text-[#FF7037] text-current"
          } md:py-5 md:px-6`}
        >
          <IconUserBooking className="text-[#AEB1C3] group-hover:text-[#FF7037] group-active:text-[#FF7037]" />
          <span
            className={`text-[18px] leading-[27px] font-bold ${
              location.pathname === "/user/booking-history"
                ? "text-[#FF7037]"
                : "group-hover:text-[#FF7037] text-[#5B5D6F]"
            }`}
          >
            Booking History
          </span>
        </Link>
      </li>
    </ul>
  );
};

export default AccountMenu;
