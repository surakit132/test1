import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import calendar from "../../assets/svgs/icons/icon-calendar.svg";

const CustomDatePicker = ({ selectedDate, setSelectedDate }) => {
  const [minDate, setMinDate] = useState(new Date());

  useEffect(() => {
    const today = new Date();
    setMinDate(today);
  }, []);

  return (
    <div className="flex items-center gap-[12px] lg:gap-[16px]">
      <img src={calendar} alt="Calendar" />
      <div className="flex-grow w-full">
        <DatePicker
          selected={selectedDate} // ใช้ selectedDate จาก props
          onChange={(date) => setSelectedDate(date)} // ใช้ setSelectedDate จาก props
          className="text-black font-normal border-primarygray-200 border rounded-[8px] py-[12px] pr-[16px] pl-[12px] w-full max-h-[48px] placeholder-gray-400"
          calendarClassName="custom-calendar"
          wrapperClassName="w-full"
          placeholderText="Select Date"
          minDate={minDate} // ไม่สามารถเลือกวันในอดีตได้
          dateFormat="dd MMM, yyyy"
        />
      </div>
    </div>
  );
};

export default CustomDatePicker;
