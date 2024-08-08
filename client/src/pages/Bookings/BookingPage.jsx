import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useAuth } from "../../contexts/authentication";
import { SERVER_API_URL } from "../../core/config.mjs";
import FormNavigation from "../../components/booking/FormNavigation";
import BookingForms from "../../components/booking/BookingForms";
import BookingIllustrations from "../../components/booking/BookingIllustrations";
import BookingSummary from "../../components/booking/BookingSummary";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PB_KEY);

const BookingPage = () => {
  const { state } = useAuth();
  const user_id = state.user.id;

  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formList = ["Your Pet", "Information", "Payment"];

  const { getItem } = useLocalStorage();
  const petSitterId = getItem("petSitterId");
  const petSitterFirstname = getItem("petSitterFirstname");
  const petSitterLastname = getItem("petSitterLastname");
  const bookingDate = getItem("bookingDate");
  const bookingStart = getItem("bookingStart");
  const bookingEnd = getItem("bookingEnd");

  const createDateWithTime = (timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
    return totalMinutes;
  };

  const [bookingData, setBookingData] = useState({
    user_id: Number(user_id) || "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    booking_date: bookingDate?.slice(0, 10) || "",
    booking_time_start: [
      createDateWithTime(bookingStart?.value || ""),
      bookingStart?.label || "",
    ],
    booking_time_end: [
      createDateWithTime(bookingEnd?.value || ""),
      bookingEnd?.label || "",
    ],
    pet_sitter_id: Number(petSitterId) || "",
    pet_sitter_firstname: petSitterFirstname || "",
    pet_sitter_lastname: petSitterLastname || "",
    pet_id: [],
    pet_name: [],
    status: "Waiting for confirm",
    message: "",
    card_owner: "",
  });

  const [petData, setPetData] = useState();

  const getPetProfileData = async () => {
    const userId = state.user.id;

    try {
      const response = await axios.get(`${SERVER_API_URL}/user/pet/${userId}`);
      setPetData(response.data.data);
    } catch (error) {
      console.error("Error fetching pet profile data:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getUserProfileData = async (userId) => {
    try {
      const response = await axios.get(
        `${SERVER_API_URL}/user/profile/${userId}`
      );

      if (response.data && response.data.data) {
        const userProfileData = response.data.data;

        setBookingData({
          user_id: Number(user_id) || "",
          first_name: userProfileData.firstname || "",
          last_name: userProfileData.lastname || "",
          email: userProfileData.email || "",
          phone_number: userProfileData.phone_number || "",
          booking_date: bookingDate?.slice(0, 10) || "",
          booking_time_start: [
            createDateWithTime(bookingStart?.value || ""),
            bookingStart?.label || "",
          ],
          booking_time_end: [
            createDateWithTime(bookingEnd?.value || ""),
            bookingEnd?.label || "",
          ],
          pet_sitter_id: Number(petSitterId) || "",
          pet_sitter_firstname: petSitterFirstname || "",
          pet_sitter_lastname: petSitterLastname || "",
          pet_id: [],
          pet_name: [],
          status: "Waiting for confirm",
          message: "",
          card_owner: "",
        });
      } else {
        setBookingData({
          user_id: Number(user_id) || "",
          first_name: "",
          last_name: "",
          email: "",
          phone_number: "",
          booking_date: bookingDate?.slice(0, 10) || "",
          booking_time_start: [
            createDateWithTime(bookingStart?.value || ""),
            bookingStart?.label || "",
          ],
          booking_time_end: [
            createDateWithTime(bookingEnd?.value || ""),
            bookingEnd?.label || "",
          ],
          pet_sitter_id: Number(petSitterId) || "",
          pet_sitter_firstname: petSitterFirstname || "",
          pet_sitter_lastname: petSitterLastname || "",
          pet_id: [],
          pet_name: [],
          status: "Waiting for confirm",
          message: "",
          card_owner: "",
        });
      }
    } catch (error) {
      console.error("Error fetching user profile data:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPetProfileData(user_id);
    getUserProfileData(user_id);
  }, []);

  const handleNext = () => {
    setPage((prevPage) =>
      prevPage === formList.length - 1 ? 0 : prevPage + 1
    );
  };

  const handlePrev = () => {
    setPage((prevPage) =>
      prevPage === 0 ? formList.length - 1 : prevPage - 1
    );
  };

  console.log(bookingData);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <Elements stripe={stripePromise}>
      <section className="overflow-hidden bg-[#F6F6F9] relative md:pt-10 md:px-20 md:flex md:justify-center md:gap-9 min-h-[calc(100dvh-72px)]">
        <div className="flex flex-col gap-4 flex-auto z-0">
          <FormNavigation formList={formList} page={page} />
          <div className="md:bg-white md:rounded-2xl">
            <BookingForms
              page={page}
              petData={petData}
              bookingData={bookingData}
              setBookingData={setBookingData}
              handlePrev={handlePrev}
              handleNext={handleNext}
            />
          </div>
        </div>
        <BookingIllustrations />
        <div className="hidden md:block">
          <BookingSummary bookingData={bookingData} />
        </div>
      </section>
    </Elements>
  );
};

export default BookingPage;
