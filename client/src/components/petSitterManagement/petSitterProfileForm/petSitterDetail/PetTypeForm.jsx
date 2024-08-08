import React, { useState } from 'react';

const PetTypeForm = ({
  pet_type = [],
  setFormData,
  petOptions = [],
}) => {
  const [currentSelection, setCurrentSelection] = useState("");

  const handlePetTypeSelect = (event) => {
    const selectedPet = event.target.value;
    if (selectedPet && !pet_type.includes(selectedPet)) {
      setFormData((prev) => ({
        ...prev,
        pet_type: [...prev.pet_type, selectedPet],
      }));
      setCurrentSelection(""); 
    }
  };

  const handlePetTypeRemove = (pet) => {
    setFormData((prev) => ({
      ...prev,
      pet_type: prev.pet_type.filter((p) => p !== pet),
    }));
  };

  return (
    <div className="flex flex-col gap-[4px]">
      <label className="text-[16px] leading-[24px] text-black font-medium">
        Pet type
      </label>
      <div className="border border-gray-200 rounded-[8px] h-auto p-[12px] text-black text-[16px] leading-[24px] font-normal flex flex-wrap items-center gap-[8px]">
        {pet_type.map((pet, index) => (
          <div
            key={index}
            className="flex items-center rounded-[999px] px-[12px] py-[4px] text-[#E44A0C] bg-[#FFF1EC]"
          >
            {pet}
            <button
              className="ml-[8px]"
              onClick={() => handlePetTypeRemove(pet)}
            >
              ×
            </button>
          </div>
        ))}
        <div className="flex-grow" />
        <select
          onChange={handlePetTypeSelect}
          value={currentSelection}
          className="min-w-[120px] focus:outline-none"
        >
          <option value="" hidden>
          </option>
          {petOptions.map((pet, index) => (
            <option key={index} value={pet}>
              {pet}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PetTypeForm;