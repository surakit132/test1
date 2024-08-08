import axios from "axios";
import { useState, useEffect } from "react";
import { SERVER_API_URL } from "../../core/config.mjs";
import { PetSitterProfileSchema } from "../../schemas/PetSitterProfile";
import petSitterGreenCircle from "../../assets/svgs/pet-sitter-management/pet-sitter-greenCircle.svg";

import Sidebar from "../../components/petSitterManagement/petSitterProfileForm/PetProfileSidebar";
import Navbar from "../../components/petSitterManagement/petSitterProfileForm/PetSitterNavbar";

// FORM 1: basic info
import ProfileImageForm from "../../components/petSitterManagement/petSitterProfileForm/basicInfo/ProfileImageForm";
import FirstnameForm from "../../components/petSitterManagement/petSitterProfileForm/basicInfo/FirstnameForm";
import LastnameForm from "../../components/petSitterManagement/petSitterProfileForm/basicInfo/LastnameForm";
import ExpForm from "../../components/petSitterManagement/petSitterProfileForm/basicInfo/ExpForm";
import PhoneNumberForm from "../../components/petSitterManagement/petSitterProfileForm/basicInfo/PhoneNumberForm";
import EmailForm from "../../components/petSitterManagement/petSitterProfileForm/basicInfo/EmailForm";
import IntroductionForm from "../../components/petSitterManagement/petSitterProfileForm/basicInfo/IntroductionForm";
import BankForm from "../../components/petSitterManagement/petSitterProfileForm/basicInfo/BankForm";
import AccountNumberForm from "../../components/petSitterManagement/petSitterProfileForm/basicInfo/AccountNumberForm";

// FORM 2: pet sitter
import PetSitterNameForm from "../../components/petSitterManagement/petSitterProfileForm/petSitterDetail/PetSitterNameForm";
import PetTypeForm from "../../components/petSitterManagement/petSitterProfileForm/petSitterDetail/PetTypeForm";
import ServicesForm from "../../components/petSitterManagement/petSitterProfileForm/petSitterDetail/ServicesForm";
import MyPlaceForm from "../../components/petSitterManagement/petSitterProfileForm/petSitterDetail/MyPlaceForm";
import ImageGalleryForm from "../../components/petSitterManagement/petSitterProfileForm/petSitterDetail/ImageGalleryForm";

// FORM 3: address
import AddressDetailForm from "../../components/petSitterManagement/petSitterProfileForm/address/AddressDetailForm";
import DistrictForm from "../../components/petSitterManagement/petSitterProfileForm/address/DistrictForm";
import SubDistrictForm from "../../components/petSitterManagement/petSitterProfileForm/address/SubDistrictForm";
import ProvinceForm from "../../components/petSitterManagement/petSitterProfileForm/address/ProvinceForm";
import PostCodeForm from "../../components/petSitterManagement/petSitterProfileForm/address/PostCodeForm";

