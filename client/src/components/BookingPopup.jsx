import React, { useState } from "react";
import cross from "../assets/svgs/icons/icon-cross.svg";
import clock from "../assets/svgs/icons/icon-clock.svg";
import CustomDatePicker from "./cards/CustomDatePicker ";
import CustomTimePicker from "./cards/CustomTimePicker";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import axios from "axios";
import { SERVER_API_URL } from "../core/config.mjs";

const BookingPopup = ({
  showModal,
  setShowModal,
  text,
  booking,
  onConfirm,
  selectedBookingId, // receive selectedBookingId as a prop
}) => {
  const { setItem } = useLocalStorage();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleContinue = async () => {
    const formattedDate = formatDate(selectedDate);
    setItem("bookingDate", formattedDate);
    setItem("bookingStart", startTime);
    setItem("bookingEnd", endTime);

    const bookingData = {
      bookingId: selectedBookingId, // use selectedBookingId here
      bookingDate: formattedDate, // Send date as ISO string
      bookingStart: startTime,
      bookingEnd: endTime
    };
    console.log(bookingData);

    try {
      if (onConfirm) {
        await axios.put(`${SERVER_API_URL}/booking-history/update-booking`, bookingData);
        onConfirm();
      } else {
        navigate("/booking");
      }
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };


  if (!showModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center lg:items-center items-start z-50 pt-[24px] lg:pt-0">
      <div className="bg-white rounded-t-[16px] lg:rounded-[16px] w-full max-w-[560px] mx-auto flex flex-col h-[calc(100vh-24px)]  lg:h-[438px]">
        <div className="flex justify-between border-b-[1px] p-[16px] gap-[10px] lg:py-[24px] lg:px-[40px] items-center lg:max-h-[80px]">
          <h1 className="text-primarygray-600 text-[20px] leading-[28px] lg:text-[24px] lg:leading-[32px] font-bold">
            {text}
          </h1>
          <img
            src={cross}
            className="w-[24px] h-[24px] cursor-pointer"
            onClick={() => setShowModal(false)}
            alt="Close"
          />
        </div>
        <div className="flex flex-col justify-between flex-grow py-[24px] px-[16px] lg:p-[40px] lg:gap-[60px]">
          <div className="flex flex-col gap-[12px] lg:gap-[24px]">
            <p className="text-primarygray-600 text-[16px] leading-[28px] lg:text-[18px] lg:leading-[26px] font-medium">
              Select date and time you want to schedule the service.
            </p>
            <CustomDatePicker
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
            <div className="flex gap-[12px] lg:gap-[16px] items-center">
              <img src={clock} alt="Clock" />
              <div className="flex gap-[8px] items-center w-full">
                <div className="w-full">
                  <CustomTimePicker
                    selectedDate={selectedDate} // ส่ง selectedDate เป็น props
                    selectedTime={startTime}
                    setSelectedTime={setStartTime}
                  />
                </div>
                <p className="text-primarygray-400 text-[16px] leading-[24px] font-normal">
                  -
                </p>
                <div className="w-full">
                  <CustomTimePicker
                    selectedDate={selectedDate} // ส่ง selectedDate เป็น props
                    selectedTime={endTime}
                    setSelectedTime={setEndTime}
                    minTime={startTime ? startTime.value : null} // กำหนด minTime เป็น startTime
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="btn-primary flex-shrink-0"
            onClick={handleContinue}
          >
            {booking}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPopup;