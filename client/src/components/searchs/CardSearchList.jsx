/* eslint-disable react/prop-types */
import StarRating from "./StarRating";
import RoomIcon from "@mui/icons-material/Room";
import TypeList from "./TypeList";
import BackToTop from "./BackToTop";
import { Link } from "react-router-dom";

const CardSearchList = ({ profiles }) => {
  return (
    <Link  to={`/search/${profiles.pet_sitter_id}` }  >
      <div className=" w-full   rounded-[16px] p-4 gap-4 flex flex-col  xl:flex-row md:gap-6  bg-white  md:hover:shadow-xl md:transition-shadow md:duration-300 ">
        <div className="  md:w-[245px] md:h-[184px]  " >
          <img
            src={profiles.image_gallery[0]}
            alt="profild-web"
            className="hidden  rounded-lg md:w-[245px] md:h-[184px] md:block   "
          />
          <img
            src={profiles.image_gallery[0]}
            alt="card-img"
            className=" w-full  md:min-w-full md:min-h-[184px] rounded-[8px] md:hidden "
          />
        </div>
        <div className="  flex-1   flex flex-col justify-between  gap-6  ">
          <div className=" flex justify-between    md:gap-4  ">
            <div className=" flex gap-4">
              <div>
                <img
                  src={profiles.profile_image}
                  alt="image_gallery"
                  className="rounded-full size-[36px] md:size-[64px] bg-fixed   "
                />
              </div>

              <div >
                
                  <p className="text-nowrap">{profiles.pet_sitter_name}</p>
               

                <p className="text-nowrap">
                  {profiles.firstname} {profiles.lastname}{" "}
                </p>
              </div>
            </div>

            <div className="" >
              <button className="gap-[2px] p-2  h-[66px]  flex flex-nowrap  border-gray-200    ">
                <StarRating rating={profiles.rating} />
              </button>
            </div>
          </div>
          <div>
            <RoomIcon />
            {profiles.district} {profiles.province}
          </div>
          <div className="  flex  md:flex-col gap-6  ">
            <TypeList types={profiles.pet_type} />
          </div>
        </div>
        <BackToTop />
      </div>
      </Link>
  );
};

export default CardSearchList;
