import Checkbox from "@mui/material/Checkbox";
import { useState, useEffect } from "react";
import { Button } from "@mui/base";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { orange } from "@mui/material/colors";
import star2 from "../assets/svgs/star2.svg";
import { useNavigate } from "react-router-dom";



const Search = () => {
  
  const navigate = useNavigate();
  const [years, setYears] = useState("");
  const [selectedPet, setSelectedPet] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState("");
  

  const handlePetChange = (event) => {
    const value = event.target.value;
    setSelectedPet((prevSelectedPets) =>
      prevSelectedPets.includes(value)
        ? prevSelectedPets.filter((pet) => pet !== value)
        : [...prevSelectedPets, value]
    );
  };
  
  const handleRatingChange = (rating) => {
    const numericRating = parseFloat(rating);
    
    setSelectedRatings((prevRatings) => {
      let newRatings = [...prevRatings];
      
      const ratingsToAdd = [numericRating];
      if (numericRating % 1 === 0) {
        ratingsToAdd.push(numericRating + 0.5);
      }
      
      ratingsToAdd.forEach(r => {
        if (newRatings.includes(r)) {
          newRatings = newRatings.filter(rating => rating !== r);
        } else {
          newRatings.push(r);
        }
      });
      
      return newRatings;
    });
    
  };
  //ดึงรูปเข้าไปใน array
  const renderStars = (count) => {
    return Array.from({ length: count }, (_, index) => (
      <img
        key={index}
        src={star2}
        alt={`${count} star`}
        className="size-[20px]  "
      />
    ));
  };
  
 

  const handleSearch = () => {
    navigate("/search", {
      state: {
        selectedPet,
        selectedRatings,
        years,
      },
    });
  };

  const handleChange = (event) => {
    setYears(event.target.value);
  };

  return (
    <section className=" flex justify-center items-center   ">
      <div
        className="  flex flex-col max-w-[1064px] w-full    border-solid rounded-[16px] 
  "
        style={{ boxShadow: "4px 4px 24px 0px rgba(0, 0, 0, 0.04)" }}
      >
        
        <div className=" border-solid rounded-t-2xl   ">
          <div className="flex flex-wrap items-center p-4 ">
            <div className="">
              <label className=" font-bold text-[16px] leading-[24px] ml-3 md:ml-6   ">
                Pet Type:
              </label>
            </div>

            <div className="flex items-center ">
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
          <div></div>
        </div>

        <div className="  ">
          <div className=" p-1  md:flex md:items-baseline md:w-full md:justify-start   ">
            <div className="flex flex-col  gap-[12px] p-4 md:flex-row  ">
              <label className="  text-[16px]  leading-6 font-bold md:ml-5 ">
                Rating:
              </label>
              {/* วนรูปตามจำนวนเลข */}
              <div className="flex flex-wrap gap-[8px]  ">
                {["5", "4", "3", "2", "1"].map((rating, index) => (
                  <button
                  className={`gap-[3px] pt-[4px] pr-[8px] pb-[4px] pl-[8px] text-[16px] leading-7 flex items-center border-gray-200 rounded-[8px] border md:ml-1 ${
                    selectedRatings.includes(parseFloat(rating))
                      ? ' border-1 border-orange-500 text-orange-500'
                      : 'bg-white text-gray-800'
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

            <div className=" flex flex-col gap-2 p-4 md:flex-row md:items-center  ">
              <p className="font-bold ">Experience:</p>

              <FormControl size="small">
                <InputLabel id="demo-simple-select-label">Years</InputLabel>
                <Select
                  className="border border-gray-200 h-[48px] rounded-[8px] min-w-[144px]   "
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={years}
                  label="Year"
                  onChange={handleChange}
                >
                  <MenuItem value={1}>0-2 Years</MenuItem>
                  <MenuItem value={2}>3-5 Years</MenuItem>
                  <MenuItem value={3}>5+ Years</MenuItem>
                </Select>
              </FormControl>
              <Button className="btn-primary w-full md:w-fit md:ml-5  " onClick={handleSearch}>
                Search
              </Button>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Search;
