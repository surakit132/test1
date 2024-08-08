import BookingSummary from "../booking/BookingSummary";

const InfomationForm = ({ onPrev, onNext, bookingData, setBookingData }) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBookingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    onNext();
  };

  return (
    <form
      className="flex flex-col gap-4 py-10 px-4 rounded-2xl md:bg-white md:p-10"
      onSubmit={onSubmit}
    >
      <div className="flex flex-wrap gap-4 md:gap-10">
        <div className="w-full flex flex-col gap-1 md:flex-1">
          <label htmlFor="firstname" className="input-label">
            First Name*
          </label>
          <input
            type="text"
            name="first_name"
            placeholder="First name"
            className="input-box"
            value={bookingData.first_name || ""}
            onChange={handleInputChange}
          />
        </div>

        <div className="w-full flex flex-col flex-1 gap-1 md:flex-1">
          <label htmlFor="lastname" className="input-label">
            Last Name*
          </label>
          <input
            type="text"
            name="last_name"
            placeholder="Last name"
            className="input-box"
            value={bookingData.last_name || ""}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 md:gap-10">
        <div className="w-full flex flex-col gap-1 md:flex-1">
          <label htmlFor="email" className="input-label">
            Email*
          </label>
          <input
            type="email"
            name="email"
            placeholder="youremail@company.com"
            className="input-box"
            value={bookingData.email || ""}
            onChange={handleInputChange}
          />
        </div>

        <div className="w-full flex flex-col flex-1 gap-1 md:flex-1">
          <label htmlFor="phone" className="input-label">
            Phone*
          </label>
          <input
            type="tel"
            name="phone_number"
            placeholder="xxx-xxx-xxxx"
            className="input-box"
            value={bookingData.phone_number || ""}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="w-full flex flex-col flex-1 gap-1 mt-5 border-t-[1px] md:flex-1">
        <label htmlFor="message" className="input-label mt-8">
          Additional Message (To pet sitter)
        </label>
        <textarea
          type="text"
          name="message"
          className="input-box resize-none h-[140px]"
          value={bookingData.message || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="w-full md:hidden">
        <BookingSummary bookingData={bookingData} />
      </div>

      <div className="flex justify-between gap-[10px] py-6 px-4 bg-white md:rounded-b-2xl">
        <button
          type="button"
          className="btn-secondary md:w-[120px]"
          onClick={onPrev}
        >
          Back
        </button>

        <button type="submit" className="btn-primary md:w-[120px]">
          Next
        </button>
      </div>
    </form>
  );
};

export default InfomationForm;
