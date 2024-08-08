import { useCalculateBooking } from "../../hooks/useCalculateBooking";

const BookingSummary = ({ bookingData }) => {
  const { formatDate, calculateDuration, calculateTotalCost } =
    useCalculateBooking();

  return (
    <div className="z-0 w-[396px] rounded-2xl overflow-hidden h-fit min-w-[396px]">
      <section className="w-full bg-white">
        <h1 className="text-[20px] leading-[28px] font-bold p-4 border-b md:text-2xl">
          Booking Detail
        </h1>

        <ul className="py-6 px-4 list-detail gap-4">
          <li className="list-detail">
            <span className="text-[#7B7E8F] text-[14px] leading-[24px] font-medium">
              Pet Sitter:
            </span>
            <span className="text-[#3A3B46] text-[16px] leading-[28px] font-medium">
              {`${bookingData.pet_sitter_firstname} ${bookingData.pet_sitter_lastname}`}
            </span>
          </li>
          <li className="list-detail">
            <span className="text-[#7B7E8F] text-[14px] leading-[24px] font-medium">
              Date & Time:
            </span>
            <span className="text-[#3A3B46] text-[16px] leading-[28px] font-medium">
              {`${formatDate(bookingData.booking_date)} | ${
                bookingData.booking_time_start[1]
              } ${bookingData.booking_time_end[1]}`}
            </span>
          </li>
          <li className="list-detail">
            <span className="text-[#7B7E8F] text-[14px] leading-[24px] font-medium">
              Duration:
            </span>
            <span className="text-[#3A3B46] text-[16px] leading-[28px] font-medium">
              {calculateDuration(
                bookingData.booking_time_start[0],
                bookingData.booking_time_end[0]
              )}
            </span>
          </li>
          <li className="list-detail">
            <span className="text-[#7B7E8F] text-[14px] leading-[24px] font-medium">
              Pet:
            </span>
            <span className="text-[#3A3B46] text-[16px] leading-[28px] font-medium">
              {bookingData.pet_name.length > 0
                ? bookingData.pet_name.join(", ")
                : "-"}
            </span>
          </li>
        </ul>

        <ul className="bg-black p-4">
          <li className="flex justify-between">
            <span className="text-white text-[16px] leading-[28px] font-medium">
              Total
            </span>
            <span className="text-white text-[16px] leading-[28px] font-medium">
              {`${calculateTotalCost(
                bookingData.pet_name,
                bookingData.booking_time_start,
                bookingData.booking_time_end
              )} THB`}
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default BookingSummary;
