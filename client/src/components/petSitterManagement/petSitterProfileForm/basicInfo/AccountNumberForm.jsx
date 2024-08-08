function AccountNumberForm({handleAccountNumber, accountNumber}) {
  
  return (
    <div>
      <label className="text-[16px] leading-[24px] text-black font-medium flex flex-col gap-[4px] basis-1/2">
        Account Number
        <input
          type="tel"
          name="account_number"
          value={accountNumber}
          onChange={handleAccountNumber}
          className="border border-gray-200 rounded-[8px] h-[48px] p-[12px] text-[16px] leading-[24px] font-normal"
        />
      </label>
    </div>
  );
}

export default AccountNumberForm;
