import React from "react";
import Sidebar from "../../components/petSitterManagement/bookingList/BookingListSidebar";
import Navbar from "../../components/petSitterManagement/petSitterProfileForm/PetSitterNavbar";
import { useParams } from "react-router-dom";
import PetsitterBookingDetail from "../../components/petSitterManagement/bookingList/PetSitterBookingDetail";

const PetsitterBookingDetailPage = () => {
  const { booking_id } = useParams();

  return (
    <div className="flex bg-primarygray-100">
      <Sidebar />
      <div className="flex flex-col gap-[8px] min-w-[1024px] w-full">
        <Navbar />
        <main>
          <div>
            <PetsitterBookingDetail bookingId={booking_id} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default PetsitterBookingDetailPage;