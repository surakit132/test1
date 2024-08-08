import defaultProfile from "../../../assets/svgs/pet-sitter-management/pet-sitter-whiteProfile.svg";
import buttonAddImage from "../../../assets/svgs/pet-sitter-management/pet-sitter-addImage.svg";
import supabase from "../../../utils/storage";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

const ProfileForm = ({ userData, handleSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(userData);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${formData.user_id}/${fileName}`;
      setLoading(true);

      try {
        if (formData.image) {
          const oldImagePath = formData.image.split("user_profile_image/")[1];
          if (oldImagePath) {
            const { error: removeError } = await supabase.storage
              .from("user_profile_image")
              .remove([oldImagePath]);

            if (removeError) {
              throw removeError;
            }
          }
        }

        const { error: uploadError } = await supabase.storage
          .from("user_profile_image")
          .upload(filePath, file);

        if (uploadError) {
          throw uploadError;
        }

        const { data, error: urlError } = supabase.storage
          .from("user_profile_image")
          .getPublicUrl(filePath);

        if (urlError) {
          throw urlError;
        }

        setFormData((prevData) => ({
          ...prevData,
          image: data.publicUrl,
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
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(formData);
  };

  return (
    <form
      className="flex flex-col gap-4 py-10 px-4 bg-white w-full md:p-10 lg:rounded-2xl md:gap-[60px]"
      onSubmit={onSubmit}
    >
      <h1 className="text-[20px] leading-[28px] font-bold">Profile</h1>

      <div
        className={`size-[120px] rounded-full bg-[#DCDFED] relative flex items-center justify-center md:size-60`}
      >
        {loading ? (
          <div className="w-[120px] h-[120px] rounded-full flex items-center justify-center">
            <div className="size-9 border-4 border-t-4 border-t-gray-700 border-gray-300 rounded-full animate-spin"></div>
          </div>
        ) : formData.image ? (
          <img
            src={formData.image}
            alt="Profile"
            className="size-[120px] rounded-full object-cover md:size-60"
          />
        ) : (
          <img
            src={defaultProfile}
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
        <div className="flex flex-wrap gap-4 md:gap-10">
          <div className="w-full flex flex-col gap-1 md:flex-1">
            <label htmlFor="firstname" className="input-label">
              First Name*
            </label>
            <input
              type="text"
              name="first_name"
              placeholder="First name"
              className="input-box"
              value={formData.first_name || ""}
              onChange={handleInputChange}
            />
          </div>

          <div className="w-full flex flex-col flex-1 gap-1 md:flex-1">
            <label htmlFor="lastname" className="input-label">
              Last Name*
            </label>
            <input
              type="text"
              name="last_name"
              placeholder="Last name"
              className="input-box"
              value={formData.last_name || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 md:gap-10">
          <div className="w-full flex flex-col gap-1 md:flex-1">
            <label htmlFor="email" className="input-label">
              Email*
            </label>
            <input
              type="email"
              name="email"
              placeholder="youremail@company.com"
              className="input-box"
              value={formData.email || ""}
              onChange={handleInputChange}
            />
          </div>

          <div className="w-full flex flex-col flex-1 gap-1 md:flex-1">
            <label htmlFor="phone" className="input-label">
              Phone*
            </label>
            <input
              type="text"
              name="phone_number"
              placeholder="xxx-xxx-xxxx"
              className="input-box"
              value={formData.phone_number || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 md:gap-10">
          <div className="w-full flex flex-col gap-1 md:flex-1">
            <label htmlFor="email" className="input-label">
              ID Number
            </label>
            <input
              type="text"
              name="id_number"
              placeholder="Your ID number"
              className="input-box"
              value={formData.id_number || ""}
              onChange={handleInputChange}
            />
          </div>

          <div className="w-full flex flex-col flex-1 gap-1 md:flex-1">
            <label htmlFor="phone" className="input-label">
              Date of Birth
            </label>
            <input
              type="date"
              name="date_of_birth"
              placeholder="Select your date of birth"
              className="input-box"
              value={formData.date_of_birth.slice(0, 10) || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button type="submit" className="btn-primary w-[159px]">
          Update Profile
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
