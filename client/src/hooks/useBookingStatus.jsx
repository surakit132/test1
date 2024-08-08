import { useState, useEffect } from 'react';
import axios from 'axios';
import { SERVER_API_URL } from '../core/config.mjs';

const useBookingStatus = () => {
  const [hasWaitingForConfirm, setHasWaitingForConfirm] = useState(false);

  useEffect(() => {
    const fetchBookingStatuses = async () => {
      try {
        const response = await axios.get(`${SERVER_API_URL}/petsitter/booking/status`);
        const bookings = response.data.data;
        setHasWaitingForConfirm(bookings.length > 0);
      } catch (error) {
        console.error('Error fetching booking statuses:', error);
      }
    };

    fetchBookingStatuses();
  }, []);

  return hasWaitingForConfirm;
};

export default useBookingStatus;