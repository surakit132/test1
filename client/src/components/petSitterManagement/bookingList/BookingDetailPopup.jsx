import cross from "../../../assets/svgs/icons/icon-cross.svg";
import whiteProfile from "../../../assets/svgs/pet-sitter-management/pet-sitter-whiteProfile.svg";

const BookingDetailPopup = ({ showModal, setShowModal, bookingDetail }) => {
  if (!showModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 pt-[24px]">
      <div className="bg-white rounded-[16px] w-full max-w-[800px] mx-auto flex flex-col h-[calc(100vh-24px)] max-h-[648px]">
        <div className="flex justify-between border-b-[1px] gap-[10px] py-[24px] px-[40px] items-center">
          <h1 className="text-primarygray-600 text-[24px] leading-[32px] font-bold">
            {bookingDetail.petOwnerName}
          </h1>
          <img
            src={cross}
            className="w-[24px] h-[24px] cursor-pointer"
            onClick={() => setShowModal(false)}
            alt="Close"
          />
        </div>
        <div className="flex flex-grow p-[40px] gap-4">
          <div className="flex justify-between items-start w-[100%]">
            <div className="w-[240px] h-[240px] rounded-full bg-[#DCDFED] flex items-center justify-center">
              {bookingDetail.petOwnerImage
 ? (
                <img
                  src={bookingDetail.petOwnerImage
                  }
                  alt="User Profile Image"
                  className="w-[240px] h-[240px] rounded-full object-cover"
                />
              ) : (
                <img
                  src={whiteProfile}
                  alt="Default Profile"
                  className="w-[104px] h-[104px]"
                />
              )}
            </div>
            <div className="flex flex-col w-[60%] ml-[20px] p-[24px] bg-[#FAFAFB] gap-10 rounded-lg">
              <div className="flex flex-col gap-1">
                <p className="text-primarygray-300 text-[20px] leading-[28px] font-medium">
                  Pet Owner Name
                </p>
                <p className="text-black text-[16px] leading-[24px] font-normal">
                  {bookingDetail.petOwnerName}
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-primarygray-300 text-[20px] leading-[28px] font-medium">
                  Email
                </p>
                <p className="text-black text-[16px] leading-[24px] font-normal">
                  {bookingDetail.email}
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-primarygray-300 text-[20px] leading-[28px] font-medium">
                  Phone
                </p>
                <p className="text-black text-[16px] leading-[24px] font-normal">
                  {bookingDetail.phone_number}
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-primarygray-300 text-[20px] leading-[28px] font-medium">
                  ID Number
                </p>
                <p className="text-black text-[16px] leading-[24px] font-normal">
                  {bookingDetail.id_number}
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-primarygray-300 text-[20px] leading-[28px] font-medium">
                  Date of Birth
                </p>
                <p className="text-black text-[16px] leading-[24px] font-normal">
                  {bookingDetail.date_of_birth}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailPopup;
