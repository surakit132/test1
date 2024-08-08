import { useEffect, useState } from "react";
import AccountMenu from "../../components/cards/AccountMenu";
import PetProfileForm from "../../components/forms/user/PetProfileForm";
import PetProfileList from "../../components/forms/user/PetProfileList";
import { useAuth } from "../../contexts/authentication";
import axios from "axios";
import { SERVER_API_URL } from "../../core/config.mjs";
import { useNavigate } from "react-router-dom";

const UserPetManagementPage = () => {
  const { state } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [petData, setPetData] = useState();
  const [petFormData, setPetFormData] = useState();

  console.log("petData: ", petData);

  const getPetProfileData = async () => {
    const userId = state.user.id;

    try {
      const response = await axios.get(`${SERVER_API_URL}/user/pet/${userId}`);
      setPetData(response.data.data);
    } catch (error) {
      console.error("Error fetching pet profile data:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPetProfileData();
  }, []);

  const handlePetOnClick = (petId) => {
    const selectedPet = petData.find((pet) => pet.id === petId);

    if (selectedPet) {
      setPetFormData(selectedPet);
    }

    setShowForm(true);
  };

  const handleCreatePetProfile = () => {
    setPetFormData({
      user_id: state.user.id,
      pet_name: "",
      pet_type: "",
      breed: "",
      sex: "",
      age: "",
      color: "",
      weight: "",
      about: "",
      image: "",
    });
    setShowForm(true);
  };

  const handleSubmit = async (petFormData) => {
    try {
      if (petFormData.id) {
        await axios.put(
          `${SERVER_API_URL}/user/pet/${petFormData.id}`,
          petFormData
        );
      } else {
        await axios.post(`${SERVER_API_URL}/user/pet`, petFormData);
      }

      getPetProfileData();
    } catch (error) {
      console.error("error", error);
    } finally {
      setShowForm(false);
    }
  };

  if (loading) {
    return <span className="loading loading-dots loading-lg"></span>;
  }

  if (error) {
    return <div>Error fetching pet profile data: {error.message}</div>;
  }

  return (
    <section className="flex flex-col bg-[#F6F6F9] min-h-[calc(100dvh-72px)] lg:gap-8 lg:py-10 lg:px-20 lg:min-w-[956px] lg:flex-row">
      <AccountMenu />
      {petData ? (
        showForm ? (
          <PetProfileForm
            setShowForm={setShowForm}
            showForm={showForm}
            setPetData={setPetData}
            petData={petData}
            setPetFormData={setPetFormData}
            petFormData={petFormData}
            handleSubmit={handleSubmit}
            getPetProfileData={getPetProfileData}
          />
        ) : (
          <PetProfileList
            petData={petData}
            handlePetOnClick={handlePetOnClick}
            handleCreatePetProfile={handleCreatePetProfile}
          />
        )
      ) : (
        <div>No pet data available</div>
      )}
    </section>
  );
};

export default UserPetManagementPage;
