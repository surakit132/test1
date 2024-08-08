import * as Yup from "yup";

const phoneRegex = new RegExp("^[0-9]+$");

export const bookingInfoSchema = Yup.object({
  email: Yup.string().email("Please enter valid email"),
  phone: Yup.string()
    .matches(phoneRegex, "Please enter valid phone")
    .required("Please enter your phone"),
});
