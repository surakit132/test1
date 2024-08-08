import { useState, useEffect } from "react";
import iconStar from "../assets/svgs/star1.svg";
import iconCurveBlue from "../assets/svgs/curve-blue.svg";
import Navbar from "../components/navbar/Navbar";
import PetForm from "../components/forms/PetForm";
import InfomationForm from "../components/forms/InfomationForm";
import PayMentForm from "../components/forms/PayMentForm";
import BookingDetail from "../components/cards/BookingDetail";

const BookingPage = () => {
  const formList = ["Your Pet", "Infomation", "Payment"];
  const formLength = formList.length;

  const [width, setWidth] = useState(window.innerWidth);
  const [page, setPage] = useState(0);

  const handlePrev = () => {
    setPage(page === 0 ? formLength - 1 : page - 1);
  };

  const handleNext = () => {
    setPage(page === formLength - 1 ? 0 : page + 1);
  };

  const handleForm = () => {
    switch (page) {
      case 0: {
        return <PetForm />;
      }
      case 1: {
        return <InfomationForm />;
      }
      case 2: {
        return <PayMentForm />;
      }
      default:
        return null;
    }
  };

  const handleSubmit = async () => {};

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="overflow-hidden bg-[#F6F6F9] relative md:pt-10 md:px-20  md:flex md:justify-center md:gap-9 min-h-[calc(100dvh-72px)]">
      <div className="flex flex-col gap-4 flex-auto z-0">
        <ul className="bg-white flex justify-around p-4 md:rounded-2xl md:p-6 md:gap-12 md:justify-center">
          {formList.map((form, index) => (
            <li key={index} className="flex justify-center items-center gap-3">
              <div
                className={`size-7 rounded-full bg-[#F6F6F9] flex items-center justify-center md:size-12 ${
                  page === index
                    ? "bg-[#FF7037] text-white"
                    : index < page
                    ? "bg-black text-[#FF7037]"
                    : null
                }`}
              >
                {index + 1}
              </div>
              <p className="text-[14px] leading-[24px] md:text-[18px] md:leading-[26px]">
                {form}
              </p>
            </li>
          ))}
        </ul>

        <div className="md:bg-white md:rounded-2xl">
          {handleForm()}

          {width <= 768 && (
            <div className="z-0 w-full flex justify-center bg-red-500">
              <BookingDetail />
            </div>
          )}

          <div className="flex justify-between gap-[10px] py-6 px-4 bg-white md:rounded-b-2xl">
            <button className="btn-secondary md:w-[120px]" onClick={handlePrev}>
              Back
            </button>

            {page === 2 ? (
              <button className="btn-primary md:w-[175px]">
                Confirm Booking
              </button>
            ) : (
              <button className="btn-primary md:w-[120px]" onClick={handleNext}>
                Next
              </button>
            )}
          </div>
        </div>
      </div>

      <figure className="hidden md:block absolute md:w-[388px] h-[300px] right-0 bottom-0">
        <img
          src={iconStar}
          alt="icon-star"
          className="rotate-90 absolute -bottom-20"
        />

        <img
          src={iconCurveBlue}
          alt="icon-curve-blue"
          className="absolute right-0"
        />
      </figure>

      {width > 768 && (
        <div className="z-0 w-[396px] rounded-2xl overflow-hidden h-fit min-w-[396px]">
          <BookingDetail />
        </div>
      )}
    </section>
  );
};

export default BookingPage;
