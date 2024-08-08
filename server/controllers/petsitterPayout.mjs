import sql from '../utils/db.mjs';

const formatTransactionDate = (date) => {
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(new Date(date));
  return `${formattedDate}`;
};

const maskAccountNumber = (accountNumber) => {
  return `*${accountNumber.slice(-3)}`;
};

export const viewAllPayoutRecord = async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await sql`
      SELECT bookings.id, bookings.firstname, bookings.lastname, booking_payments.created_at, booking_payments.transaction_number, booking_payments.amount, pet_sitter_profiles.bank, pet_sitter_profiles.account_number
      FROM bookings
      LEFT JOIN booking_payments ON bookings.id = booking_payments.booking_id
      LEFT JOIN pet_sitter_profiles ON bookings.pet_sitter_id = pet_sitter_profiles.pet_sitter_id
      WHERE bookings.pet_sitter_id = ${userId}
      ORDER BY booking_payments.created_at DESC
    `;

    console.log("Query Result:", result);

    if (result.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    const totalAmountResult = await sql`
      SELECT SUM(booking_payments.amount) as total_amount
      FROM bookings
      LEFT JOIN booking_payments ON bookings.id = booking_payments.booking_id
      WHERE bookings.pet_sitter_id = ${userId}
    `;

    console.log("Total Amount Result:", totalAmountResult);

    const bookings = result.map((record) => ({
      transaction_date: formatTransactionDate(record.created_at),
      petOwnerName: `${record.firstname} ${record.lastname}`,
      transaction_number: record.transaction_number,
      amount: parseFloat(record.amount).toFixed(2),
    }));

    const bankAccountInfo = {
      bank: result[0].bank,
      account_number: maskAccountNumber(result[0].account_number),
    };

    const response = {
      total_amount: parseFloat(totalAmountResult[0].total_amount).toFixed(2),
      bank_account: bankAccountInfo,
      bookings: bookings,
    };

    res.json(response);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send('Internal Server Error');
  }
};