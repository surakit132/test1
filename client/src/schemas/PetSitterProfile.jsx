import * as Yup from "yup";

const phoneRegex = /^[0-9]+$/;
const postCodeRegex = /^[0-9]+$/;

export const PetSitterProfileSchema = Yup.object().shape({
  first_name: Yup.string()
    .required("Please enter your firstname")
    .max(40, "First name must be at most 40 characters long"),
  last_name: Yup.string()
    .required("Please enter your lastname")
    .max(40, "Last name must be at most 40 characters long"),
  experience: Yup.string().required("Please enter your experience"),
  phone_number: Yup.string()
    .matches(phoneRegex, "Please enter a valid phone number")
    .required("Please enter your phone number")
    .min(9, "Phone number must be at least 9 digits long")
    .max(10, "Phone number must be at most 10 digits long"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter your email"),
  petsitter_name: Yup.string()
    .required("Please enter your pet sitter name")
    .max(40, "Pet sitter name must be at most 40 characters long"),
  address_detail: Yup.string()
    .required("Please enter address detail")
    .max(100, "Address detail must be at most 100 characters long"),
  district: Yup.string()
    .required("Please enter district")
    .max(50, "District must be at most 50 characters long"),
  sub_district: Yup.string()
    .required("Please enter subdistrict")
    .max(50, "Subdistrict must be at most 50 characters long"),
  province: Yup.string()
    .required("Please enter province")
    .max(50, "Province must be at most 50 characters long"),
  post_code: Yup.string()
    .matches(postCodeRegex, "Please enter a valid post code")
    .required("Please enter postal code")
    .length(5, "Post code must be exactly 5 digits long"),
  introduction: Yup.string().max(
    1000,
    "Introduction must be at most 1000 characters long"
  ),
  my_place: Yup.string().max(
    1000,
    "My place must be at most 1000 characters long"
  ),
  services: Yup.string().max(
    1000,
    "Services must be at most 1000 characters long"
  ),
  image_gallery: Yup.array()
    .min(3, "Please upload at least 3 images")
    .required("Please upload at least 3 images"),
});
