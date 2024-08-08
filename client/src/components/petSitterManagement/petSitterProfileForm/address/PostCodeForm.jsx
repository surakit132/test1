const PostCodeForm = ({handlePostCode, postCode, errors}) => {

  return (
    <div>
      <label className="text-[16px] leading-[24px] text-black font-medium flex flex-col gap-[4px]">
        Post code*
        <input
          type="tel"
          name="post_code"
          value={postCode}
          onChange={handlePostCode}
          className="border border-gray-200 rounded-[8px] h-[48px] p-[12px] text-[16px] leading-[24px] font-normal"
        />
      </label>
      {errors.post_code && <div className="error text-[16px] leading-[24px] text-red-500">{errors.post_code}</div>}
    </div>
  );
}

export default PostCodeForm;