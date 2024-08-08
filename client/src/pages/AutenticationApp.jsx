import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./Homepage";
import ErrorPage from "./ErrorPage";
import PetSitterProfilePage from "./PetSitterManagement/PetSitterProfilePage";
import PetSitterBookingListPage from "./PetSitterManagement/PetSitterBookingListPage";
import PetSitterBookingDetailPage from "./PetSitterManagement/PetSitterBookingDetailPage";
import PetSitterPayoutOptionPage from "./PetSitterManagement/PetSitterPayoutOptionPage";
import BookingConfirmationPage from "../pages/Bookings/BookingConfirmationPage";
import BookingPage from "../pages/Bookings/BookingPage";
import BookingHistoryPage from "./BookingHistoryPage";
import Chat from "../components/chat/Chat";
import BookingPopup from "../components/BookingPopup";
import SearchListPage from "./SearchListPage";
import PetSitterDetailPage from "./PetSitterDetailPage";

import PetownerNavbar from "../components/navbar/PetownerNavbar";
import PetsitterNavbar from "../components/navbar/PetsitterNavbar";

import UserManagementPage from "./user/UserManagementPage";
import UserPetManagementPage from "./user/UserPetManagementPage";
import { useAuth } from "../contexts/authentication";

const AutenticationApp = () => {
  const location = useLocation();
  const { state } = useAuth();

  const hideNavbarPaths = ["/petsitter"];
  const shouldShowNavbar = !hideNavbarPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {shouldShowNavbar && (
        state.user?.role === "petsitter" ? <PetsitterNavbar /> : <PetownerNavbar />
      )}

      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/popup" element={<BookingPopup />} />
        <Route
          path="/petsitter/profile"
          element={<PetSitterProfilePage />}
        />
        <Route
          path="/petsitter/booking"
          element={<PetSitterBookingListPage />}
        />
        <Route
          path="/petsitter/booking/detail/:booking_id"
          element={<PetSitterBookingDetailPage />}
        />
        <Route
          path="/petsitter/payout-option"
          element={<PetSitterPayoutOptionPage />}
        />
        <Route path="/booking" element={<BookingPage />} />
        <Route
          path="/booking/confirmation"
          element={<BookingConfirmationPage />}
        />
        <Route path="/user/profile" element={<UserManagementPage />} />
        <Route path="/user/pet" element={<UserPetManagementPage />} />
        <Route path="/user/booking-history" element={<BookingHistoryPage />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/search" element={<SearchListPage />} />
        <Route path="/search/:id" element={<PetSitterDetailPage />} />
      </Routes>
    </>
  );
};

export default AutenticationApp;
