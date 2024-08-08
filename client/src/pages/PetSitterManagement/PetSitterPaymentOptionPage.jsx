import React, { useState, useEffect } from "react";
import axios from "axios";

import Sidebar from "../../components/petSitterManagement/paymentOption/PaymentOptionSidebar";
import Navbar from "../../components/petSitterManagement/petSitterProfileForm/PetSitterNavbar";
import BookingList from "../../components/petSitterManagement/bookingList/PetSitterBooking";
import { SERVER_API_URL } from "../../core/config.mjs";



const PetSitterPaymentOptionPage = () => {
    const [formData, setFormData] = useState({
        profile_image: "",
        first_name: "",
        last_name: "",
      });
    
      const getIdFromUrl = () => {
        const url = window.location.href;
        return url.substring(url.lastIndexOf("/") + 1);
      };
    
      useEffect(() => {
        const fetchData = async () => {
          const id = getIdFromUrl();
          try {
            const response = await axios.get(
              `${SERVER_API_URL}/petsitter/profile/${id}`
            );
            const data = response.data.data;
            setFormData({
              profile_image: data.profile_image || "",
              first_name: data.firstname || "",
              last_name: data.lastname || "",
            });
          } catch (error) {
            console.error("Error fetching petsitter profile data:", error);
          }
        };
    
        fetchData();
      }, []);
    
      return (
        <div className="flex bg-primarygray-100">
          <Sidebar />
          <div className="flex flex-col gap-[8px] min-w-[1024px] w-full">
            <Navbar formData={formData} />
            <main>
              <div>
                <BookingList />
              </div>
            </main>
          </div>
        </div>
      );
};

export default PetSitterPaymentOptionPage;
