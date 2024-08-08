import React from "react";
import searchIcon from "../../../assets/svgs/icons/icon-search.svg";
import dropdownIcon from "../../../assets/svgs/icons/icon-dropdown.svg";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import petSitterOrangeCircle from "../../../assets/svgs/pet-sitter-management/pet-sitter-orangeCircle.svg";
import petSitterBlueCircle from "../../../assets/svgs/pet-sitter-management/pet-sitter-blueCircle.svg";
import petSitterPinkCircle from "../../../assets/svgs/pet-sitter-management/pet-sitter-pinkCircle.svg";
import petSitterGreenCircle from "../../../assets/svgs/pet-sitter-management/pet-sitter-greenCircle.svg";
import petSitterRedCircle from "../../../assets/svgs/pet-sitter-management/pet-sitter-redCircle.svg";


const statusIcons = {
  "Waiting for confirm": petSitterPinkCircle,
  "Waiting for service": petSitterOrangeCircle,
  "In service": petSitterBlueCircle,
  Success: petSitterGreenCircle,
  Canceled: petSitterRedCircle,
};

const statusColors = {
  "Waiting for confirm": "#FA8AC0",
  "Waiting for service": "#FF7037",
  "In service": "#76D0FC",
  Success: "#1CCD83",
  Canceled: "#EA1010",
};

const PetSitterBooking = ({ bookingsData, setStatus, setSearchQuery, status, searchQuery, onBookingClick }) => {
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <section className="bg-gray-100 px-[40px] pt-[40px] py-[184px] flex flex-col gap-[24px]">
      <header className="flex flex-col items-center gap-[24px] md:flex-row">
        <h3 className="flex flex-1 text-[24px] leading-[32px] font-bold">
          Booking List
        </h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-[240px] p-[12px] pr-[16px] rounded-[8px] border-[1px] outline-none"
            value={searchQuery}
            onChange={handleSearchChange}
            aria-label="Search bookings"
          />
          <img
            src={searchIcon}
            alt="Search Icon"
            className="absolute top-1/2 right-[16px] transform -translate-y-1/2"
          />
        </div>
        <div className="relative">
          <img
            src={dropdownIcon}
            alt="Dropdown Icon"
            className="absolute bottom-[20px] right-[16px]"
          />
          <select
            className="w-[240px] border-[1px] rounded-[8px] h-[50px] bg-white text-gray-400 text-[16px] leading-[24px] p-[12px] pr-[16px] appearance-none outline-none"
            value={status}
            onChange={handleStatusChange}
            aria-label="Filter by status"
          >
            <option value="All status">All status</option>
            <option value="Success">Success</option>
            <option value="Waiting for confirm">Waiting for confirm</option>
            <option value="Waiting for service">Waiting for service</option>
            <option value="In service">In service</option>
            <option value="Canceled">Canceled</option>
          </select>
        </div>
      </header>
      <main>
        <TableContainer component={Paper} className="!rounded-[20px]">
          <Table sx={{ minWidth: 650 }} aria-label="booking table">
            <TableHead>
              <TableRow className="bg-black">
                <TableCell className="!text-white">Pet Owner Name</TableCell>
                <TableCell className="!text-white" align="left">Pet(s)</TableCell>
                <TableCell className="!text-white" align="left">Duration</TableCell>
                <TableCell className="!text-white" align="left">Booked Date</TableCell>
                <TableCell className="!text-white" align="left">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookingsData.map((booking) => (
                <TableRow
                  key={booking.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  onClick={() => onBookingClick(booking.id)} 
                  className="cursor-pointer hover:bg-gray-100" 
                >
                  <TableCell component="th" scope="row" className="font-medium">
                  {booking.status === "Waiting for confirm" && (
                      <img src={petSitterOrangeCircle} alt="Waiting for confirm" className="inline-block mr-[8px] align-middle" />
                    )}
                    {booking.petOwnerName}
                  </TableCell>
                  <TableCell align="left" className="font-medium">{booking.petCount}</TableCell>
                  <TableCell align="left" className="font-medium">{booking.duration}</TableCell>
                  <TableCell align="left" className="font-medium">{booking.bookedDate}</TableCell>
                  <TableCell align="left" className="font-medium">
                    <div className="flex items-center gap-[8px]">
                      <img src={statusIcons[booking.status]} alt={booking.status} className="w-[6px] h-[6px] inline-block align-middle" />
                      <span className="align-middle" style={{ color: statusColors[booking.status] }}>{booking.status}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </main>
    </section>
  );
};

export default PetSitterBooking;