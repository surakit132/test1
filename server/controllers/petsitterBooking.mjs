import sql from '../utils/db.mjs';
import { format } from 'date-fns';

const formatDate = (date) => {
  return format(new Date(date), 'dd MMM yyyy');
};

const calculateDuration = (startTime, endTime) => {
  const start = new Date(`1970-01-01T${startTime}Z`);
  const end = new Date(`1970-01-01T${endTime}Z`);
  let durationInMinutes = (end - start) / (1000 * 60);

  if (durationInMinutes < 0) {
    durationInMinutes += 24 * 60;
  }

  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;

  return `${hours > 0 ? `${hours} Hour${hours > 1 ? 's' : ''}` : ''} ${minutes > 0 ? `${minutes} Minute${minutes > 1 ? 's' : ''}` : ''}`.trim();
};

const formatBookedDate = (date, startTime, endTime) => {
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(new Date(date));

  const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' };
  const formattedStartTime = new Date(`1970-01-01T${startTime}Z`).toLocaleTimeString('en-US', timeOptions);
  const formattedEndTime = new Date(`1970-01-01T${endTime}Z`).toLocaleTimeString('en-US', timeOptions);

  return `${formattedDate} | ${formattedStartTime} - ${formattedEndTime}`;
};

const formatBookedDateDetail = (date, startTime, endTime) => {
  const formattedDate = format(new Date(date), 'dd MMM yyyy');
  const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' };
  const formattedStartTime = new Date(`1970-01-01T${startTime}Z`).toLocaleTimeString('en-US', timeOptions);
  const formattedEndTime = new Date(`1970-01-01T${endTime}Z`).toLocaleTimeString('en-US', timeOptions);

  return `${formattedDate} | ${formattedStartTime} - ${formattedEndTime}`;
};

export const viewAllPetsitterBookingList = async (req, res) => {
  const userId = req.user.id;
  const { searchQuery = '', status = 'All status' } = req.query;

  try {
    let query = sql`
      SELECT id, firstname, lastname, booking_date, booking_time_start, booking_time_end, status 
      FROM bookings 
      WHERE pet_sitter_id = ${userId}
    `;

    if (searchQuery) {
      query = sql`${query} AND (LOWER(firstname) LIKE ${
        "%" + searchQuery.toLowerCase() + "%"
      } OR LOWER(lastname) LIKE ${"%" + searchQuery.toLowerCase() + "%"})`;
    }

    if (status !== "All status") {
      query = sql`${query} AND status = ${status}`;
    }

    query = sql`${query} ORDER BY booking_date DESC, booking_time_start DESC`;

    const bookings = await query;

    const bookingPets = await sql`
      SELECT booking_id, COUNT(*) as pet_count 
      FROM booking_pets 
      WHERE booking_id IN (
        SELECT id 
        FROM bookings 
        WHERE pet_sitter_id = ${userId}
      ) 
      GROUP BY booking_id
    `;

    const bookingsData = bookings.map((booking) => {
      const petCount =
        bookingPets.find((pet) => pet.booking_id === booking.id)?.pet_count ||
        0;
      const duration = calculateDuration(
        booking.booking_time_start,
        booking.booking_time_end
      );
      const bookedDate = formatBookedDate(
        booking.booking_date,
        booking.booking_time_start,
        booking.booking_time_end
      );

      return {
        id: booking.id,
        petOwnerName: `${booking.firstname} ${booking.lastname}`,
        petCount,
        duration,
        bookedDate,
        status: booking.status,
      };
    });

    res.json({ data: bookingsData });
  } catch (error) {
    console.error("Error fetching bookings data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const viewPetsitterBookingDetail = async (req, res) => {
  const userId = req.user.id;
  const bookingId = req.params.booking_id;

  try {
    const booking = await sql`
      SELECT 
        bookings.id, bookings.firstname, bookings.lastname, bookings.email, 
        bookings.phone_number, bookings.booking_date, bookings.booking_time_start, 
        bookings.booking_time_end, bookings.status, bookings.additional_message, 
        bookings.user_id, user_profiles.id_number, user_profiles.date_of_birth, 
        user_profiles.image, (SELECT COUNT(*) FROM booking_pets WHERE booking_id = bookings.id) as pet_count,
        json_agg(json_build_object(
          'pet_image', pets.image,
          'pet_name', pets.pet_name,
          'pet_type', pets.pet_type,
          'breed', pets.breed,
          'sex', pets.sex,
          'age', pets.age,
          'color', pets.color,
          'weight', pets.weight,
          'about', pets.about
        )) as pets, 
        booking_payments.amount, booking_payments.created_at as transaction_date, 
        booking_payments.transaction_number
      FROM bookings
      LEFT JOIN user_profiles ON bookings.user_id = user_profiles.user_id
      LEFT JOIN booking_pets ON bookings.id = booking_pets.booking_id
      LEFT JOIN pets ON booking_pets.pet_id = pets.id
      LEFT JOIN booking_payments ON bookings.id = booking_payments.booking_id
      WHERE bookings.pet_sitter_id = ${userId} AND bookings.id = ${bookingId}
      GROUP BY bookings.id, user_profiles.id_number, user_profiles.date_of_birth, 
        user_profiles.image, bookings.user_id, booking_payments.amount, 
        booking_payments.created_at, booking_payments.transaction_number
    `;

    if (!booking.length) {
      console.log(`No booking found for ID: ${bookingId}`);
      return res.status(404).json({ error: 'Booking not found' });
    }

    const bookingDetails = booking[0];
    const duration = calculateDuration(bookingDetails.booking_time_start, bookingDetails.booking_time_end);
    const bookedDate = formatBookedDateDetail(bookingDetails.booking_date, bookingDetails.booking_time_start, bookingDetails.booking_time_end);

    const response = {
      id: bookingDetails.id,
      petOwnerName: `${bookingDetails.firstname} ${bookingDetails.lastname}`,
      petOwnerImage: bookingDetails.image,
      email: bookingDetails.email,
      phone_number: bookingDetails.phone_number,
      id_number: bookingDetails.id_number,
      date_of_birth: formatDate(bookingDetails.date_of_birth),
      petCount: bookingDetails.pet_count,
      pets: bookingDetails.pets,
      duration,
      booking_date_time: bookedDate,
      total_paid: bookingDetails.amount,
      transaction_date: formatDate(bookingDetails.transaction_date),
      transaction_number: bookingDetails.transaction_number,
      additional_message: bookingDetails.additional_message,
      status: bookingDetails.status,
      user_id: bookingDetails.user_id,
      booking_time_end: bookingDetails.booking_time_end,
      booking_date: bookingDetails.booking_date,

    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching booking details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const updateBookingStatus = async (req, res) => {
  const userId = req.user.id;
  const { booking_id } = req.params; 
  const { status } = req.body; 

  try {
    const result = await sql`
      UPDATE bookings
      SET status = ${status}
      WHERE id = ${booking_id} AND pet_sitter_id = ${userId}
      RETURNING *
    `;

    if (!result.length) {
      return res.status(404).json({ error: 'Booking not found or not authorized' });
    }

    res.json({ data: result[0] });
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getBookingStatus = async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await sql`
    SELECT status
    FROM bookings
    WHERE pet_sitter_id = ${userId} AND status = 'Waiting for confirm'`
    res.json({ data: result });
  } catch (error) {
    console.error('Error get booking status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
