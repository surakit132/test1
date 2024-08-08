const AddressDetailForm = ({handleAddressDetail, addressDetail, errors}) => {

  return (
    <div>
      <label className="text-[16px] leading-[24px] text-black font-medium flex flex-col gap-[4px]">
        Address Detail*
        <input
          type="text"
          name="address_detail"
          value={addressDetail}
          onChange={handleAddressDetail}
          className="border border-gray-200 rounded-[8px] h-[48px] p-[12px] text-[16px] leading-[24px] font-normal"
        />
      </label>
      {errors.address_detail && <div className="error text-[16px] leading-[24px] text-red-500">{errors.address_detail}</div>}
    </div>
  );
};

export default AddressDetailForm;