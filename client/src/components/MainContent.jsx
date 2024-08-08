import React from "react";
import catLogo from "../assets/images/cat-logo.png";
import blueStar from "../assets/images/Star-blue.png";
import pinkStar from "../assets/images/Star-pink.png"
import greenStar from "../assets/images/Star-green.png";
import yellowStar from "../assets/images/Star-yellow.png";

import imgMainBtLeft from "../assets/images/img-main-bt-left.png";
import imgMainBtMid from "../assets/images/img-main-bt-mid.png";
import imgMainBtRight from "../assets/images/img-main-bt-right.png";

const MainContent = () => {
  return (
    <main>
      <div className="main-content-container flex flex-col items-center mb-[80px] lg:mb-[120px]">
        <div className="main-content-header mb-[80px] mt-[80px] lg:mb-[120px] lg:mt-[120px] text-center pl-5 pr-5 lg:pl-0 lg:pr-0">
          <h2 className="font-bold text-[24px] leading-[32px] sm:text-[36px] sm:leading-[44px]">
            "Your Pets, Our Priority: Perfect Care, Anytime, Anywhere."
          </h2>
        </div>
        <div className="main-content-body flex flex-col w-full lg:flex-row lg:w-8/12">
          <div className="main-content-text flex flex-col justify-center items-center gap-12">
            <div className="boarding-content w-full pl-6 pr-6 lg:w-8/12 lg:pl-0 lg:pr-0">
              <h3 className="font-bold text-[20px] leading-[28px] sm:text-[24px] sm:leading-[32px] flex flex-row mb-3">
                <img
                  src={blueStar}
                  alt="blue-star"
                  className="w-[24px] h-[24px] mr-2"
                />
                Boarding
              </h3>
              <p className="text-[16px] leading-[28px] sm:text-[18px] sm:leading-[26px] ml-8">
                Your pets stay overnight in your sitter's home. They'll be
                treated like part of the family in a comfortable environment.
              </p>
            </div>
            <div className="house-sitting-content w-full pl-6 pr-6 lg:w-8/12 lg:pl-0 lg:pr-0">
              <h3 className="font-bold text-[20px] leading-[28px] sm:text-[24px] sm:leading-[32px] flex flex-row mb-3">
                <img
                  src={pinkStar}
                  alt="pink-star"
                  className="w-[24px] h-[24px] mr-2"
                />
                House Sitting
              </h3>
              <p className="text-[16px] leading-[28px] sm:text-[18px] sm:leading-[26px] ml-8">
                Your sitter takes care of your pets and your home. Your pets
                will get all the attention they need without leaving home.
              </p>
            </div>
            <div className="dog-walking-content w-full pl-6 pr-6 lg:w-8/12 lg:pl-0 lg:pr-0">
              <h3 className="font-bold text-[20px] leading-[28px] sm:text-[24px] sm:leading-[32px] flex flex-row mb-3">
                <img
                  src={greenStar}
                  alt="green-star"
                  className="w-[24px] h-[24px] mr-2"
                />
                Dog Walking
              </h3>
              <p className="text-[16px] leading-[28px] sm:text-[18px] sm:leading-[26px] ml-8">
                Your dog gets a walk around your neighborhood. Perfect for busy
                days and dogs with extra energy to burn.
              </p>
            </div>
            <div className="drop-in-visits-content w-full pl-6 pr-6 lg:w-8/12 lg:pl-0 lg:pr-0">
              <h3 className="font-bold text-[20px] leading-[28px] sm:text-[24px] sm:leading-[32px] flex flex-row mb-3">
                <img
                  src={yellowStar}
                  alt="yellow-star"
                  className="w-[24px] h-[24px] mr-2"
                />
                Drop-In Visits
              </h3>
              <p className="text-[16px] leading-[28px] sm:text-[18px] sm:leading-[26px] ml-8">
                Your sitter drops by your home to play with your pets, offer
                food, and give potty breaks or clean the litter box.
              </p>
            </div>
          </div>
          <div className="cat-logo-main w-full lg:w-7/12 mt-12 lg:mt-0 flex items-center justify-center pl-5 pr-5 lg:pl-0 lg:pr-0">
            <img
              src={catLogo}
              alt="Cat being rubbed on the head"
              className="h-auto max-h-[600px]"
            />
          </div>
        </div>
      </div>

      <section className="flex flex-col gap-10 lg:flex-row justify-center items-center my-[40px] mx-[16px] lg:space-x-4 flex-grow">
        {/* Card 1 */}
        <article className="flex flex-col items-center w-full lg:max-w-[416px] mb-[40px] sm:mb-[0]">
          <figure className="w-[200px] h-[200px] lg:w-[268px] lg:h-[268px] mb-[46px] mx-[71.5] lg:mx-[76]">
            <img
              src={imgMainBtLeft}
              alt="logo"
              className="w-full h-full object-cover rounded-full"
            />
          </figure>
          <header className="text-center mx-[24px]">
            <h3 className="text-black text-[24px] leading-[32px] font-bold mb-[12px]">
              <span className="text-secondarygreen-200">Connect</span> With
              Sitters
            </h3>
            <p className="text-primarygray-500 text-[18px] leading-[26px] font-medium ">
              Find a verified and reviewed sitter who’ll keep your pets company
              and give time.
            </p>
          </header>
        </article>
        {/* Card 2 */}
        <article className="flex flex-col items-center w-full lg:max-w-[416px] mb-[40px] sm:mb-[0]">
          <figure className="w-[200px] h-[200px] lg:w-[268px] lg:h-[268px] mb-[46px] mx-[71.5] lg:mx-[76]">
            <img
              src={imgMainBtMid}
              alt="logo"
              className="w-full h-full object-cover rounded-full"
            />
          </figure>
          <header className="text-center mx-[24px]">
            <h3 className="text-black text-[24px] leading-[32px] font-bold mb-[12px]">
              <span className="text-secondaryblue-200">Better</span> For Your
              Pets
            </h3>
            <p className="text-primarygray-500 text-[18px] leading-[26px] font-medium">
              Pets stay happy at home with a sitter who gives them loving care
              and companionship.
            </p>
          </header>
        </article>
        {/* Card 3 */}
        <article className="flex flex-col items-center  w-full lg:max-w-[416px] mb-[40px] sm:mb-[0]">
          <figure className="w-[200px] h-[200px] lg:w-[268px] lg:h-[268px] mb-[46px] mx-[71.5] lg:mx-[76]">
            <img
              src={imgMainBtRight}
              alt="logo"
              className="w-full h-full object-cover rounded-full"
            />
          </figure>
          <header className="text-center mx-[24px]">
            <h3 className="text-black text-[24px] leading-[32px] font-bold mb-[12px]">
              <span className="text-primaryorange-500">Calling</span> All Pets
            </h3>
            <p className="text-primarygray-500 text-[18px] leading-[26px] font-medium">
              {" "}
              Stay for free with adorable animals in unique homes around the
              world.
            </p>
          </header>
        </article>
      </section>
    </main>
  );
};

export default MainContent;
