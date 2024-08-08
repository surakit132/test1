import React from "react";
import headerLeftSmall from "../assets/images/header-left-s.png";
import headerRightSmall from "../assets/images/header-right-s.png";
import headerLeftLarge from "../assets/images/header-left-l.png";
import headerRightLarge from "../assets/images/header-right-l.png";

const Header = () => {
  return (
    <div className="flex justify-center items-start relative h-[565px]">
      <div className="flex flex-col justify-center items-center gap-[24px] mx-[25px] mt-[40px] ">
        <div className="flex flex-col items-center">
          <h1 className="flex text-black text-[48px] leading-[56px] md:text-[88px] md:leading-[96px]  font-black">
            <span>Pet Sitter</span>
            <span className="text-primaryorange-400">,</span>
          </h1>
          <h1 className="flex text-black text-[48px] leading-[56px] md:text-[88px] md:leading-[96px] font-black">
            <span>Perfect</span>
            <span className="text-secondaryblue-200">,</span>
          </h1>
          <h1 className="flex text-black text-[48px] leading-[56px] md:text-[88px] md:leading-[96px] font-black">
            <span>For Your Pet</span>
            <span className="text-secondaryyellow-200">.</span>
          </h1>
        </div>

        <p className="text-primarygray-400 text-[20px] leading-[28px] md:text-[24px] md:leading-[32px] font-bold ">
          Find your perfect pet sitter with us.
        </p>
      </div>

      <img
        src={headerLeftSmall}
        alt="cats"
        className="absolute left-[0] top-[310px] xl:hidden"
      ></img>
      <img
        src={headerRightSmall}
        alt="Dog"
        className="absolute right-[0] top-[310px] xl:hidden"
      ></img>

      <img
        src={headerLeftLarge}
        alt="cats"
        className="hidden absolute left-[0] top-[80px] xl:flex"
      ></img>
      <img
        src={headerRightLarge}
        alt="Dog"
        className="hidden absolute right-[0] top-[80px] xl:flex"
      ></img>
    </div>
  );
};

export default Header;
