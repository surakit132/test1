import leftIllustration from "../../assets/images/left-illustration.png";
import rightIllustration from "../../assets/images/right-illustration.png";
import BookingInfo from "../../components/booking/BookingInfo";
import axios from "axios";
import { SERVER_API_URL } from "../../core/config.mjs";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const BookingConfirmationPage = () => {
  const { removeItem } = useLocalStorage();

  const [bookingInformation, setBookingInformation] = useState();
  const [loading, setLoading] = useState(true);

  const removeKeyLocalStorage = () => {
    removeItem("petSitterId");
    removeItem("petSitterFirstname");
    removeItem("petSitterLastname");
    removeItem("bookingDate");
    removeItem("bookingStart");
    removeItem("bookingEnd");
  };

  const getBookingInformationData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${SERVER_API_URL}/bookings/information`
      );
      console.log(response.data.data);

      setBookingInformation(response.data.data);
    } catch (error) {
      console.error("Error fetching booking information:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookingInformationData();
    removeKeyLocalStorage();
  }, []);

  if (loading) {
    return <span className="loading loading-dots loading-lg"></span>;
  }

  console.log("booking information", bookingInformation);

  return (
    <section className="overflow-hidden bg-[#F6F6F9] relative md:shadow-md md:pt-10 md:px-20 md:flex md:flex-col md:gap-10 md:justify-center md:items-center min-h-[calc(100dvh-72px)]">
      <div className="hidden z-0 absolute top-1 left-1 md:w-[288px] md:h-[337px] md:block">
        <img src={leftIllustration} alt="image-illustration" />
      </div>
      {bookingInformation ? (
        <BookingInfo bookingInformation={bookingInformation} />
      ) : (
        <div className="hidden z-10 text-4xl md:block">
          No booking information found
        </div>
      )}
      <div className="hidden z-0 absolute bottom-1 right-1 md:w-[311px] md:h-[465px] md:block">
        <img src={rightIllustration} alt="image-illustration" />
      </div>
    </section>
  );
};

export default BookingConfirmationPage;
