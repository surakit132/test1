import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const Bookingdate = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [time, setTime] = useState('');

  const handleDateChange = (date) => {
    setStartDate(date);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Date: ${moment(startDate).format('YYYY-MM-DD')} Time: ${time}`);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Booking</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Select Date:</label>
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Select Time:</label>
          <input
            type="time"
            value={time}
            onChange={handleTimeChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Book Now</button>
      </form>
    </div>
  );
};

export default Bookingdate;