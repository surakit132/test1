import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ImageGallerry from "../components/petsitter-detail/ImageGallerry";
import ContentTop from "../components/petsitter-detail/ContentTop";
import ContentBottom from "../components/petsitter-detail/ContentBottom";
import PetSitterInfoCard from "../components/petsitter-detail/PetSitterInfoCard";
import Footer from "../components/Footer";
import { useLocalStorage } from "../hooks/useLocalStorage";
import PaginationSize from "../components/searchs/Pagination";

const PetSitterDetailPage = () => {
  const { setItem } = useLocalStorage();
  const [profiles, setProfiles] = useState({});
  const [reviews, setReview] = useState([]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [filters, setFilters] = useState({
    rating: [],
  });

  let { id } = useParams();

  const fetchProfiles = async (id) => {
    try {
      const response = await axios.get(`http://localhost:4000/search/${id}`);
      setProfiles(response.data.data);
      console.log(response.data.data);
      setItem("petSitterId", id);
      setItem("petSitterFirstname", response.data.data.firstname);
      setItem("petSitterLastname", response.data.data.lastname);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfiles(id);
  }, [id]);

  useEffect(() => {
    const fetchReview = async (id) => {
      try {
        const ratingParam = Array.isArray(selectedRatings.rating)
          ? selectedRatings.rating.join(",")
          : "";
        const response = await axios.get(
          `http://localhost:4000/review/${id}`,
          {
            params: {
              page,
              pageSize,
              rating: ratingParam,
            },
          }
        );

        setReview(response.data.data || []);
        setTotal(response.data.total || 0);
        setAverageRating(response.data.averageRating || 0);
      } catch (error) {
        console.error(
          "Error fetching Review:",
          error.response ? error.response.data : error.message
        );
        setReview([]);
        setTotal(0);
        setAverageRating(0);
      }
    };
    fetchReview(id);
    console.log(filters.rating)
  }, [filters.rating, id, page, pageSize, selectedRatings]);

  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      rating: selectedRatings,
    }));
  }, [selectedRatings]);

  const handlePageChange = (event, value) => {
    if (value > 0) {
      setPage(value);
    }
  };

  const handleRatingChange = () => {
    setFilters({ ...filters, rating: selectedRatings });
    setPage(1);
  };

  const totalReviews = total; // ใช้จำนวนรวมจากรีวิวทั้งหมดที่กรองแล้ว

  return (
    <>
      {profiles["image_gallery"] && (
        <ImageGallerry profiles={profiles["image_gallery"]} />
      )}
      <div className="bg-[#FAFAFB]  flex flex-col lg:flex-row md:gap-4 lg:px-[80px] lg:pt-0 lg:pb-[80px] justify-center  2xl:justify-evenly ">
        <div className="flex flex-col max-w-[848px]">
          <ContentTop profiles={profiles} />

          <div className="hidden lg:flex lg:flex-col">
            <ContentBottom
              reviews={reviews}
              setReview={setReview}
              onRatingChange={handleRatingChange}
              selectedRatings={selectedRatings}
              setSelectedRatings={setSelectedRatings}
              filters={filters}
              setFilters={setFilters}
              totalReviews={totalReviews}
              averageRating={averageRating}
            />
            <PaginationSize
              page={page}
              count={Math.ceil(total / pageSize)}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
        <div className="hidden lg:flex ">
          {profiles && <PetSitterInfoCard profiles={profiles} />}
        </div>
      </div>
      <div className="flex flex-col lg:hidden">
        <PetSitterInfoCard profiles={profiles} />
        <ContentBottom
              reviews={reviews}
              setReview={setReview}
              onRatingChange={handleRatingChange}
              selectedRatings={selectedRatings}
              setSelectedRatings={setSelectedRatings}
              filters={filters}
              setFilters={setFilters}
              totalReviews={totalReviews}
              averageRating={averageRating}
            />

        <PaginationSize
          page={page}
          count={Math.ceil(total / pageSize)}
          onPageChange={handlePageChange}
        />
      </div>

      <Footer />
    </>
  );
};

export default PetSitterDetailPage;
