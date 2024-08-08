function PhoneNumberForm({handlePhoneNumber, phoneNumber, errors}) {
  return (
    <div>
      <label className="text-[16px] leading-[24px] text-black font-medium flex flex-col gap-[4px] basis-1/2">
        Phone Number*
        <input
          type="tel"
          name="phone_number"
          value={phoneNumber}
          onChange={handlePhoneNumber}
          className="border border-gray-200 rounded-[8px] h-[48px] p-[12px] text-[16px] leading-[24px] font-normal"
        />
      </label>
      {errors.phone_number && <div className="error text-[16px] leading-[24px] text-red-500">{errors.phone_number}</div>}
    </div>
  );
}

export default PhoneNumberForm;