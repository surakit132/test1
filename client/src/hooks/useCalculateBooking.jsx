export const useCalculateBooking = () => {
  const formatDate = (date) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const dateString = new Date(date).toLocaleDateString("en-US", options);
    const [month, day, year] = dateString.replace(",", "").split(" ");
    return `${day} ${month}, ${year}`;
  };

  const calculateDuration = (bookingTimeStart, bookingTimeEnd) => {
    let durationInMinutes = bookingTimeEnd - bookingTimeStart;

    if (durationInMinutes < 0) {
      durationInMinutes += 24 * 60;
    }

    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;

    const hoursDisplay =
      hours > 0 ? `${hours} Hour${hours > 1 ? "s" : ""}` : "";
    const minutesDisplay =
      minutes > 0 ? `${minutes} Minute${minutes > 1 ? "s" : ""}` : "";

    return [hoursDisplay, minutesDisplay].filter(Boolean).join(" ");
  };

  const calculateTotalCost = (pets, bookingTimeStart, bookingTimeEnd) => {
    let countPet = pets.length;
    let startMinutes = bookingTimeStart[0];
    let endMinutes = bookingTimeEnd[0];

    let hours = (endMinutes - startMinutes) / 60;

    let perHour = 200;
    let firstPetCost = 600;
    let additionalPetCost = 300;

    let totalHourCost = hours * perHour;
    let totalPetCost = 0;

    if (countPet > 0) {
      totalPetCost += firstPetCost;
      totalPetCost += (countPet - 1) * additionalPetCost;
    }

    let totalCost = totalHourCost + totalPetCost;

    return totalCost.toFixed(2);
  };

  const duration = (bookingTotalMinutes) => {
    if (bookingTotalMinutes < 0) {
      bookingTotalMinutes += 24 * 60;
    }

    const hours = Math.floor(bookingTotalMinutes / 60);
    const minutes = bookingTotalMinutes % 60;

    const hoursDisplay =
      hours > 0 ? `${hours} Hour${hours > 1 ? "s" : ""}` : "";
    const minutesDisplay =
      minutes > 0 ? `${minutes} Minute${minutes > 1 ? "s" : ""}` : "";

    return [hoursDisplay, minutesDisplay].filter(Boolean).join(" ");
  };
  return { formatDate, calculateDuration, calculateTotalCost, duration };
};
