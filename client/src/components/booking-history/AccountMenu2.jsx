//ไม่ได้ใช้
import iconProfile from "../../assets/svgs/icons/icon-profile.svg";
import iconYourPet from "../../assets/svgs/icons/icon-your-pet.svg";
import iconBooking from "../../assets/svgs/icons/icon-booking.svg";

const AccountMenu2 = () => {
  return (
    <div className="bg-white flex lg:flex-col overflow-hidden shadow-[4px_4px_24px_0px_rgba(0,0,0,0.04)] lg:rounded-[16px] lg:py-[24px] lg:px-0 lg:w-full lg:max-w-[284px] lg:max-h-[289px] items-center lg:items-start ">
      <div className="hidden lg:flex py-[20px] px-[24px] gap-[12px] lg:pt-0 lg:px-[24px] lg:pb-[12px] lg:gap-[10px] min-w-[284px]">
        <p className="text-black text-[20px] leading-[28px] font-bold">
          Account
        </p>
      </div>
      <div className="flex py-[12px] lg:py-[20px] px-[24px] gap-[12px] items-center min-w-[139px] lg:w-full">
        <img src={iconProfile} alt="icon-profile" className="w-[24px] h-[24px]"/>
        <p className="text-primarygray-500 text-[18px] leading-[27px] font-bold">
          Profile
        </p>
      </div>
      <div className="flex py-[12px] lg:py-[20px] px-[24px] gap-[12px] items-center min-w-[154px] lg:w-full">
        <img src={iconYourPet} alt="icon-Your-Pet" className="w-[24px] h-[24px]"/>
        <p className="text-primarygray-500 text-[18px] leading-[27px] font-bold">
          Your Pet
        </p>
      </div>
      <div className="bg-primaryorange-100  flex py-[12px] lg:py-[20px] px-[24px] gap-[12px] items-center min-w-[218px] lg:w-full">
        <img src={iconBooking} alt="icon-profile" className="w-[24px] h-[24px]"/>
        <p className="text-primaryorange-500  text-[18px] leading-[27px] font-bold">
        Booking History
        </p>
      </div>
    </div>
  );
};

export default AccountMenu2;
