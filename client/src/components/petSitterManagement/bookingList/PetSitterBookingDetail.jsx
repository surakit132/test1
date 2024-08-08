import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import prevIcon from "../../../assets/svgs/icons/icon-prev.svg";
import eyeIcon from "../../../assets/svgs/pet-sitter-management/pet-sitter-eye.svg";
import petProfile from "../../../assets/svgs/icons/icon-your-pet-white.svg" 
import { SERVER_API_URL } from "../../../core/config.mjs";
import BookingDetailPopup from "./BookingDetailPopup";
import BookingPetPopup from "./BookingPetPopup";
import CancelConfirmPopup from "./CancelConfirmPopup";
import petSitterOrangeCircle from "../../../assets/svgs/pet-sitter-management/pet-sitter-orangeCircle.svg";
import petSitterBlueCircle from "../../../assets/svgs/pet-sitter-management/pet-sitter-blueCircle.svg";
import petSitterPinkCircle from "../../../assets/svgs/pet-sitter-management/pet-sitter-pinkCircle.svg";
import petSitterGreenCircle from "../../../assets/svgs/pet-sitter-management/pet-sitter-greenCircle.svg";
import petSitterRedCircle from "../../../assets/svgs/pet-sitter-management/pet-sitter-redCircle.svg";
import { useSocket } from "../../../contexts/socket";
import { useAuth } from "../../../contexts/authentication";
import { Link } from "react-router-dom";

const statusIcons = {
  "Waiting for confirm": petSitterPinkCircle,
  "Waiting for service": petSitterOrangeCircle,
  "In service": petSitterBlueCircle,
  Success: petSitterGreenCircle,
  Canceled: petSitterRedCircle,
};

const statusColors = {
  "Waiting for confirm": "#FA8AC0",
  "Waiting for service": "#FF7037",
  "In service": "#76D0FC",
  Success: "#1CCD83",
  Canceled: "#EA1010",
};

const petTypeColors = {
  Dog: ["#E7FDF4", "#1CCD83"],
  Cat: ["#FFF0F1", "#FA8AC0"],
  Bird: ["#ECFBFF", "#76D0FC"],
  Rabbit: ["#FFF5EC", "#FF986F"],
};

