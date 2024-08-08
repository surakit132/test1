import girl from "../../assets/images/girl.png";
import greenCircle from "../../assets/svgs/icons/icon-green-circle.svg";
import changeIcon from "../../assets/svgs/icons/icon-change.svg";
import line from "../../assets/svgs/icons/icon-line.svg";
import phone from "../../assets/svgs/icons/icon-phone.svg";

const BookingHistorySuccess = () => {
  return (
    <div className="flex gap-[24px] ">
      <div className="flex flex-col  border-primarygray-200 border rounded-[16px] p-[16px] lg:p-[24px] gap-[16px] lg:gap-[36px] w-full">
        <div className="flex flex-col gap-[16px]">
          <div className="flex flex-col lg:flex-row   border-primarygray-200 border-b pb-[16px] gap-[8px] lg:gap-[16px] ">
            <div className="flex gap-[16px]">
              <img
                src={girl}
                alt="girl"
                className="w-[36px] h-[36px] lg:w-[64px] lg:h-[64px]"
              />
              <div className="flex flex-col  lg:gap-[4px] ">
                <p className="text-black text-[24px] leading-[32px] font-bold">
                  Happy House!
                </p>
                <p className="text-black text-18px leading-[26px] font-medium">
                  By Jane Maison
                </p>
              </div>
            </div>
            <div className="flex flex-col lg:items-end lg:gap-[12px] lg:ml-auto">
              <p className="text-primarygray-300 text-[14px] leading-[24px]  ">
                Transaction date: Tue, 16 Aug 2023
              </p>
              <div className="flex gap-[8px] items-center ">
                <img
                  src={greenCircle}
                  alt="circle"
                  className="w-[6px] h-[6px]"
                />
                <p className="text-secondarygreen-200  text-[16px] leading-[24px] font-medium">
                  Waiting for confirm
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-[16px] lg:gap-[32px] ">
            <div className="flex flex-col lg:w-[382px]">
              <p className="text-primarygray-400  text-[14px] leading-[24px] font-medium">
                Date & Time:
              </p>
              <div className="flex gap-[12px]">
                <p>25 Aug, 2023</p>
                <p>|</p>
                <p>7 AM - 10 AM</p>
                <button
                  type="button"
                  className="hidden rounded-[99px] py-[4px] px-[2px] gap-[4px] "
                >
                  <img src={changeIcon} alt="pencil" />
                  <p className="text-primaryorange-500 text-[16px] leading-[24px] font-bold">
                    Change
                  </p>
                </button>
              </div>
            </div>
            <img
              src={line}
              alt="line"
              className="hidden lg:flex border w-[1px] "
            />
            <div className="flex flex-col lg:flex-row gap-[16px] lg:gap-[32px] lg:w-[382px]  ">
              <div className="flex flex-col w-full    ">
                <p className="text-primarygray-400 text-[14px] leading-[24px] font-medium">
                  Duration
                </p>
                <p className="text-primarygray-600 text-[16px] leading-[28px] font-medium">
                  3 hours
                </p>
              </div>
              <img
                src={line}
                alt="line"
                className="hidden lg:flex border w-[1px]"
              />
              <div className="flex flex-col w-full">
                <p className="text-primarygray-400 text-[14px] leading-[24px] font-medium ">
                  Pet:
                </p>
                <p className="text-primarygray-600 text-[16x] leading-[28px] font-medium ">
                  Bubba, Daisy
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-secondarygreen-100  flex flex-col lg:flex-row p-[16px] gap-[8px] lg:gap-[16px] rounded-[8px] lg:h-[80px]">
          <p className="text-secondarygreen-200  flex items-center text-[14px]  leading-[24px] font-medium  ">
            Success date: <br /> Tue, 26 Apr 2023 | 11:03 AM
          </p>
          <div className="flex gap-[36px] lg:ml-auto ">
            <button
              type="button"
              className="flex rounded-[99px] py-[4px] px-[2px] gap-[4px] "
            >
              <p className="text-primaryorange-500  text-[16px] leading-[24px] font-bold">
                Report
              </p>
            </button>
            <button
              type="button"
              className="bg-primaryorange-100 flex rounded-[99px] py-[12px] px-[24px] gap-[8px] "
            >
              <p className="text-white text-[16px] leading-[24px] font-bold">
                Your Review
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingHistorySuccess;
