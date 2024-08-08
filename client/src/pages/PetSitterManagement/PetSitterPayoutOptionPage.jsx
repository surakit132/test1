import React from "react";
import PayoutOption from "../../components/petSitterManagement/payoutOption/PayoutOption"
import Sidebar from "../../components/petSitterManagement/payoutOption/PayoutOptionSidebar";
import Navbar from "../../components/petSitterManagement/petSitterProfileForm/PetSitterNavbar";



const PetSitterPayoutOptionPage = () => {
    
    
      return (
        <div className="flex bg-primarygray-100">
          <Sidebar />
          <div className="flex flex-col gap-[8px] min-w-[1024px] w-full">
            <Navbar />
            <main>
              <div>
                <PayoutOption />
              </div>
            </main>
          </div>
        </div>
      );
};

export default PetSitterPayoutOptionPage;