const PetSitterProfilePage = () => {
  const [formData, setFormData] = useState({
    profile_image: "",
    first_name: "",
    last_name: "",
    experience: "",
    phone_number: "",
    email: "",
    introduction: "",
    bank: "",
    account_number: "",
    petsitter_name: "",
    pet_type: [],
    services: "",
    my_place: "",
    image_gallery: [],
    address_detail: "",
    district: "",
    sub_district: "",
    province: "",
    post_code: "",
  });

  const [errors, setErrors] = useState({});
  const [petsitterId, setPetsitterId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${SERVER_API_URL}/petsitter/profile`);
        const data = response.data.data;
        setFormData({
          profile_image: data.profile_image || "",
          first_name: data.firstname || "",
          last_name: data.lastname || "",
          experience: data.experience || "",
          phone_number: data.phone_number || "",
          email: data.email || "",
          introduction: data.introduction || "",
          bank: data.bank || "",
          account_number: data.account_number || "",
          petsitter_name: data.pet_sitter_name || "",
          pet_type: data.pet_type || [],
          services: data.services || "",
          my_place: data.my_place || "",
          image_gallery: data.image_gallery || [],
          address_detail: data.address_detail || "",
          district: data.district || "",
          sub_district: data.sub_district || "",
          province: data.province || "",
          post_code: data.post_code || "",
        });
        console.log(response)
        setPetsitterId(data.id);
      } catch (error) {
        console.error("Error fetching petsitter profile data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await PetSitterProfileSchema.validate(formData, { abortEarly: false });
      console.log("Form Submitted");

      const response = await axios.get(
        `${SERVER_API_URL}/petsitter/profile/check`
      );
      const profileExists = response.data.exists;
      console.log(profileExists);

      if (profileExists) {
        console.log("Updating existing profile");
        const response = await axios.put(
          `${SERVER_API_URL}/petsitter/profile`,
          formData
        );
        console.log("Petsitter Profile has been updated:", response.data);
      } else {
        console.log("Creating new profile");
        const response = await axios.post(
          `${SERVER_API_URL}/petsitter/profile`,
          formData
        );
        console.log("Petsitter Profile has been created:", response.data);
      }

      window.location.reload();
    } catch (error) {
      if (error.inner) {
        const newError = {};
        error.inner.forEach((err) => {
          newError[err.path] = err.message;
        });
        setErrors(newError);
      } else if (error.response) {
        console.error(
          "Server error creating petsitter profile:",
          error.response.data
        );
      } else {
        console.error("Error creating petsitter profile:", error.message);
      }
    }
  };

  return (
    <div className="flex bg-primarygray-100">
      <Sidebar />
      <div className="flex flex-col gap-[8px] min-w-[1024px] w-full">
        <Navbar formData={formData} />
        <main className="flex flex-col gap-[24px] bg-gray-100 pb-[80px]">
          <div className="flex items-center justify-between pl-[60px] mr-[48px] mt-[36px] w-[96%]">
            <div className="flex gap-[24px]">
              <h3 className="flex flex-1 text-[24px] leading-[32px] font-bold">
                Pet Sitter Profile
              </h3>
              <div className="flex items-center gap-[8px]">
                <img src={petSitterGreenCircle} className="w-[6px] h-[6px]" />
                <span className="text-[#1CCD83] text-[16px] leading-[24px]">
                  Approved
                </span>
              </div>
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn-primary w-[120px] h-[48px]"
            >
              Update
            </button>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-6"
          >
            <div className="w-[93%] rounded-2xl bg-primarygray-100 px-20 py-10 flex flex-col gap-6">
              <p className="text-xl text-primarygray-300 font-bold">
                Basic Information
              </p>
              <div className="max-w-[240px]">
                <ProfileImageForm
                  profileImage={formData.profile_image}
                  setFormData={setFormData}
                  petsitterId={petsitterId}
                />
              </div>
              <div className="grid grid-cols-3 gap-6">
                <FirstnameForm
                  handleFirstName={handleChange("first_name")}
                  firstName={formData.first_name}
                  errors={errors}
                />
                <LastnameForm
                  handleLastName={handleChange("last_name")}
                  lastName={formData.last_name}
                  errors={errors}
                />
                <ExpForm
                  handleExp={handleChange("experience")}
                  experience={formData.experience}
                  errors={errors}
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <PhoneNumberForm
                  handlePhoneNumber={handleChange("phone_number")}
                  phoneNumber={formData.phone_number}
                  errors={errors}
                />
                <EmailForm
                  handleEmail={handleChange("email")}
                  email={formData.email}
                  errors={errors}
                />
              </div>
              <IntroductionForm
                handleIntroduction={handleChange("introduction")}
                introduction={formData.introduction}
              />
              <div className="grid grid-cols-2 gap-6">
                <BankForm
                  handleBank={handleChange("bank")}
                  bank={formData.bank}
                />
                <AccountNumberForm
                  handleAccountNumber={handleChange("account_number")}
                  accountNumber={formData.account_number}
                />
              </div>
            </div>
            <div className="w-[93%] rounded-2xl bg-primarygray-100 px-20 py-10 flex flex-col gap-6">
              <p className="text-xl text-primarygray-300 font-bold">
                Pet Sitter
              </p>
              <PetSitterNameForm
                handlePetSitterName={handleChange("petsitter_name")}
                petSitterName={formData.petsitter_name}
                errors={errors}
              />
              <PetTypeForm
                pet_type={formData.pet_type}
                setFormData={setFormData}
                petOptions={["Dog", "Cat", "Bird", "Rabbit"]}
              />
              <ServicesForm
                handleServices={handleChange("services")}
                services={formData.services}
              />
              <MyPlaceForm
                handleMyPlace={handleChange("my_place")}
                myPlace={formData.my_place}
              />
              <ImageGalleryForm
                image_gallery={formData.image_gallery}
                setFormData={setFormData}
                petsitterId={petsitterId}
              />
            </div>
            <div className="w-[93%] rounded-2xl bg-primarygray-100 px-20 py-10 flex flex-col gap-6">
              <p className="text-xl text-primarygray-300 font-bold">Address</p>
              <AddressDetailForm
                handleAddressDetail={handleChange("address_detail")}
                addressDetail={formData.address_detail}
                errors={errors}
              />
              <div className="grid grid-cols-2 gap-6">
                <DistrictForm
                  handleDistrict={handleChange("district")}
                  district={formData.district}
                  errors={errors}
                />
                <SubDistrictForm
                  handleSubDistrict={handleChange("sub_district")}
                  subDistrict={formData.sub_district}
                  errors={errors}
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <ProvinceForm
                  handleProvince={handleChange("province")}
                  province={formData.province}
                  errors={errors}
                />
                <PostCodeForm
                  handlePostCode={handleChange("post_code")}
                  postCode={formData.post_code}
                  errors={errors}
                />
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default PetSitterProfilePage;
