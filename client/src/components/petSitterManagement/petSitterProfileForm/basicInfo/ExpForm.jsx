const ExpForm = ({ handleExp, experience, errors }) => {
  return (
    <div>
      <label className="text-lg leading-6 text-black font-medium flex flex-col gap-1">
        Experience*
        <select
          name="experience"
          value={experience}
          onChange={handleExp}
          className="border border-gray-200 rounded-lg h-12 p-3 text-lg leading-6 font-normal"
        >
          <option value="" hidden></option>
          {Array.from({ length: 11 }, (_, index) => (
            <option key={index} value={index}>
              {index} {index <= 1 ? "Year" : "Years"}
            </option>
          ))}
        </select>
      </label>
      {errors.experience && <div className="error text-[16px] leading-[24px] text-red-500">{errors.experience}</div>}
    </div>
  );
};

export default ExpForm;
