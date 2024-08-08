import { useState, useEffect } from "react";
import logoNavbar from "../../assets/svgs/logo-navbar.svg";
import iconNotify from "../../assets/svgs/icons/icon-notify.svg";
import iconBell from "../../assets/svgs/icons/icon-bell.svg";
import iconMessage from "../../assets/svgs/icons/icon-message.svg";
import iconHamburg from "../../assets/svgs/icons/icon-hamburger.svg";
import iconUser from "../../assets/svgs/pet-sitter-management/pet-sitter-whiteProfile.svg";
import iconProfile from "../../assets/svgs/icons/icon-profile.svg";
import iconYourPet from "../../assets/svgs/icons/icon-your-pet.svg";
import iconBooking from "../../assets/svgs/icons/icon-booking.svg";
import iconLogout from "../../assets/svgs/icons/icon-logout.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/authentication";
import { SERVER_API_URL } from "../../core/config.mjs";
import axios from "axios";
import { useSocket } from "../../contexts/socket";

const Navbar = () => {
  const { logout, state } = useAuth();
  const { socket, hasNewNotification, setHasNewNotification } = useSocket();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    if (state.user) {
      fetchProfileData();
    }
  }, [state.user]);

  useEffect(() => {
    if (socket) {
      socket.on("newNotification", () => {
        setHasNewNotification(true);
      });
    }
    return () => {
      if (socket) {
        socket.off("newNotification");
      }
    };
  }, [socket]);

  const fetchProfileData = async () => {
    try {
      const { data } = await axios.get(`${SERVER_API_URL}/user`);
      if (
        data &&
        data.result &&
        data.result.length > 0 &&
        data.result[0].image
      ) {
        setProfilePic(data.result[0].image);
      } else {
        console.warn("Profile data is missing or malformed:", data);
      }
    } catch (error) {
      console.error("Error fetching profile data", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-white z-50 fixed w-full top-0 left-0">
        <div className="flex items-center justify-between py-3 px-5 md:px-20">
          <Link to="/">
            <img src={logoNavbar} alt="logo-navbar" />
          </Link>
          <div className="md:hidden">
            <div className="flex gap-6">
              <button className="relative">
                <img src={iconBell} alt="icon-bell" />
                <img
                  src={iconNotify}
                  alt="icon-bell"
                  className="absolute top-0 right-0"
                />
              </button>
              <Link to="/chat">
                <button className="relative">
                  <img src={iconMessage} alt="icon-message" />
                  <img
                    src={iconNotify}
                    alt="icon-message"
                    className="absolute top-0 right-0"
                  />
                </button>
              </Link>
              <button onClick={toggleMenu}>
                <img src={iconHamburg} alt="icon-hamburger" />
              </button>
            </div>
          </div>

          <ul
            className={`hidden md:flex items-center ${
              !state.user ? "gap-10" : "gap-6"
            }`}
          >
            {!state.user ? (
              <>
                <li>
                  <Link to="/auth/register/petsitter">Become a Pet Sitter</Link>
                </li>
                <li>
                  <Link to="/auth/login/user">Login</Link>
                </li>
                <li>
                  <button className="btn-primary">
                    <Link to="/search">Find A Pet Sitter</Link>
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button className="icon-btn relative">
                    <img src={iconBell} alt="icon-bell" />
                    <img
                      src={iconNotify}
                      alt="icon-bell"
                      className="absolute top-1 right-1"
                    />
                  </button>
                </li>
                <li>
                  <Link to="/chat">
                    <button className="icon-btn relative">
                      <img src={iconMessage} alt="icon-message" />
                      {hasNewNotification && (
                        <img
                          src={iconNotify}
                          alt="icon-message"
                          className="absolute top-1 right-1"
                        />
                      )}
                    </button>
                  </Link>
                </li>
                <li className="relative">
                  <button
                    className="w-12 h-12 rounded-full bg-[#DCDFED] flex items-center justify-center object-cover"
                    onClick={toggleMenu}
                  >
                    {profilePic ? (
                      <img
                        src={profilePic}
                        alt="icon-user"
                        className="rounded-full w-12 h-12"
                      />
                    ) : (
                      <img src={iconUser} alt="icon-user" className="w-5 h-5" />
                    )}
                  </button>
                  {isMenuOpen && (
                    <ul className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-50">
                      <li className="flex gap-3 p-4 hover:bg-gray-100">
                        <img src={iconProfile} alt="icon-profile" />
                        <Link to="/user/profile" onClick={closeMenu}>
                          Profile
                        </Link>
                      </li>
                      <li className="flex gap-3 p-4 hover:bg-gray-100">
                        <img src={iconYourPet} alt="icon-your-pet" />
                        <Link to="/user/pet" onClick={closeMenu}>
                          Your Pet
                        </Link>
                      </li>
                      <li className="flex gap-3 p-4 hover:bg-gray-100">
                        <img src={iconBooking} alt="icon-booking" />
                        <Link to="/user/booking-history" onClick={closeMenu}>
                          Booking History
                        </Link>
                      </li>
                      <hr />
                      <li className="flex gap-3 p-4 hover:bg-gray-100">
                        <img src={iconLogout} alt="icon-logout" />
                        <button
                          onClick={() => {
                            logout();
                            closeMenu();
                          }}
                        >
                          Log out
                        </button>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  <button className="btn-primary">
                    <Link to="/search">Find A Pet Sitter</Link>
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <div className="pt-16">
        {isMenuOpen && (
          <ul className="flex-col py-10 px-4 md:hidden bg-white w-full shadow-md absolute top-0 left-0 z-40">
            {!state.user ? (
              <>
                <li className="p-4 pt-10">
                  <Link to="/auth/register/petsitter">Become a Pet Sitter</Link>
                </li>
                <li className="p-4">
                  <Link to="/auth/login/user">Login</Link>
                </li>
                <li className="p-4">
                  <button className="btn-primary w-full">
                    <Link to="/search">Find A Pet Sitter</Link>
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="flex gap-3 p-4 pt-10">
                  <img src={iconProfile} alt="icon-profile" />
                  <Link to="/user/profile" onClick={closeMenu}>
                    Profile
                  </Link>
                </li>
                <li className="flex gap-3 p-4">
                  <img src={iconYourPet} alt="icon-your-pet" />
                  <Link to="/user/pet" onClick={closeMenu}>
                    Your Pet
                  </Link>
                </li>
                <li className="flex gap-3 p-4">
                  <img src={iconBooking} alt="icon-booking" />
                  <Link to="/user/booking-history" onClick={closeMenu}>
                    Booking History
                  </Link>
                </li>
                <hr />
                <li className="flex gap-3 p-4">
                  <img src={iconLogout} alt="icon-logout" />
                  <button
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                  >
                    Log out
                  </button>
                </li>
                <li className="p-4">
                  <button className="btn-primary w-full">
                    <Link to="/search" onClick={closeMenu}>
                      Find A Pet Sitter
                    </Link>
                  </button>
                </li>
              </>
            )}
          </ul>
        )}
      </div>
    </>
  );
};

export default Navbar;
