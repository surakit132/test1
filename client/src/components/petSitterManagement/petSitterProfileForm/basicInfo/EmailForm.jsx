function EmailForm({handleEmail, email, errors}) {
  
  return (
    <div>
      <label className="text-[16px] leading-[24px] text-black font-medium flex flex-col gap-[4px] basis-1/2">
        Email*
        <input
          type="text"
          name="email"
          value={email}
          onChange={handleEmail}
          className="border border-gray-200 rounded-[8px] h-[48px] p-[12px] text-[16px] leading-[24px] font-normal"
        />
      </label>
      {errors.email && <div className="error text-[16px] leading-[24px] text-red-500">{errors.email}</div>}
    </div>
  );
}

export default EmailForm;