import PetForm from "../forms/PetForm";
import InfomationForm from "../forms/InfomationForm";
import PayMentForm from "../forms/PayMentForm";

const BookingForms = ({
  page,
  petData,
  bookingData,
  setBookingData,
  handlePrev,
  handleNext,
  setIsModalOpen,
}) => {
  switch (page) {
    case 0:
      return (
        <PetForm
          onPrev={handlePrev}
          onNext={handleNext}
          petData={petData}
          bookingData={bookingData}
          setBookingData={setBookingData}
        />
      );
    case 1:
      return (
        <InfomationForm
          onPrev={handlePrev}
          onNext={handleNext}
          bookingData={bookingData}
          setBookingData={setBookingData}
        />
      );
    case 2:
      return (
        <PayMentForm
          onPrev={handlePrev}
          bookingData={bookingData}
          setBookingData={setBookingData}
        />
      );
    default:
      return null;
  }
};

export default BookingForms;
