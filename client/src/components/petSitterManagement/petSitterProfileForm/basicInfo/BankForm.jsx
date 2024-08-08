const BankForm = ({ handleBank, bank }) => {
  return (
    <div>
      <label className="text-lg leading-6 text-black font-medium flex flex-col gap-1 basis-1/2">
        Bank
        <select
          name="bank"
          value={bank}
          onChange={handleBank}
          className="border border-gray-200 rounded-lg h-12 p-3 text-lg leading-6 font-normal"
        >
          <option value="" hidden></option>
          <option value="BBL">Bangkok Bank</option>
          <option value="BAY">Bank of Ayudhya</option>
          <option value="CIMB">CIMB Thai Bank</option>
          <option value="ICBC">ICBC Thai</option>
          <option value="KKB">Kasikornbank</option>
          <option value="KKP">Kiatnakin Phatra Bank</option>
          <option value="KTB">Krung Thai Bank</option>
          <option value="LHB">Land & Houses Bank</option>
          <option value="SCB">Siam Commercial Bank</option>
          <option value="SCBT">Standard Chartered Bank</option>
          <option value="TISCO">Tisco Bank</option>
          <option value="TMBT">TMBThanachart Bank</option>
          <option value="UOBT">United Overseas Bank (Thai)</option>
          <option value="TCB">Thai Credit Bank</option>
        </select>
      </label>
    </div>
  );
};

export default BankForm;
