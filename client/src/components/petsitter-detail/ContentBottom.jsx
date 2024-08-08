/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import StarRating from "../searchs/StarRating";
import star2 from "../../assets/svgs/star2.svg";

function ContentBottom({
  reviews,
  selectedRatings,
  setSelectedRatings,
  filters,
  setFilters,
  averageRating,
  totalReviews,
}) {
  const handleAllReview = () => {
    setSelectedRatings([]);
    setFilters((prevFilters) => ({
      ...prevFilters,
      rating: [],
    }));
  };

  // Function to handle rating changes
  const handleRatingChange = (rating) => {
    setSelectedRatings((prevRatings) => {
      const newRatings = prevRatings.includes(rating)
        ? prevRatings.filter((r) => r !== rating)
        : [...prevRatings, rating];

      // Update filters to match the new set of selected ratings
      setFilters((prevFilters) => ({
        ...prevFilters,
        rating: newRatings,
      }));

      return newRatings;
    });
  };

  // Function to render stars based on rating
  const renderStars = (count) => {
    return Array.from({ length: count }, (_, index) => (
      <img
        key={index}
        src={star2}
        alt={`${count} star`}
        className="size-[20px]"
      />
    ));
  };

  // Filter reviews based on the selected rating
  const filteredReviews = reviews.filter((review) => {
    const reviewRating = review.rating;
    return filters.rating.length === 0 || filters.rating.includes(reviewRating);
  });

  return (
    <div className="bg-gray-100 flex flex-col p-[16px] lg:p-[24px] gap-[24px] lg:gap-[16] lg:rounded-tl-[120px] lg:rounded-tr-[16px] lg:rounded-br-[16px] lg:rounded-bl-[16px] ">
      <div className="bg-white flex flex-col lg:flex-row rounded-tl-[99px] rounded-tr-[12px] rounded-br-[12px] rounded-bl-[12px] lg:rounded-tl-[99px] lg:rounded-tr-[12px] lg:rounded-br-[12px] lg:rounded-bl-[99px] p-[24px]  lg:p-[24px] gap-[16px] lg:gap-[40px] ">
        <div className="bg-black relative rounded-full flex flex-col items-center justify-center text-white  w-[146px] min-w-[146px] h-[146px] ">
          <div className="text-center z-10  ">
            <h1 className="text-[36px] leading-[44px] font-bold">
              {averageRating}
            </h1>
            <p className="text-[14px] leading-[24px] font-medium">
              {totalReviews} Reviews
            </p>
          </div>
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-black rounded-tl-full   "></div>
        </div>
        <div className=" flex flex-col gap-[12px] lg:gap-[16px] ">
          <p className="text-black text-20px lg:text-[24px] lg:leading-[32px] font-bold ">
            Rating & Reviews
          </p>
          <div className="flex flex-wrap gap-[8px]  ">
            <button
              className="flex gap-[2px] h-[36px] py-1 px-3 rounded-lg border text-[16px]  leading-7 items-center border-1 border-orange-500 text-orange-500 active:bg-orange-200 "
              onClick={handleAllReview}
            >
              All Reviews
            </button>
            {["5", "4", "3", "2", "1"].map((rating, index) => (
              <button
                className={`gap-[3px] pt-[4px] pr-[8px] pb-[4px] pl-[8px] text-[16px] leading-7 flex items-center border-gray-200 rounded-[8px] border md:ml-1 ${
                  selectedRatings.includes(rating)
                    ? "border-1 border-orange-500 text-orange-500"
                    : "bg-white text-gray-800"
                }`}
                key={index}
                onClick={() => handleRatingChange(rating)}
              >
                {rating}
                {renderStars(rating)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredReviews.length > 0 ? (
        filteredReviews.map((review, index) => (
          <div
            key={index}
            className="#F6F6F9 flex flex-col  gap-[16px] border-b-[1px] lg:items-center lg:pt-[24px] lg:pr-[24px] lg:pb-[40px] lg:pl-[24px] lg:flex-row "
          >
            <div className="flex justify-between ">
              <div className="flex gap-[16px]">
                <img
                  src={review.image}
                  className="h-[36px] w-[36px] rounded-[99px] "
                  alt="user avatar"
                />
                <div className="w-[148px] w-max-[220px] ">
                  <h1>
                    {review.firstname} {review.lastname}
                  </h1>
                  <p>{review.formatted_booking_date}</p>
                </div>
              </div>
              <div className="flex gap-[2px] lg:hidden">
                <StarRating rating={review.rating} />
              </div>
            </div>
            <div className="flex flex-col text-primarygray-500 text-[14px] leading-[24px] font-medium ">
              <div className="hidden gap-[2px] lg:flex">
                <StarRating rating={review.rating} />
              </div>
              <p>{review.review}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No reviews available</p>
      )}
    </div>
  );
}
export default ContentBottom;
