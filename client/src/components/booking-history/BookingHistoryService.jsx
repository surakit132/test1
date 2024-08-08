/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import changeIcon from "../../assets/svgs/icons/icon-change.svg";
import changeIconWhite from "../../assets/svgs/icons/icon-change-white.svg";
import phone from "../../assets/svgs/icons/icon-phone.svg";
import { SERVER_API_URL } from "../../core/config.mjs";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useSocket } from "../../contexts/socket";
import { useAuth } from "../../contexts/authentication";
import ModalPopup from "../BookingPopup";
import BookingHistoryDetailPopup from "../BookingHistoryDetailPopup";
import ChangeDateSuccessPopup from "../ChangeDateSuccessPopup ";

const BookingHistoryService = ({
  setShowRating,
  setShowReview,
  setReviewData,
  setShowReport,
}) => {
  const { setItem } = useLocalStorage();

  const [bookings, setBookings] = useState([]);
  const [reviewedBookings, setReviewedBookings] = useState({});
  const { joinChatRoom, chatRoomList, setChatRoomList } = useSocket();
  const { state } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null); // State for selected booking ID
  const [showSuccess, setShowSuccess] = useState(false); // State สำหรับแสดง ChangeDateSuccessPopup

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${SERVER_API_URL}/booking-history`);

        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching booking history:", error);
      }
    };

    fetchBookings();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Waiting for service":
        return "#FFCA62";
      case "Waiting for confirm":
        return "#FA8AC0";
      case "In service":
        return "#76D0FC";
      case "Success":
        return "#1CCD83";
      case "Canceled":
        return "#EA1010";
      default:
        return "#000000";
    }
  };

  const getStatusMessage = (status, formattedUpdatedAt) => {
    switch (status) {
      case "Waiting for confirm":
        return "Waiting Pet Sitter for confirm booking";
      case "Waiting for service":
        return "Pet Sitter is confirm booking";
      case "In service":
        return "Your pet is already in Pet Sitter care!";
      case "Success":
        return (
          <>
            Success date:
            <br />
            {formattedUpdatedAt}
          </>
        );
      case "Canceled":
        return "Booking has canceled";
      default:
        return "";
    }
  };

  const handleYouReviewClick = () => {
    setShowReview(true);
  };

  const handleReportClick = () => {
    setShowReport(true);
  };

  const calculateDuration = (start, end) => {
    const parseTime = (time) => {
      let [hours, minutes] = time.split(/[: ]/).map(Number);
      if (time.includes("PM") && hours !== 12) hours += 12;
      if (time.includes("AM") && hours === 12) hours = 0;
      return hours * 60 + minutes;
    };

    const totalMinutes = parseTime(end) - parseTime(start);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours} hours${minutes > 0 ? ` ${minutes} minutes` : ""}`;
  };

  const handleReviewClick = (bookingId) => {
    setReviewedBookings((prev) => ({ ...prev, [bookingId]: true }));
    setItem("bookingId", bookingId);
    setShowRating(true);
    const selectedBooking = bookings.find(
      (booking) => booking.booking_id === bookingId
    );
    console.log(selectedBooking);
    if (selectedBooking) {
      setReviewData({
        pet_sitter_id: selectedBooking.pet_sitter_id,
        firstname: selectedBooking.firstname,
        lastname: selectedBooking.lastname,
        booking_date: selectedBooking.formatted_booking_date,
        profile_image: selectedBooking.profile_image || girl,
      });
    }
  };

  const clearReadCount = (chatRoomId) => {
    const newChatRoomList = [...chatRoomList];
    newChatRoomList.map((chatRoom) => {
      if (chatRoom.chatRoomId === chatRoomId) {
        chatRoom.isReadCount = 0;
        return chatRoom;
      }
      return chatRoom;
    });
    setChatRoomList(newChatRoomList);
  };

  const handleConfirm = () => {
    setShowModal(false);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      window.location.reload(); // Refresh the page after 3 seconds
    }, 1500);
  };

  const openModal = (bookingId) => {
    setSelectedBookingId(bookingId); // Set selected booking ID
    setShowModal(true);
  };

  return (
    <div className="flex flex-col gap-[24px]">
      {bookings.map((booking, index) => (
        <div
          key={index}
          className="flex flex-col border-primarygray-200 border rounded-[16px] p-[16px] 2xl:p-[40px] gap-[16px] 2xl:gap-[36px] w-full"
        >
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col xs:flex-row border-primarygray-200 border-b pb-[16px] gap-[8px] xs:gap-[16px]">
              <div className="flex gap-[16px]">
                <img
                  src={booking.profile_image}
                  alt="Profile"
                  className="w-[36px] h-[36px] xs:w-[64px] xs:h-[64px] rounded-full flex-shrink-0"
                  onClick={() => {
                    setSelectedBookingId(booking.booking_id); // Set selected booking ID
                    setShowDetail(true); // Show detail popup
                  }}
                />
                <div className="flex flex-col xs:gap-[4px]">
                  <p className="text-black text-[24px] leading-[32px] font-bold">
                    {booking.pet_sitter_name}
                  </p>
                  <p className="text-black text-18px leading-[26px] font-medium whitespace-nowrap ">
                    By {booking.firstname} {booking.lastname}
                  </p>
                </div>
              </div>
              <div className="flex flex-col xs:items-end 2xl:gap-[12px] xs:ml-auto whitespace-nowrap">
                <p className="text-primarygray-300 text-[14px] leading-[24px]">
                  Transaction date: {booking.formatted_payment_created_at}
                </p>
                <div className="flex gap-[8px] items-center">
                  <p
                    className="w-[6px] h-[6px] rounded-full inline-block"
                    style={{ backgroundColor: getStatusColor(booking.status) }}
                  ></p>
                  <p
                    className="text-[16px] leading-[24px] font-medium"
                    style={{
                      color: getStatusColor(booking.status),
                    }}
                  >
                    {booking.status}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col 2xl:flex-row gap-[16px] 2xl:gap-[32px] 2xl:items-center">
              <div className="flex flex-col 2xl:w-[382px]">
                <p className="text-primarygray-400 text-[14px] leading-[24px] font-medium">
                  Date & Time:
                </p>
                <div className="flex flex-col xxs:flex-row w-full space-x-0">
                  <div className="flex items-center gap-[12px] flex-grow">
                    <p className="text-primarygray-600 text-[16px] leading-[28px] font-medium whitespace-nowrap">
                      {booking.formatted_booking_date}
                    </p>
                    <p className="text-primarygray-400 text-[16px] leading-[28px] font-medium whitespace-nowrap">
                      |
                    </p>
                    <p className="text-primarygray-600 text-[16px] leading-[28px] font-medium whitespace-nowrap">
                      {booking.formatted_booking_time_start} -{" "}
                      {booking.formatted_booking_time_end}
                    </p>
                  </div>
                  {booking.status === "Waiting for confirm" && (
                    <div className="flex-shrink-0 ">
                      <button
                        type="button"
                        className="inline-flex  items-center rounded-[99px] py-[4px] pl-0 xs:pl-[8px]"
                        onClick={() => openModal(booking.booking_id)}
                      >
                        <img
                          src={changeIcon}
                          alt="Change"
                          className="h-[24px] mr-1 w-[24px]"
                        />
                        <p className="text-primaryorange-500 text-[16px] leading-[24px] font-bold">
                          Change
                        </p>
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <p className="hidden 2xl:block border-l border-primarygray-200 h-[36px]"></p>
              <div className="flex flex-col 2xl:flex-row gap-[16px] 2xl:gap-[32px] 2xl:w-[382px] 2xl:items-center">
                <div className="flex flex-col w-full">
                  <p className="text-primarygray-400 text-[14px] leading-[24px] font-medium">
                    Duration
                  </p>
                  <p className="text-primarygray-600 text-[16px] leading-[28px] font-medium whitespace-nowrap">
                    {calculateDuration(
                      booking.formatted_booking_time_start,
                      booking.formatted_booking_time_end
                    )}
                  </p>
                </div>
                <p className="hidden 2xl:block border-l border-primarygray-200 h-[36px]"></p>
                <div className="flex flex-col w-full">
                  <p className="text-primarygray-400 text-[14px] leading-[24px] font-medium">
                    Pet:
                  </p>
                  <p className="text-primarygray-600 text-[16px] leading-[28px] font-medium">
                    {booking.pet_names.join(", ")}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${
              booking.status === "Success" ? "bg-[#E7FDF4]" : "bg-gray-100"
            } flex flex-col xs:flex-row p-[16px] gap-[8px] xs:gap-[16px] rounded-[8px] xs:h-[80px] `}
          >
            <p
              className={`${
                booking.status === "Success"
                  ? "text-[#1CCD83]"
                  : "text-primarygray-400"
              } flex items-center text-[14px] leading-[24px] font-medium`}
            >
              {getStatusMessage(booking.status, booking.formatted_updated_at)}
            </p>
            <div className="flex gap-[16px] xs:ml-auto">
              {booking.status === "Success" ? (
                <div className="flex  gap-[16px] xs:gap-[36px] items-center ">
                  <button
                    type="button"
                    className="flex rounded-[99px] py-[4px] px-[2px] gap-[4px]"
                    onClick={() => handleReportClick(booking.booking_id)}
                  >
                    <p className="text-primaryorange-500 text-[16px] leading-[24px] font-bold">
                      Report
                    </p>
                  </button>
                  {reviewedBookings[booking.booking_id] ? (
                    <button
                      type="button"
                      className="bg-primaryorange-100 flex rounded-[99px] py-[12px] px-[24px] gap-[8px]"
                      onClick={() => handleYouReviewClick(booking.booking_id)}
                    >
                      <p className="text-primaryorange-500 text-[16px] leading-[24px] font-bold">
                        Your Review
                      </p>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="bg-primaryorange-500 flex rounded-[99px] py-[12px] px-[24px] gap-[8px]"
                      onClick={() => handleReviewClick(booking.booking_id)}
                    >
                      <p className="text-white text-[16px] leading-[24px] font-bold">
                        Review
                      </p>
                    </button>
                  )}
                </div>
              ) : booking.status !== "Waiting for confirm" &&
                booking.status !== "Canceled" ? (
                <>
                  <button
                    type="button"
                    className="bg-primaryorange-500 flex rounded-[99px] py-[12px] px-[24px] gap-[8px] whitespace-nowrap"
                    onClick={() => {
                      const chatRoomId = `${state.user.id}/${booking.pet_sitter_id}`;
                      const targetId = Number(booking.pet_sitter_id);
                      joinChatRoom({ chatRoomId, targetId });
                      clearReadCount(chatRoomId);
                    }}
                  >
                    <p className="text-white text-[16px] leading-[24px] font-bold">
                      Send Message
                    </p>
                  </button>
                  <button
                    type="button"
                    className="flex bg-primaryorange-100 rounded-[99px] py-[12px] px-[12px] gap-[8px] w-[48px] h-[48px]"
                  >
                    <img src={phone} alt="phone" />
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      ))}
      <ModalPopup
        showModal={showModal}
        setShowModal={setShowModal}
        text={"Change date"}
        booking={"Confirm"}
        onConfirm={handleConfirm}
        selectedBookingId={selectedBookingId} // Pass selected booking ID to popup
      />
      <BookingHistoryDetailPopup
        showDetail={showDetail}
        setShowDetail={setShowDetail}
        bookingId={selectedBookingId} // Pass selected booking ID to popup
      />
      {showSuccess && (
        <ChangeDateSuccessPopup
          showModal={showSuccess}
          setShowModal={setShowSuccess}
        />
      )}
    </div>
  );
};

export default BookingHistoryService;
