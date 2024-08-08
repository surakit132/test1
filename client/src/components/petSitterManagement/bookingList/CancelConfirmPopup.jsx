import cross from "../../../assets/svgs/icons/icon-cross.svg";

const CancelConfirmPopup = ({ showModal, setShowModal, onConfirm }) => {
  if (!showModal) {
    return null;
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-[16px] w-full max-w-[350px] mx-auto flex flex-col max-h-[208px]">
        <div className="flex justify-between border-b-[1px] gap-[10px] py-[16px] px-[24px] items-center">
          <h1 className="text-primarygray-600 text-[20px] leading-[28px] font-bold">
            Reject Confirmation
          </h1>
          <img
            src={cross}
            className="w-[24px] h-[24px] cursor-pointer"
            onClick={() => setShowModal(false)}
            alt="Close"
          />
        </div>
        <div className="flex flex-col items-start justify-center flex-grow mb-[24px]">
          <p className="text-[#7B7E8F] text-[16px] leading-[28px] m-[24px] text-center">
            Are you sure to reject this booking?
          </p>
          <div className="flex justify-between gap-[40px] ml-[24px]">
            <button
              className="btn-secondary whitespace-nowrap"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              className="btn-primary whitespace-nowrap"
              onClick={onConfirm}
            >
              Reject Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelConfirmPopup;