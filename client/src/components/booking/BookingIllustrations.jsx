import iconStar from "../../assets/svgs/star1.svg";
import iconCurveBlue from "../../assets/svgs/curve-blue.svg";

const BookingIllustrations = () => {
  return (
    <figure className="hidden md:block absolute md:w-[388px] h-[300px] right-0 bottom-0">
      <img
        src={iconStar}
        alt="icon-star"
        className="rotate-90 absolute -bottom-20"
      />
      <img
        src={iconCurveBlue}
        alt="icon-curve-blue"
        className="absolute right-0"
      />
    </figure>
  );
};

export default BookingIllustrations;
