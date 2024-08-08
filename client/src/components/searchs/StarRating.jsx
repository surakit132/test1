import React from "react";
import star2 from "../../assets/svgs/star2.svg"; // ตรวจสอบให้แน่ใจว่านี่คือดาวเต็ม

const validRatings = ["5", "4.5", "4", "3.5", "3", "2.5", "2", "1.5", "1"]; // รายการ rating ที่ใช้

// ฟังก์ชันเพื่อปัดเศษค่าดาวให้ตรงกับค่าที่ใกล้เคียงที่สุด
const roundRating = (rating) => {
  let closest = parseFloat(validRatings[0]);
  for (let i = 1; i < validRatings.length; i++) {
    const currentRating = parseFloat(validRatings[i]);
    if (Math.abs(currentRating - rating) < Math.abs(closest - rating)) {
      closest = currentRating;
    }
  }
  return closest;
};

const StarRating = ({ rating }) => {
  const roundedRating = roundRating(parseFloat(rating));
  const fullStars = Math.floor(roundedRating);
  const halfStar = roundedRating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <div className="flex flex-nowrap w-full">
      {Array.from({ length: fullStars }, (_, index) => (
        <img
          key={`full-${index}`}
          src={star2}
          alt="full star"
          className="size-3 md:size-5"
        />
      ))}

      {halfStar === 1 && (
        <img
          src={star2}
          alt="half star"
          className="size-3 md:size-5"
          style={{ clipPath: "inset(0 50% 0 0)" }}
        />
      )}
    </div>
  );
};
      {/* แสดงดาวที่ว่าง */}
      {/* {Array.from({ length: emptyStars }, (_, index) => (
        <img
          key={`empty-${index}`}
          src={star2}
          alt="empty star"
          className="size-3 md:size-5"
          style={{ opacity: 0.3 }} // ดาวที่ว่างจะเป็นสีเทาหรือโปร่งใส
        />
      ))} */}
    

export default StarRating;
