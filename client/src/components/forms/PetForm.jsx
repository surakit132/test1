import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import petProfile from "../../assets/svgs/icons/icon-your-pet-white.svg";
import iconPlus from "../../assets/svgs/icons/icon-plus-circle.svg";
import TypeList from "../searchs/TypeList";
import BookingSummary from "../booking/BookingSummary";

const PetForm = ({ onNext, petData, bookingData, setBookingData }) => {
  const navigate = useNavigate();
  const { removeItem } = useLocalStorage();

  const onSubmit = (event) => {
    event.preventDefault();
    onNext();
  };

  const handleBack = () => {
    removeItem("petSitterId");
    removeItem("petSitterFirst");
    removeItem("petSitterLastname");
    removeItem("bookingDate");
    removeItem("bookingStart");
    removeItem("bookingEnd");
    navigate(-1);
  };

  const handleCreateNewPet = () => {
    removeItem("petSitterId");
    removeItem("petSitterFirstname");
    removeItem("petSitterLastname");
    removeItem("bookingDate");
    removeItem("bookingStart");
    removeItem("bookingEnd");
    navigate("/user/pet");
  };

  const handlePetSelection = (petId, petName, checked) => {
    setBookingData((prevData) => {
      if (checked) {
        return {
          ...prevData,
          pet_id: [...prevData.pet_id, Number(petId)],
          pet_name: [...prevData.pet_name, petName],
        };
      } else {
        return {
          ...prevData,
          pet_id: prevData.pet_id.filter((id) => id !== petId),
          pet_name: prevData.pet_name.filter((name) => name !== petName),
        };
      }
    });
  };

  return (
    <form
      className="flex flex-col px-4 py-10 md:gap-4 md:p-10 md:rounded-2xl md:bg-white"
      onSubmit={onSubmit}
    >
      <h1 className="text-[18px] leading-[26px]">Choose your pet</h1>

      <div className="flex flex-wrap items-center gap-4 mt-2 md:flex-row">
        {petData?.map((pet) => (
          <button
            key={pet.id}
            type="button"
            className={`w-full bg-white border ${
              bookingData.pet_name.includes(pet.pet_name)
                ? "border-orange-500"
                : "border-primarygray-200"
            } rounded-2xl p-6 flex flex-col justify-center items-center gap-4 relative md:size-60`}
          >
            <input
              type="checkbox"
              className="checkbox-primary"
              value={pet.pet_name}
              onClick={(event) =>
                handlePetSelection(pet.id, pet.pet_name, event.target.checked)
              }
              checked={bookingData.pet_name.includes(pet.pet_name)}
            />

            <figure>
              <img
                src={pet.image || petProfile}
                alt="image-user"
                className="size-[104px] rounded-full"
              />
            </figure>

            <figcaption className="flex flex-col justify-center items-center gap-2">
              <span>{pet.pet_name}</span>
              <TypeList types={[pet.pet_type]} />
            </figcaption>
          </button>
        ))}

        <button
          type="button"
          className="w-full btn-secondary rounded-2xl flex flex-col gap-2 p-6 md:size-60"
          onClick={handleCreateNewPet}
        >
          <img src={iconPlus} alt="icon-plus" className="size-[60px]" />
          <p className="px-6 py-3">Create New Pet</p>
        </button>

        <div className="w-full md:hidden">
          <BookingSummary bookingData={bookingData} />
        </div>
      </div>

      <div className="flex justify-between gap-[10px] py-6 px-4 bg-white">
        <button
          type="button"
          className="btn-secondary md:w-[120px]"
          onClick={handleBack}
        >
          Back
        </button>

        <button type="submit" className="btn-primary md:w-[120px]">
          Next
        </button>
      </div>
    </form>
  );
};

export default PetForm;
