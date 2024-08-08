import AccountMenu from "../components/cards/AccountMenu";
import BookingHistory from "../components/booking-history/BookingHistory";
// import AccountMenu2 from "../components/booking-history/AccountMenu2"

const BookingHistoryPage = () => {
  return (
    <>
      <div className="bg-gray-100  flex flex-col min-h-[calc(100dvh-72px)] lg:flex-row  lg:pt-[40px] lg:pb-[80px] lg:px-[80px] lg:gap-[40px] ">
        <AccountMenu />
        {/* <AccountMenu2 /> */}
        <BookingHistory />
      </div>
    </>
  );
};

export default BookingHistoryPage;
