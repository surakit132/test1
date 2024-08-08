const SubDistrictForm = ({handleSubDistrict, subDistrict, errors}) => {


  return (
    <div>
      <label className="text-[16px] leading-[24px] text-black font-medium flex flex-col gap-[4px]">
        Sub-district*
        <input
          type="text"
          name="sub_district"
          value={subDistrict}
          onChange={handleSubDistrict}
          className="border border-gray-200 rounded-[8px] h-[48px] p-[12px] text-[16px] leading-[24px] font-normal"
        />
      </label>
      {errors.sub_district && <div className="error text-[16px] leading-[24px] text-red-500">{errors.sub_district}</div>}
    </div>
  );
};

export default SubDistrictForm;