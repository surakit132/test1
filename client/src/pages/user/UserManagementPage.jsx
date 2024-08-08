import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authentication";
import { SERVER_API_URL } from "../../core/config.mjs";
import axios from "axios";
import AccountMenu from "../../components/cards/AccountMenu";
import ProfileForm from "../../components/forms/user/ProfileForm";

const UserManagementPage = () => {
  const { state } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState();

  const getUserProfileData = async () => {
    const userId = state.user.id;

    try {
      const response = await axios.get(
        `${SERVER_API_URL}/user/profile/${userId}`
      );

      if (response.data && response.data.data) {
        const userProfileData = response.data.data;

        setUserData({
          user_id: userId,
          first_name: userProfileData.firstname || "",
          last_name: userProfileData.lastname || "",
          id_number: userProfileData.id_number || "",
          email: userProfileData.email || "",
          date_of_birth: userProfileData.date_of_birth || "",
          image: userProfileData.image || "",
          phone_number: userProfileData.phone_number || "",
        });
      } else {
        setUserData({
          user_id: userId,
          first_name: "",
          last_name: "",
          id_number: "",
          email: "",
          date_of_birth: "",
          image: "",
          phone_number: "",
        });
      }
    } catch (error) {
      console.error("Error fetching user profile data:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserProfileData();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      await axios.put(`${SERVER_API_URL}/user/profile`, formData);
    } catch (error) {
      console.error("Error updating profile:", error);
    }

    window.location.reload();
  };

  if (loading) {
    return <span className="loading loading-dots loading-lg"></span>;;
  }

  if (error) {
    return <div>Error fetching pet profile data: {error.message}</div>;
  }

  return (
    <section className="flex flex-col bg-[#F6F6F9] lg:gap-8 lg:py-10 lg:px-20 md:min-h-[calc(100dvh-72px)] lg:min-w-[956px] lg:flex-row">
      <AccountMenu />
      {userData && (
        <ProfileForm userData={userData} handleSubmit={handleSubmit} />
      )}
    </section>
  );
};

export default UserManagementPage;
