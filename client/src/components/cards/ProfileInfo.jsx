import iconBell from "../../assets/svgs/icons/icon-bell.svg";
import iconMessage from "../../assets/svgs/icons/icon-message.svg";
import iconGuest from "../../assets/svgs/icons/icon-image-guest.svg";
import iconNotify from "../../assets/svgs/icons/icon-notify.svg";

const ProfileInfo = () => {
  return (
    <section className="flex gap-6">
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

          <button className="relative">
            <img src={iconMessage} alt="icon-message" />
            <img
              src={iconNotify}
              alt="icon-message"
              className="absolute top-0 right-0"
            />
          </button>

          <button onClick={props.toggleMenu}>
            <img src={iconHamburg} alt="icon-hamburger" />
          </button>
        </div>
      </div>

      <ul className="hidden md:flex items-center gap-6">
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
          <button className="icon-btn relative">
            <img src={iconMessage} alt="icon-message" />
            <img
              src={iconNotify}
              alt="icon-message"
              className="absolute top-1 right-1"
            />
          </button>
        </li>
        <li>
          <button>
            <img src={iconGuest} alt="icon-guest" />
          </button>
        </li>
        <li>
          <button>
            <button className="btn-primary">Find A Pet Sitter</button>
          </button>
        </li>
      </ul>

      {/* {!isMenuOpen && (
        <ul className="flex-col py-10 px-4 md:hidden">
          <li className="flex gap-3 p-4">
            <img src={iconProfile} alt="icon-profile" />
            <a href="#">Profile</a>
          </li>
          <li className="flex gap-3 p-4">
            <img src={iconYourPet} alt="icon-your-pet" />
            <a href="#">Your Pet</a>
          </li>
          <li className="flex gap-3 p-4">
            <img src={iconBooking} alt="icon-booking" />
            <a href="#">Booking History</a>
          </li>
          <hr />
          <li className="flex gap-3 p-4">
            <img src={iconLogout} alt="icon-logout" />
            <a href="#">Log out</a>
          </li>
          <li className="p-4">
            <button className="btn-primary w-full">Find A Pet Sitter</button>
          </li>
        </ul>
      )} */}
    </section>
  );
};

export default ProfileInfo;
