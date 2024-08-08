import { IoChevronBack } from "react-icons/io5";
import buttonAddImage from "../../../assets/svgs/pet-sitter-management/pet-sitter-addImage.svg";
import petProfile from "../../../assets/svgs/icons/icon-your-pet-white.svg";
import supabase from "../../../utils/storage";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import DeletePetProfileConfirm from "./DeletePetProfileConfirm";
import { IconDelete } from "../../../assets/svgs/icons/IconDelete";
import axios from "axios";
import { SERVER_API_URL } from "../../../core/config.mjs";

const PetProfileForm = ({
  setShowForm,
  showForm,
  setPetFormData,
  petFormData,
  petData,
  handleSubmit,
}) => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log("petFormData.status: ", petFormData);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${petFormData.user_id}/${fileName}`;
      setLoading(true);

      try {
        if (petFormData.image) {
          const oldImagePath = petFormData.image.split("pet_profile_image/")[1];
          if (oldImagePath) {
            const { error: removeError } = await supabase.storage
              .from("pet_profile_image")
              .remove([oldImagePath]);

            if (removeError) {
              console.error("Error removing old image:", removeError);
              throw removeError;
            }
          }
        }

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("pet_profile_image")
          .upload(filePath, file);

        if (uploadError) {
          console.error("Error uploading image:", uploadError);
          throw uploadError;
        }

        console.log("Upload successful:", uploadData);

        const { data: publicUrlData, error: urlError } = supabase.storage
          .from("pet_profile_image")
          .getPublicUrl(filePath);

        if (urlError) {
          console.error("Error getting public URL:", urlError);
          throw urlError;
        }

        console.log("Public URL fetched:", publicUrlData);

        setPetFormData((prevData) => ({
          ...prevData,
          image: publicUrlData.publicUrl,
        }));
      } catch (error) {
        console.error("Error uploading or deleting image:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPetFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDeletePetProfile = async (petId) => {
    console.log("PetProfileForm petId", petId);

    try {
      const response = await axios.delete(
        `${SERVER_API_URL}/user/pet/${petId}`
      );

      if (response.status === 200) {
        console.log("Pet profile successfully deleted");
      } else {
        console.error("Failed to delete pet profile");
      }
    } catch (error) {
      console.error("Error deleting pet profile:", error);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(petFormData);
  };

  return (
    <form
      className={`flex flex-col gap-6 py-6 px-4 w-full ${
        showForm ? "bg-white" : null
      } md:bg-white md:rounded-2xl md:p-10 md:gap-[60px]`}
      onSubmit={onSubmit}
    >
      <div className="flex justify-start items-center gap-[10px]">
        <IoChevronBack
          className="text-[#7B7E8F] size-5 cursor-pointer md:size-6"
          onClick={() => setShowForm(false)}
        />
        <h1 className="text-[20px] leading-[28px] font-bold">Your Pet</h1>
      </div>

      <div className="size-[120px] rounded-full bg-[#DCDFED] relative flex items-center justify-center md:size-60">
        {loading ? (
          <div className="w-[120px] h-[120px] rounded-full flex items-center justify-center">
            <div className="size-9 border-4 border-t-4 border-t-gray-700 border-gray-300 rounded-full animate-spin"></div>
          </div>
        ) : petFormData.image ? (
          <img
            src={petFormData.image}
            alt="Profile"
            className="size-[120px] rounded-full object-cover md:size-60"
          />
        ) : (
          <img
            src={petProfile}
            alt="Default Profile"
            className="size-8 md:size-[86px]"
          />
        )}
        <label className="absolute right-0 bottom-0 cursor-pointer">
          <input
            type="file"
            name="profile_image"
            className="hidden"
            onChange={handleImageChange}
          />
          <img
            src={buttonAddImage}
            alt="Add Image"
            className="size-10 md:size-[60px]"
          />
        </label>
      </div>

      <div className="flex flex-col gap-4 md:gap-10">
        <div className="w-full flex flex-col gap-1 md:flex-1">
          <label htmlFor="pet_name" className="input-label">
            Pet Name*
          </label>
          <input
            type="text"
            name="pet_name"
            placeholder="Pet name"
            className="input-box"
            value={petFormData.pet_name || ""}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-wrap gap-4 md:gap-10">
          <div className="w-full flex flex-col gap-1 md:flex-1">
            <label htmlFor="pet_type" className="input-label">
              Pet Type*
            </label>
            <select
              name="pet_type"
              className={`input-box ${
                petFormData.pet_type ? "text-black" : "text-[#9AA1B9]"
              }`}
              value={petFormData.pet_type || ""}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select your pet type
              </option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
            </select>
          </div>

          <div className="w-full flex flex-col flex-1 gap-1 md:flex-1">
            <label htmlFor="breed" className="input-label">
              Breed*
            </label>
            <input
              type="text"
              name="breed"
              placeholder="Breed of your pet"
              className="input-box"
              value={petFormData.breed || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 md:gap-10">
          <div className="w-full flex flex-col gap-1 md:flex-1">
            <label htmlFor="sex" className="input-label">
              Sex*
            </label>
            <select
              name="sex"
              className={`input-box ${
                petFormData.sex ? "text-black" : "text-[#9AA1B9]"
              }`}
              value={petFormData.sex || ""}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select sex of your pet
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="w-full flex flex-col flex-1 gap-1 md:flex-1">
            <label htmlFor="age" className="input-label">
              Age (Month)*
            </label>
            <input
              type="text"
              name="age"
              placeholder="Age of your pet"
              className="input-box"
              value={petFormData.age || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 md:gap-10">
          <div className="w-full flex flex-col gap-1 md:flex-1">
            <label htmlFor="color" className="input-label">
              Color*
            </label>
            <input
              type="text"
              name="color"
              placeholder="Describe color of your pet"
              className="input-box"
              value={petFormData.color || ""}
              onChange={handleInputChange}
            />
          </div>

          <div className="w-full flex flex-col flex-1 gap-1 md:flex-1">
            <label htmlFor="weight" className="input-label">
              Weight (Kilogram)
            </label>
            <input
              type="text"
              name="weight"
              placeholder="Weight of your pet"
              className="input-box"
              value={petFormData.weight || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="w-full flex flex-col flex-1 gap-1 mt-5 border-t-[1px] md:flex-1">
          <label htmlFor="about" className="input-label mt-8">
            About
          </label>
          <textarea
            type="text"
            name="about"
            placeholder="Describe more about your pet..."
            className="input-box resize-none h-[140px]"
            value={petFormData.about || ""}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {!petFormData.id ? (
        <div className="flex justify-between gap-4 py-6 px-4 bg-white md:rounded-b-2xl">
          <button
            type="button"
            className="btn-secondary md:w-[120px]"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>

          <button type="submit" className="btn-primary md:w-[127px]">
            Create Pet
          </button>
        </div>
      ) : (
        <div className="flex flex-col justify-between gap-14 py-6 px-4 bg-white md:rounded-b-2xl">
          {(petFormData.status === null ||
            petFormData.status === "Waiting for confirm" ||
            petFormData.status === "Success" ||
            petFormData.status === "Canceled") && (
            <button
              type="button"
              className="text-[#FF7037] text-base font-bold flex gap-1"
              onClick={() => setIsModalOpen(true)}
            >
              <IconDelete />
              Delete Pet
            </button>
          )}

          <DeletePetProfileConfirm
            open={isModalOpen}
            close={() => setIsModalOpen(false)}
            handleDeletePetProfile={handleDeletePetProfile}
            petId={Number(petFormData.id)}
          />

          <div className="flex justify-between gap-4 bg-white md:rounded-b-2xl">
            <button
              type="button"
              className="btn-secondary md:w-[120px]"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>

            <button type="submit" className="btn-primary md:w-[131px]">
              Update Pet
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default PetProfileForm;