const PetsitterBookingDetail = () => {
  const { booking_id } = useParams();
  const [bookingDetail, setBookingDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const { joinChatRoom, chatRoomList, setChatRoomList } = useSocket();
  const { state } = useAuth();

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
 console.log(bookingDetail)
  useEffect(() => {
    if (booking_id) {
      const fetchBookingDetail = async () => {
        try {
          const response = await axios.get(
            `${SERVER_API_URL}/petsitter/booking/detail/${booking_id}`
          );
          
          setBookingDetail(response.data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchBookingDetail();
    } else {
      setLoading(false);
      setError("No booking ID provided");
    }
  }, [booking_id]);

  const updateBookingStatus = async (newStatus) => {
    try {
      const response = await axios.put(
        `${SERVER_API_URL}/petsitter/booking/detail/${booking_id}/status`,
        { status: newStatus }
      );
      setBookingDetail(response.data.data);
      window.location.reload();
    } catch (error) {
      console.error("Error updating booking status:", error);
      alert("Error updating booking status. Please try again later.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const renderButtons = (status) => {
    const currentDate = new Date();
    const bookingDateAndTime = new Date(`${bookingDetail.booking_date.split("T")[0]}T${bookingDetail.booking_time_end}`)
    switch (status) {
      case "Waiting for confirm":
        return (
          <>
            <button
              className="btn-secondary whitespace-nowrap"
              onClick={() => setShowCancelConfirm(true)}
            >
              Reject Booking
            </button>
            <button
              className="btn-primary whitespace-nowrap"
              onClick={() => updateBookingStatus("Waiting for service")}
            >
              Confirm Booking
            </button>
          </>
        );
      case "Waiting for service":
        return (
          <>
            <button
              className="btn-secondary whitespace-nowrap"
              onClick={() => {
                const chatRoomId = `${state.user.id}/${bookingDetail.user_id}`;
                const targetId = Number(bookingDetail.user_id);
                joinChatRoom({ chatRoomId, targetId });
                clearReadCount(chatRoomId);
              }}
            >
              Send Message
            </button>
            <button
              className="btn-primary whitespace-nowrap"
              onClick={() => updateBookingStatus("In service")}
            >
              In Service
            </button>
          </>
        );
      case "In service":
        return (
          <>
            <button
              className="btn-secondary whitespace-nowrap"
              onClick={() => {
                const chatRoomId = `${state.user.id}/${bookingDetail.user_id}`;
                const targetId = Number(bookingDetail.user_id);
                joinChatRoom({ chatRoomId, targetId });
                clearReadCount(chatRoomId);
              }}
            >
              Send Message
            </button>
            {currentDate > bookingDateAndTime && (
              <button
                className="btn-primary whitespace-nowrap"
                onClick={() => updateBookingStatus("Success")}
              >
                Success
              </button>
            )}
          </>
        );
      case "Success":
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#F6F6F9] flex flex-col pt-[40px] px-[40px] pb-[80px] gap-[24px]">
      <div className="flex items-center gap-[10px]">
        <Link to="/petsitter/booking">
        <img src={prevIcon} className="w-[24px] h-[24px]" alt="previous" />
        </Link>
        <div className="flex w-full gap-[24px]">
          <h3 className="text-black text-[24px] leading-[32px] font-bold">
            {bookingDetail.petOwnerName}
          </h3>
          <div className="flex items-center gap-[8px]">
            <img
              src={statusIcons[bookingDetail.status]}
              alt={bookingDetail.status}
              className="w-[6px] h-[6px]"
            />
            <p style={{ color: statusColors[bookingDetail.status] }}>
              {bookingDetail.status}
            </p>
          </div>
        </div>
        <div className="flex gap-[8px]">
          {renderButtons(bookingDetail.status)}
        </div>
      </div>
      <div className="bg-white rounded-[16px] flex flex-col py-[40px] px-[80px] gap-[24px]">
        <div className="flex flex-col gap-[4px]">
          <h4 className="text-primarygray-300 text-[20px] leading-[28px] font-bold">
            Pet Owner Name
          </h4>
          <div className="flex items-center justify-between gap-[4px]">
            <p className="text-black text-[16px] leading-[28px] font-medium">
              {bookingDetail.petOwnerName}
            </p>
            <button
              className="flex items-center py-[4px] px-[2px] gap-[4px]"
              onClick={() => setShowModal(true)}
            >
              <img src={eyeIcon} alt="view profile" />
              <span className="text-primaryorange-500 text-16px leading-[24px] font-bold">
                View Profile
              </span>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-[4px]">
          <h4 className="text-primarygray-300 text-[20px] leading-[28px] font-bold">
            Pet(s)
          </h4>
          <div className="flex gap-[4px]">
            <p className="text-black text-[16px] leading-[28px] font-medium">
              {bookingDetail.petCount}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[4px]">
          <h4 className="text-primarygray-300 text-[20px] leading-[28px] font-bold">
            Pet Detail
          </h4>
          <div className="flex gap-[12px]">
            {bookingDetail.pets.map((pet, index) => {
              const petColors = petTypeColors[pet.pet_type] || ["#FFF", "#000"];
              return (
                <div
                  key={index}
                  className="bg-white border border-primarygray-200 flex flex-col items-center rounded-[16px] p-[24px] gap-[16px]"
                  onClick={() => setSelectedPet(pet)}
                >
                  <div className="w-[104px] h-[104px] rounded-full bg-[#DCDFED] flex items-center justify-center">
                    {pet.pet_image ? (
                      <img
                        src={pet.pet_image}
                        className="w-[104px] h-[104px] rounded-full"
                        alt={pet.pet_name}
                      />
                    ) : (
                      <img
                        src={petProfile}
                        alt="Default Profile"
                        className="w-[50px] h-[50px]"
                      />
                    )}
                  </div>
                  <div className="flex flex-col items-center gap-[4px] w-[159px]">
                    <h4 className="text-primarygray-600 text-20px leading-[28px] font-bold">
                      {pet.pet_name}
                    </h4>
                    <div
                      className="flex border rounded-full py-[4px] px-[16px] gap-[10px]"
                      style={{
                        backgroundColor: petColors[0],
                        borderColor: petColors[1],
                      }}
                    >
                      <p
                        className="text-[16px] leading-[24px] font-medium"
                        style={{ color: petColors[1] }}
                      >
                        {pet.pet_type}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-[4px]">
          <h4 className="text-primarygray-300 text-[20px] leading-[28px] font-bold">
            Duration
          </h4>
          <div className="flex gap-[4px]">
            <p className="text-black text-[16px] leading-[28px] font-medium">
              {bookingDetail.duration}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[4px]">
          <h4 className="text-primarygray-300 text-[20px] leading-[28px] font-bold">
            Booking Date
          </h4>
          <div className="flex gap-[4px]">
            <p className="text-black text-[16px] leading-[28px] font-medium">
              {bookingDetail.booking_date_time}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[4px]">
          <h4 className="text-primarygray-300 text-[20px] leading-[28px] font-bold">
            Total Paid
          </h4>
          <div className="flex gap-[4px]">
            <p className="text-black text-[16px] leading-[28px] font-medium">
              {bookingDetail.total_paid} THB
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[4px]">
          <h4 className="text-primarygray-300 text-[20px] leading-[28px] font-bold">
            Transaction Date
          </h4>
          <div className="flex gap-[4px]">
            <p className="text-black text-[16px] leading-[28px] font-medium">
              {bookingDetail.transaction_date}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[4px]">
          <h4 className="text-primarygray-300 text-[20px] leading-[28px] font-bold">
            Transaction No.
          </h4>
          <div className="flex gap-[4px]">
            <p className="text-black text-[16px] leading-[28px] font-medium">
              {bookingDetail.transaction_number}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[4px]">
          <h4 className="text-primarygray-300 text-[20px] leading-[28px] font-bold">
            Additional Message
          </h4>
          <div className="flex gap-[4px]">
            <p className="text-black text-[16px] leading-[28px] font-medium">
              {bookingDetail.additional_message
                ? bookingDetail.additional_message
                : "No Message"}
            </p>
          </div>
        </div>
      </div>
      <BookingDetailPopup
        showModal={showModal}
        setShowModal={setShowModal}
        bookingDetail={bookingDetail}
      />
      {selectedPet && (
        <BookingPetPopup
          showModal={!!selectedPet}
          setShowModal={() => setSelectedPet(null)}
          petDetail={selectedPet}
        />
      )}
      <CancelConfirmPopup
        showModal={showCancelConfirm}
        setShowModal={setShowCancelConfirm}
        onConfirm={() => {
          updateBookingStatus("Canceled");
          setShowCancelConfirm(false);
        }}
      />
      
    </div>
  );
};

export default PetsitterBookingDetail;
