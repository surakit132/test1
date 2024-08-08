function PetSitterNameForm({handlePetSitterName, petSitterName, errors}) {

  return (
    <div>
      <label className="text-[16px] leading-[24px] text-black font-medium flex flex-col gap-[4px] basis-1">
        Pet sitter name (Trade Name)*
        <input
          type="text"
          value={petSitterName}
          onChange={handlePetSitterName}
          className="border border-gray-200 rounded-[8px] h-[48px] p-[12px] text-[16px] leading-[24px] font-normal"
        />
      </label>
      {errors.petsitter_name && <div className="error text-[16px] leading-[24px] text-red-500">{errors.petsitter_name}</div>}
    </div>
  );
}

export default PetSitterNameForm;