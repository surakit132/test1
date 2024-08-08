import { useCalculateBooking } from "../../hooks/useCalculateBooking";
import { useNavigate } from "react-router-dom";

const BookingInfo = ({ bookingInformation }) => {
  const { duration } = useCalculateBooking();
  const navigate = useNavigate();

  const durationTime = parseInt(bookingInformation.total_minutes || 0);

  return (
    <>
      <div className="z-10">
        <div className="bg-black p-6 flex flex-col justify-center items-center gap-2 md:min-w-[632px] md:rounded-t-2xl">
          <h1 className="text-[20px] leading-[28px] text-white font-bold md:text-[36px] md:leading-[44px]">
            Thank You For Booking
          </h1>
          <p className="text-[#AEB1C3] text-[14px] leading-[24px] font-medium md:text-[16px] md:leading-[28px]">
            We will send your booking information to Pet Sitter.
          </p>
        </div>
        <ul className="list-detail bg-white p-10 gap-4 md:rounded-b-2xl md:min-w-[632px]">
          <li className="list-detail">
            <span className="text-[#AEB1C3] text-[14px] leading-[24px]">
              Transaction Date: {bookingInformation.payment_created_at}
            </span>
            <span className="text-[#AEB1C3] text-[14px] leading-[24px]">
              Transaction No: {bookingInformation.transaction_number}
            </span>
          </li>
          <li className="list-detail">
            <span className="text-[#7B7E8F] text-[14px] leading-[24px] font-medium">
              Pet Sitter:
            </span>
            <span className="text-[#3A3B46] text-[16px] leading-[28px] font-medium">
              {`${bookingInformation.firstname} ${bookingInformation.lastname}`}
            </span>
          </li>
          <li className="flex flex-wrap justify-start gap-6">
            <div className="flex flex-col">
              <span className="text-[#7B7E8F] text-[14px] leading-[24px] font-medium">
                Date & Time:
              </span>
              <span className="text-[#3A3B46] text-[16px] leading-[28px] font-medium">
                {`${bookingInformation.booking_date} | ${bookingInformation.booking_time_start} - ${bookingInformation.booking_time_end}`}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#7B7E8F] text-[14px] leading-[24px] font-medium">
                Duration:
              </span>
              <span className="text-[#3A3B46] text-[16px] leading-[28px] font-medium">
                {duration(durationTime)}
              </span>
            </div>
          </li>
          <li className="list-detail">
            <span className="text-[#7B7E8F] text-[14px] leading-[24px] font-medium">
              Pet:
            </span>
            <span className="text-[#3A3B46] text-[16px] leading-[28px] font-medium">
              {bookingInformation.pet_names}
            </span>
          </li>
          <li className="flex justify-between border-t pt-4">
            <span className="text-black text-[16px] leading-[28px] font-medium">
              Total
            </span>
            <span className="text-black text-[16px] leading-[28px] font-medium">
              {bookingInformation.amount} THB
            </span>
          </li>
        </ul>
      </div>

      <div className="z-10 flex justify-center items-center gap-4 py-6 px-4 md:py-0 md:px-0">
        <button
          onClick={() => navigate("/user/booking-history")}
          className="bg-[#FFF1EC] text-[#FF7037] text-base font-bold py-3 px-6 rounded-full"
        >
          Booking Detail
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-[#FF7037] text-white text-base font-bold py-3 px-6 rounded-full"
        >
          Back To Home
        </button>
      </div>
    </>
  );
};

export default BookingInfo;
