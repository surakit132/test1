const LastnameForm = ({ handleLastName, lastName, errors }) => {
  return (
    <div>
      <label className="text-[16px] leading-[24px] text-black font-medium flex flex-col gap-[4px]">
        Lastname*
        <input
          type="text"
          name="last_name"
          value={lastName}
          onChange={handleLastName}
          className="border border-gray-200 rounded-[8px] h-[48px] p-[12px] text-[16px] leading-[24px] font-normal"
        />
      </label>
      {errors.last_name && <div className="error text-[16px] leading-[24px] text-red-500">{errors.last_name}</div>}
    </div>
  );
};

export default LastnameForm;
