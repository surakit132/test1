import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { SERVER_API_URL } from "../../core/config.mjs";
import { useState } from "react";
import { useCalculateBooking } from "../../hooks/useCalculateBooking";
import BookingSummary from "../booking/BookingSummary";
import BookingConfirm from "../booking/BookingConfirm";
import { useNavigate } from "react-router-dom";

const PayMentForm = ({ onPrev, bookingData, setBookingData }) => {
  const { calculateTotalCost } = useCalculateBooking();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBookingData({ ...bookingData, [name]: value });
  };

  const createPaymentIntent = async () => {
    if (paymentIntentId) {
      console.warn("PaymentIntent already exists.");
      return;
    }

    setLoading(true);
    const totalAmount =
      calculateTotalCost(
        bookingData.pet_name,
        bookingData.booking_time_start,
        bookingData.booking_time_end
      ) * 100;

    console.log();

    try {
      const response = await axios.post(
        `${SERVER_API_URL}/bookings/paymentIntent`,
        {
          amount: totalAmount,
        }
      );

      if (
        response.data &&
        response.data.clientSecret &&
        response.data.paymentIntentId
      ) {
        setClientSecret(response.data.clientSecret);
        setPaymentIntentId(response.data.paymentIntentId);
        setIsModalOpen(true);
        console.log("Create clientSecret", clientSecret);
        console.log("Create paymentIntentId", paymentIntentId);
      } else {
        throw new Error(
          "Client secret or PaymentIntent ID not found in response"
        );
      }
    } catch (error) {
      console.error("Error fetching client secret:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const cancelPayment = async (paymentIntentId) => {
    try {
      await axios.post(`${SERVER_API_URL}/bookings/cancelPaymentIntent`, {
        paymentIntentId,
      });
      console.log("Payment intent canceled successfully");

      setClientSecret("");
      setPaymentIntentId("");
      console.log("Cancel ClientSecret", clientSecret);
      console.log("Cancel PaymentIntentId", paymentIntentId);
    } catch (error) {
      console.error("Error canceling payment intent:", error);
    }
  };

  const confirmPayment = async (clientSecret) => {
    if (!stripe || !elements) {
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardNumberElement,
          billing_details: {
            name: bookingData.card_owner,
          },
        },
      }
    );

    if (error) {
      console.log("error", error.message);
      return null;
    } else {
      console.log("paymentIntent", paymentIntent);
      return paymentIntent;
    }
  };

  const saveBookingData = async (paymentIntent) => {
    const newBooking = {
      ...bookingData,
      transaction_number: paymentIntent.created,
      amount: paymentIntent.amount,
    };

    try {
      const response = await axios.post(
        `${SERVER_API_URL}/bookings`,
        newBooking
      );
      console.log("Booking saved:", response.data);
    } catch (error) {
      console.error("Error saving booking data:", error);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await createPaymentIntent();
  };

  const handleConfirm = async () => {
    try {
      const paymentIntent = await confirmPayment(clientSecret);
      if (paymentIntent) {
        await saveBookingData(paymentIntent);
        navigate("/booking/confirmation");
      } else {
        console.error("Payment confirmation failed.");
      }
    } catch (error) {
      console.error(
        "Error during payment confirmation and booking save:",
        error
      );
    }
  };

  return (
    <form
      className="flex flex-col gap-4 py-10 px-4 rounded-2xl md:bg-white md:p-10"
      onSubmit={onSubmit}
    >
      <h3 className="text-[24px] leading-[32px] font-bold text-[#3A3B46]">
        Credit Card
      </h3>
      <div className="flex flex-wrap gap-4 md:gap-10">
        <div className="w-full flex flex-col gap-1 md:flex-1">
          <label htmlFor="cardNumber" className="input-label">
            Card Number*
          </label>
          <CardNumberElement id="cardNumber" className="input-box" />
        </div>
        <div className="w-full flex flex-col flex-1 gap-1 md:flex-1">
          <label htmlFor="cardOwner" className="input-label">
            Card Owner*
          </label>
          <input
            type="text"
            name="card_owner"
            placeholder="Card owner name"
            className="input-box"
            value={bookingData.card_owner}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-4 md:gap-10">
        <div className="w-full flex flex-col gap-1 md:flex-1">
          <label htmlFor="expiry" className="input-label">
            Expiry Date*
          </label>
          <CardExpiryElement id="expiry" className="input-box" />
        </div>
        <div className="w-full flex flex-col flex-1 gap-1 md:flex-1">
          <label htmlFor="cvc" className="input-label">
            CVC/CVV*
          </label>
          <CardCvcElement id="cvc" className="input-box" />
        </div>
      </div>
      <div className="md:hidden">
        <BookingSummary bookingData={bookingData} />
      </div>
      <div className="flex justify-between gap-[10px] py-6 px-4 bg-white md:rounded-b-2xl">
        <button
          type="button"
          className="btn-secondary md:w-[120px]"
          onClick={onPrev}
        >
          Back
        </button>
        <button type="submit" className="btn-primary md:w-[175px]">
          Confirm Booking
        </button>
      </div>

      {loading && <p className="text-blue-500">Loading ...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <BookingConfirm
        open={isModalOpen}
        cancelAndClose={() => setIsModalOpen(false)}
        handleConfirm={() => handleConfirm(clientSecret)}
        paymentIntentId={paymentIntentId}
        cancelPayment={cancelPayment}
      />
    </form>
  );
};

export default PayMentForm;
