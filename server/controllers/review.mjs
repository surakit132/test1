import sql from "../utils/db.mjs";
export const getUserReview = async (req, res) => {
  try {
    const pet_sitter_id = req.params.pet_sitter_id;

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 5;
    const offset = (page - 1) * pageSize;

    const selectedRatings = Array.isArray(req.query.rating)
      ? req.query.rating
      : req.query.rating
      ? req.query.rating.split(",")
      : [];

    const totalQuery = sql`
      SELECT COUNT(*) AS total
      FROM user_reviews
      INNER JOIN bookings ON user_reviews.booking_id = bookings.id
      WHERE bookings.pet_sitter_id = ${pet_sitter_id}
      ${
        selectedRatings.length > 0
          ? sql`AND user_reviews.rating = ANY(${sql.array(selectedRatings)})`
          : sql``
      }
    `;
    const totalReviews = await totalQuery;
    const totalCount = totalReviews[0].total;

    const reviewsQuery = sql`
  SELECT
    user_reviews.id AS review_id,
    user_reviews.rating,
    user_reviews.review,
    user_reviews.created_at AS review_date,
    user_profiles.id AS user_id,
    user_profiles.image,
    user_profiles.firstname,
    user_profiles.lastname,
    bookings.pet_sitter_id,
    bookings.user_id,
    to_char(bookings.booking_date, 'DD Mon, YYYY') AS formatted_booking_date        
  FROM user_reviews
  INNER JOIN bookings ON user_reviews.booking_id = bookings.id
  INNER JOIN user_profiles ON user_profiles.user_id = bookings.user_id
  WHERE bookings.pet_sitter_id = ${pet_sitter_id}
  ${
    selectedRatings.length > 0
      ? sql`AND user_reviews.rating = ANY(${sql.array(selectedRatings)})`
      : sql``
  }
  ORDER BY user_reviews.created_at DESC
  LIMIT ${pageSize} OFFSET ${offset}
`;
    const results = await reviewsQuery;

    // Query to get all reviews for average rating calculation
    const allReviewsQuery = sql`
      SELECT rating
      FROM user_reviews
      INNER JOIN bookings ON user_reviews.booking_id = bookings.id
      WHERE bookings.pet_sitter_id = ${pet_sitter_id}
    `;
    const allReviews = await allReviewsQuery;

    // Calculate average rating from all reviews
    const averageRating =
      allReviews.length > 0
        ? Math.round(
            (allReviews.reduce(
              (sum, review) => sum + Number(review.rating),
              0
            ) /
              allReviews.length) *
              2
          ) / 2
        : 0;
    
    // Update pet_sitter_profiles with the new average rating
    const updateResult = await sql`
      UPDATE pet_sitter_profiles
      SET rating = ${averageRating}
      WHERE pet_sitter_id = ${pet_sitter_id}
    `;
   

    return res.status(200).json({
      message: "User reviews have been shown",
      data: results,
      currentPage: page,
      pageSize: pageSize,
      total: totalCount,
      averageRating,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
