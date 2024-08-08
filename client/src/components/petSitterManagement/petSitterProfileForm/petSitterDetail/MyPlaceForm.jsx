const MyPlaceForm = ({handleMyPlace, myPlace}) => {

    return (
      <div>
        <label className="text-[16px] leading-[24px] text-black font-medium flex flex-col gap-[4px] basis-1">
          My Place (Describe your place)
          <textarea
            type="text"
            name="my_place"
            value={myPlace}
            onChange={handleMyPlace}
            className="border border-gray-200 rounded-[8px] h-[140px] p-[12px] text-[16px] leading-[24px] font-normal resize-none"
          />
        </label>
      </div>
    );
  };
  
  export default MyPlaceForm;