/* eslint-disable react/prop-types */
import star2 from "../../assets/svgs/star2.svg";
import cross from "../../assets/svgs/icons/icon-cross.svg";
import { useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { SERVER_API_URL } from "../../core/config.mjs";
import axios from "axios";

const RatingHistory = ({
  showRating,
  setShowRating,

  setShowReview,
  setReviewData,
}) => {
  const { getItem } = useLocalStorage();
  const [rating, setRating] = useState(0);
  const booking_id = getItem("bookingId");
  const [hoverRating, setHoverRating] = useState(0);
  const [userReview, setUserReview] = useState({
    booking_id: booking_id,
    rating: 0,
    review: "",
  });
  
  if (!showRating) {
    return null; // ถ้าไม่ควรแสดง modal ให้ return null
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserReview((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleStarClick = (value) => {
    setRating(value);
    setUserReview((prevData) => ({
      ...prevData,
      rating: value,
    }));
  };

  const handleMouseEnter = (value) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };
  const handleSend = async () => {
    try {
      // ส่งข้อมูลรีวิวไปยัง API
      const response = await axios.post(`${SERVER_API_URL}/booking-history/review`, {
        booking_id: userReview.booking_id,
        rating: rating,
        review: userReview.review,
      });

      // ตรวจสอบว่าการตอบสนองสำเร็จหรือไม่
      if (response.status === 200) {
        // การตอบสนองสำเร็จ
        console.log('Review submitted successfully:');

        // อัปเดตสถานะหรือข้อมูลในคอมโพเนนต์ตามที่ต้องการ
        setReviewData((prev) => ({ ...prev,
          rating: rating,
          text: userReview.review,
        }));

        // ปิด modal และแสดงรีวิว
        setShowRating(false);
        setShowReview(true);
      }
    } catch (error) {
      // จัดการข้อผิดพลาด
      console.error('Error submitting review:', error.message);
    }
  };

  const handleCancel = () => {
    setUserReview((prevData) => ({ ...prevData, review: "" }));
    setShowRating(false);
  };

  const stars = Array.from({ length: 5 }, (_, i) => {
    const starValue = i + 1;
    return (
      <img
        key={i}
        src={star2}
        alt="star"
        className={`size-12 cursor-pointer ${
          starValue <= (hoverRating || rating) ? "opacity-100" : "opacity-20"
        }`}
        onClick={() => handleStarClick(starValue)}
        onMouseEnter={() => handleMouseEnter(starValue)}
        onMouseLeave={handleMouseLeave}
      />
    );
  });

  return (
    <>
      <div className="bg-black fixed w-full  inset-0 bg-opacity-40  flex items-end justify-center md:items-center ">
        <div className="bg-white flex flex-col  rounded-t-[16px] w-full md:w-[800px] md:h-[800px]  md:rounded-2xl  ">
          <div className="flex justify-between border-b-[1px]  p-4 md:h-[80px] md:items-center  md:py-6 md:px-10 ">
            <h4 className="text-[20px] leading-7 w-full text-gray-600 font-bold ">
              Rating & Review
            </h4>
            <img
              src={cross}
              className="w-[24px] h-[24px] cursor-pointer"
              onClick={() => setShowRating(false)}
              alt="Close"
            />
          </div>

          <div className="flex flex-col gap-[80px] pt-10 pr-4 pb-6 pl-4 md:p-10">
            <div className="flex flex-col gap-6 md:gap-[80px] ">
              <div className="flex flex-col gap-6 ">
                <h3 className="text-[24px] leading-8 text-center w-full font-bold ">
                  What is your rate?
                </h3>
                <div className="flex flex-nowrap w-full gap-3 justify-center">
                  {stars}
                </div>
              </div>

              <div className="flex flex-col gap-6 pb-4 ">
                <h3 className=" text-[24px] leading-8 text-center w-full font-bold ">
                  Share more about your experience
                </h3>
                <div className="flex rounded-lg border pt-[12px] pr-[16px] pb-[12px] pl-[12px] gap-2 md:h-[243px]  ">
                  <textarea
                    name="review"
                    placeholder="Your review..."
                    rows="5" /* จำนวนบรรทัดเริ่มต้น */
                    className="w-full h-[80px] text-left p-2 resize-y md:h-full   " /* ปรับขนาดได้แนวตั้ง */
                    onChange={handleInputChange}
                    value={userReview.review}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-4">
              <button
                className="w-[120px] h-[48px] rounded-[99px] py-3 px-6 flex justify-center gap-2 btn-secondary "
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="w-[207px] h-[48px] rounded-[99px] py-3 px-6 flex justify-center gap-2 btn-primary "
                onClick={handleSend}
              >
                Send Review&Rating
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RatingHistory;
