/* eslint-disable react/prop-types */


import { Link } from "react-router-dom";
import cross from "../../assets/svgs/icons/icon-cross.svg";
import star2 from "../../assets/svgs/star2.svg";


const ReviewHistory = ({ showReview, setShowReview, reviewData }) => {
  if (!showReview) {
    return null;
  }

  const {
    rating = 0,
    text = "",
    profile_image = "",  
    firstname = "",      
    lastname = "",       
    booking_date = "" , 
    pet_sitter_id= pet_sitter_id,
  } = reviewData ;
  
  






  return (
    <>
      <div className="bg-black fixed w-full  inset-0 bg-opacity-40  flex items-end justify-center md:items-center">
        <div className="bg-white flex flex-col  rounded-t-[16px] w-full md:w-[800px] md:h-[600px] md:rounded-2xl   ">
          <div className="flex justify-between  w-full border-b  p-4 gap-[10px] md:h-[80px] md:py-6 md:px-10 ">
            <h4 className="text-[20px] leading-7  text-gray-600 font-bold ">
              Rating & Review
            </h4>
            <img
              src={cross}
              className="w-[24px] h-[24px] cursor-pointer"
              onClick={() => setShowReview(false)}
              alt="Close"
            />
          </div>

          <div className=" w-full flex flex-col    items-center gap-[80px] pt-[40px] pr-[16px] pb-[24px] pl-[16px]  md:p-10 md:justify-between md:h-full ">
            <div className=" w-full   ">
             <div className="flex  border-b justify-between md:pt-[24px] md:pr-[24px] md:pb-[40px] md:pl-[24px] md:gap-10 md:justify-start ">
                <div className="flex gap-4">
                  <img src={profile_image} alt="profile"  className="w-[56px] h-[56px] rounded-[99px] "/>
                  <div>
                    <p>{firstname} {lastname}</p>
                    <p>{booking_date}</p>
                  </div>
                </div>
                <div className="flex gap-[2px]  rounded-lg md:gap-1">
                  {[...Array(5)].map((_, i) => (
                    <img
                      key={i}
                      src={star2}
                      alt="star"
                      className={`size-3 md:size-5 ${
                        i + 1 <= rating ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className=" ">
                <p className="  px-4">{text}</p>
              </div>
            </div>

                <Link to={`/search/${pet_sitter_id}` }><button className="btn-secondary w-[157px] h-[48px] rounded-[99px] py-3 px-6 ">
                {" "}
                View Pet Sitter
              </button></Link>
              
           
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewHistory;
