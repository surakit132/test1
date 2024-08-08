import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/petSitterManagement/bookingList/BookingListSidebar";
import Navbar from "../../components/petSitterManagement/petSitterProfileForm/PetSitterNavbar";
import PetSitterBooking from "../../components/petSitterManagement/bookingList/PetSitterBooking";
import { SERVER_API_URL } from "../../core/config.mjs";

const PetsitterBookingListPage = () => {
  

  const [bookingsData, setBookingsData] = useState([]);
  const [status, setStatus] = useState("All status");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
      
        const bookingsResponse = await axios.get(`${SERVER_API_URL}/petsitter/booking`, {
          params: { searchQuery, status },
        });
        setBookingsData(bookingsResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchQuery, status]);

  const handleBookingClick = (bookingId) => {
    navigate(`/petsitter/booking/detail/${bookingId}`);
  };

  return (
    <div className="flex bg-primarygray-100">
      <Sidebar />
      <div className="flex flex-col gap-[8px] min-w-[1024px] w-full">
        <Navbar />
        <main>
          <div>
            <PetSitterBooking
              bookingsData={bookingsData}
              setStatus={setStatus}
              setSearchQuery={setSearchQuery}
              status={status}
              searchQuery={searchQuery}
              onBookingClick={handleBookingClick}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default PetsitterBookingListPage;