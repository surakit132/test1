import sql from "../utils/db.mjs";
import "dotenv/config";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const formatTime = (time) => {
  if (Array.isArray(time) && time.length > 0) {
    time = time[0];
  }
  if (typeof time === "number") {
    const hours = String(Math.floor(time / 60)).padStart(2, "0");
    const minutes = String(time % 60).padStart(2, "0");
    return `${hours}:${minutes}:00`;
  } else if (typeof time === "string") {
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}:00`;
  } else {
    throw new Error("Invalid time format");
  }
};

export const bookingList = async (req, res) => {
  let result;

  try {
    result = await sql`select * from bookings`;
  } catch {
    return res.status(500).json({
      message: `Sever could not retrieves a booking list because database connection`,
    });
  }

  if (!result) {
    return res.status(404).json({
      message: `The reason the data could not be located was that it was never stored in the database you asked for`,
    });
  }

  return res.status(200).json({
    message: `Successfully retrieved the list of booking`,
    data: result,
  });
};

export const bookingInformation = async (req, res) => {
  const userIdFromClient = req.user.id;

  try {
    const result = await sql`
    SELECT
      bookings.id AS booking_id,
      bookings.created_at AS booking_created_at,
      to_char(booking_payments.created_at, 'Dy, DD Mon YYYY') AS payment_created_at,
      booking_payments.transaction_number,
      TO_CHAR(booking_payments.amount, 'FM999,999,999.00') AS amount,
      pet_sitter_profiles.firstname,
      pet_sitter_profiles.lastname,
      to_char(bookings.booking_date, 'DD Mon, YYYY') AS booking_date,
      to_char(bookings.booking_time_start, 'HH12:MI AM') AS booking_time_start,
      to_char(bookings.booking_time_end, 'HH12:MI AM') AS booking_time_end,
      FLOOR(SUM(EXTRACT(EPOCH FROM (bookings.booking_time_end - bookings.booking_time_start))/60/2)) AS total_minutes,
      string_agg(pets.pet_name, ', ') AS pet_names
    FROM bookings
    JOIN pet_sitter_profiles 
      ON bookings.pet_sitter_id = pet_sitter_profiles.pet_sitter_id
    JOIN booking_payments 
      ON bookings.id = booking_payments.booking_id
    JOIN booking_pets 
      ON bookings.id = booking_pets.booking_id
    JOIN pets
      ON booking_pets.pet_id = pets.id
    WHERE bookings.user_id = 33
    GROUP BY 
      bookings.id,
      booking_payments.created_at,
      booking_payments.transaction_number,
      booking_payments.amount,
      pet_sitter_profiles.firstname,
      pet_sitter_profiles.lastname,
      bookings.booking_date,
      bookings.booking_time_start,
      bookings.booking_time_end
    ORDER BY bookings.id DESC
    LIMIT 1
    `;

    return res.status(200).json({
      message: `Successfully retrieved the booking`,
      data: result[0],
    });
  } catch (error) {
    console.error("Error retrieving booking information:", error);
    return res.status(500).json({
      message: `Server could not retrieve booking information due to a database connection issue`,
      error: error.message,
    });
  }
};

export const saveBookingData = async (req, res) => {
  try {
    const newBooking = {
      ...req.body,
      created_at: new Date(),
      updated_at: new Date(),
    };

    newBooking.booking_time_start = formatTime(newBooking.booking_time_start);
    newBooking.booking_time_end = formatTime(newBooking.booking_time_end);

    newBooking.amount = newBooking.amount / 100;

    console.log(newBooking);

    const petIds = newBooking.pet_id;

    const cleanValue = (value) => (value === undefined ? null : value);

    const result = await sql.begin(async (sql) => {
      const [newBookingResult] = await sql`
        INSERT INTO bookings (
          pet_sitter_id,
          user_id,
          firstname,
          lastname,
          email,
          phone_number,
          additional_message,
          status,
          booking_date,
          booking_time_start,
          booking_time_end,
          created_at,
          updated_at
        )
        VALUES (
          ${cleanValue(newBooking.pet_sitter_id)}, 
          ${cleanValue(newBooking.user_id)}, 
          ${cleanValue(newBooking.first_name)}, 
          ${cleanValue(newBooking.last_name)}, 
          ${cleanValue(newBooking.email)}, 
          ${cleanValue(newBooking.phone_number)}, 
          ${cleanValue(newBooking.message)},
          ${cleanValue(newBooking.status)},
          ${cleanValue(newBooking.booking_date)}, 
          ${cleanValue(newBooking.booking_time_start)}, 
          ${cleanValue(newBooking.booking_time_end)}, 
          ${cleanValue(newBooking.created_at)}, 
          ${cleanValue(newBooking.updated_at)}
        )
        RETURNING id
      `;

      const newBookingId = newBookingResult.id;
      for (const pet_id of petIds) {
        await sql`
          INSERT INTO booking_pets (
            booking_id, 
            pet_id, 
            created_at, 
            updated_at
          )
          VALUES (
            ${newBookingId}, 
            ${cleanValue(pet_id)}, 
            ${cleanValue(newBooking.created_at)}, 
            ${cleanValue(newBooking.updated_at)}
          )
        `;
      }

      const paymentResult = await sql`
        INSERT INTO booking_payments (
          booking_id,
          transaction_number,
          amount,
          created_at,
          updated_at
        )
        VALUES (
          ${newBookingId},
          ${cleanValue(newBooking.transaction_number)},
          ${cleanValue(newBooking.amount)},
          ${cleanValue(newBooking.created_at)},
          ${cleanValue(newBooking.updated_at)}
        )
        RETURNING *
      `;

      return {
        newBooking: newBookingResult,
        payment: paymentResult,
      };
    });

    return res.status(201).json({
      message: `Created booking successfully`,
      data: result,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    return res.status(500).json({
      message: `Server could not create booking because of database connection issue`,
      error: error.message,
    });
  }
};

export const createPaymentIntent = async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "thb",
      payment_method_types: ["card"],
    });

    if (paymentIntent.client_secret) {
      res.send({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      });
    } else {
      throw new Error("Failed to generate client secret");
    }
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({
      message: `Failed to create payment intent: ${error.message}`,
    });
  }
};

export const cancelPaymentIntent = async (req, res) => {
  const { paymentIntentId } = req.body;

  try {
    const canceledPaymentIntent = await stripe.paymentIntents.cancel(
      paymentIntentId
    );
    res.status(200).json({
      message: "Payment intent canceled successfully",
      data: canceledPaymentIntent,
    });
  } catch (error) {
    console.error("Error canceling payment intent:", error);
    res
      .status(500)
      .json({ message: `Failed to cancel payment intent: ${error.message}` });
  }
};
