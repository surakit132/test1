const FormNavigation = ({ formList, page }) => {
  return (
    <ul className="bg-white flex justify-around p-4 md:rounded-2xl md:p-6 md:gap-12 md:justify-center">
      {formList.map((form, index) => (
        <li key={index} className="flex justify-center items-center gap-3">
          <div
            className={`size-7 rounded-full bg-[#F6F6F9] text-[#7B7E8F] font-bold text-[24px] leading-[32px] flex items-center justify-center md:size-12 ${
              page === index
                ? "bg-[#FF7037] text-white"
                : index < page
                ? "bg-black text-[#FF7037]"
                : null
            }`}
          >
            {index + 1}
          </div>
          <p
            className={`text-[#7B7E8F] font-medium text-[14px] leading-[24px] md:text-[18px] md:leading-[26px] ${
              page === index
                ? "text-[#FF7037]"
                : index < page
                ? "text-black"
                : null
            }`}
          >
            {form}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default FormNavigation;
