const IntroductionForm = ({handleIntroduction, introduction}) => {
  
  return (
    <div>
      <label className="text-[16px] leading-[24px] text-black font-medium flex flex-col gap-[4px]">
        Introduction (Describe about yourself as pet sitter)
        <textarea
          type="text"
          name="introduction"
          value={introduction}
          onChange={handleIntroduction}
          className="border border-gray-200 rounded-[8px] h-[140px] p-[12px] text-[16px] leading-[24px] font-normal resize-none"
        />
      </label>
    </div>
  );
};

export default IntroductionForm;