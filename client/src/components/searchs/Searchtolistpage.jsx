/* eslint-disable react/prop-types */
import Checkbox from "@mui/material/Checkbox";

import { Button } from "@mui/base";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { orange } from "@mui/material/colors";
import star2 from "../../assets/svgs/star2.svg";

import SearchIcon from "@mui/icons-material/Search";

const Searchtolistpage = ({
  filters,
  setFilters,
  selectedPet,
  setSelectedPet,
  selectedRatings,
  setSelectedRatings,
  years,
  setYears,
  handleClearFilters,
  setSearchText,
  searchText,
}) => {
  const handlePetChange = (event) => {
    const value = event.target.value;
    setSelectedPet((prevSelectedPets) => {
      if (prevSelectedPets && Array.isArray(prevSelectedPets)) {
        return prevSelectedPets.includes(value)
          ? prevSelectedPets.filter((pet) => pet !== value)
          : [...prevSelectedPets, value];
      }
      return [value];
    });
  };

  const handleRatingChange = (rating) => {
    const numericRating = parseFloat(rating);
    setSelectedRatings((prevRatings) => {
      let newRatings = [...prevRatings];

      const ratingsToAdd = [numericRating];
      if (numericRating % 1 === 0) {
        ratingsToAdd.push(numericRating + 0.5);
      }

      ratingsToAdd.forEach((r) => {
        if (newRatings.includes(r)) {
          newRatings = newRatings.filter((rating) => rating !== r);
        } else {
          newRatings.push(r);
        }
      });

      // อัพเดท filters พร้อมกับ selectedRatings
      setFilters((prevFilters) => ({
        ...prevFilters,
        rating: newRatings,
      }));

      return newRatings;
    });
  };

  //ดึงรูปเข้าไปใน array
  const renderStars = (count) => {
    return Array.from({ length: count }, (_, index) => (
      <img key={index} src={star2} alt={`${count} star`} />
    ));
  };
  const handleSearch = () => {
    setFilters({
      ...filters,
      searchText,
      rating: selectedRatings,
      pet_type: selectedPet,
      experience: years,
    });
  };

  const handleExperienceChange = (event) => {
    const value = event.target.value;
    setYears(value);

    setFilters((prevFilters) => ({
      ...prevFilters,
      experience: value,
    }));
  };

  return (
    <aside>
      <div className="  md:pr-[40px] ">
        <div
          className="  md:bg-white  md:rounded-2xl   "
          style={{ boxShadow: "4px 4px 24px 0px rgba(0, 0, 0, 0.04)" }}
        >
          <div className="hidden md:block  md:pr-[24px] md:pl-[24px] md:pt-[24px] md:pb-[40px] ">
            <label className=" text-[16px] leading-[24px] ">Search</label>
            <div className="pt-[12px] pr-[16x] pb-[12px] pl-[16px]  flex  rounded-[8px] border border-gray-200    ">
              <input
                type="text"
                className="w-full h-[24px] outline-none "
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <SearchIcon />
            </div>
          </div>

          <div className=" border-solid  bg-gray-100 md:bg-white ">
            <div className="flex flex-wrap items-center p-4 ">
              <div>
                <label className="  font-bold text-[16px] leading-[24px] ml-3  ">
                  Pet Type:
                </label>
              </div>

              <div className="flex items-center  ">
                <Checkbox
                  sx={{ "&.Mui-checked": { color: orange[500] } }}
                  checked={selectedPet.includes("Dog")}
                  value="Dog"
                  onChange={handlePetChange}
                  inputProps={{ "aria-label": "Checkbox demo" }}
                />
                Dog
                <Checkbox
                  sx={{ "&.Mui-checked": { color: orange[500] } }}
                  checked={selectedPet.includes("Cat")}
                  value="Cat"
                  onChange={handlePetChange}
                  inputProps={{ "aria-label": "Checkbox demo" }}
                />
                Cat
                <Checkbox
                  sx={{ "&.Mui-checked": { color: orange[500] } }}
                  checked={selectedPet.includes("Bird")}
                  value="Bird"
                  onChange={handlePetChange}
                  inputProps={{ "aria-label": "Checkbox demo" }}
                />
                Bird
                <Checkbox
                  sx={{ "&.Mui-checked": { color: orange[500] } }}
                  checked={selectedPet.includes("Rabbit")}
                  value="Rabbit"
                  onChange={handlePetChange}
                  inputProps={{ "aria-label": "Checkbox demo" }}
                />
                Rabbit
              </div>
            </div>
          </div>

          <div>
            <div>
              <div className="flex flex-col  gap-[12px] p-4 ml-3   ">
                <label className="  text-[16px]  leading-6 font-bold md:ml-[6px]  ">
                  Rating:
                </label>
                {/* วนรูปตามจำนวนเลข */}
                <div className="flex flex-wrap gap-[8px]  ">
                  {["5", "4", "3", "2", "1"].map((rating, index) => (
                    <button
                      className={`gap-[3px] pt-[4] pr-[8px] pb-[4px] pl-[8px] text-[16px] leading-7 flex flex-wrap items-center border-gray-200 rounded-[8px] border ${
                        selectedRatings.includes(parseFloat(rating))
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

              <div className=" flex flex-col gap-2 p-4 ml-3  ">
                <p className="font-bold ">Experience:</p>

                <FormControl size="small">
                  <InputLabel id="demo-simple-select-label">Years</InputLabel>
                  <Select
                    className="border border-gray-200 h-[48px] rounded-[8px] min-w-[144px]  "
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={years}
                    label="Year"
                    onChange={handleExperienceChange}
                  >
                    <MenuItem value={1}>0-2 Years</MenuItem>
                    <MenuItem value={2}>3-5 Years</MenuItem>
                    <MenuItem value={3}>5+ Years</MenuItem>
                  </Select>
                </FormControl>
                <div className=" flex flex-col md:flex md:flex-row-reverse gap-4  ">
                  <Button
                    className="btn-primary w-full   "
                    onClick={handleSearch}
                  >
                    Search
                  </Button>

                  <Button
                    className="  btn-secondary w-full  "
                    onClick={handleClearFilters}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Searchtolistpage;
